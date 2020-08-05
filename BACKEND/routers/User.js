const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../config/passport");
const JWT = require("jsonwebtoken"); //dung de ky ma thong bao JWT de khi nao nguoi dung ky ma thong bao JWT ve co ban nguoi dung dang tao ma cho server
const User = require("../models/User");
const Todo = require("../models/Todo");
const { authenticate } = require("passport");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "QuocLiem",
      sub: userID,
    },
    "QuocLiem",
    { expiresIn: "1h" }
  ); //doi so thu nhat phai giong voi secretOrKey ben passport.js
};

//tao tai khoan
userRouter.post("/register", (req, res) => {
  //ES6
  //bt const username = req.body.username
  const { username, password, role } = req.body;
  //kiem tra username da ton tai
  User.findOne({ username }, (err, user) => {
    //co loi khi tim kiem voi CSDL
    if (err)
      //tra ra trang thai 500 va xuat ra json
      res.status(500).json({
        message: { msgBody: "Có lỗi khi tìm kiếm với CSDL", msgError: true },
      });
    //khong co loi khi tim kiem voi CSDL nhung username da ton tai
    if (user)
      res.status(400).json({
        message: { msgBody: "Tên đăng nhập đã tồn tại", msgError: true },
      });
    else {
      //khi nguoi dung da hop le ta tao moi mot nguoi dung tu model User va chuyen vao username, password, role
      const newUser = new User({ username, password, role });
      //luu vao CSDL
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: {
              msgBody: "Có lỗi khi thêm tài khoản vào CSDL",
              msgError: true,
            },
          });
        else
          res.status(201).json({
            message: {
              msgBody: "Tạo tại khoản thành công",
              msgError: false,
            },
          });
      });
    }
  });
});

//dang nhap
userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

//dang xuat
userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

//lấy danh sách tất cả todos
userRouter.get(
  "/todos",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.find((err, todos) => {
      if (err)
        res.status(500).json({
          message: { msgBody: "Có lỗi khi lấy data từ CSDL", msgError: true },
        });
      else {
        res.status(200).json({
          message: {
            msgBody: "Lấy dữ liệu thành công",
            msgError: false,
          },
          todos,
        });
      }
    });
  }
);

//lấy todo theo id
userRouter.get(
  "/todos/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.findById(req.params.id)
      .then((todo) => {
        if (!todo)
          res.status(500).json({
            message: {
              msgBody: "Lấy dữ liệu không thành công",
              msgError: true,
            },
          });
        return res.status(200).json(todo);
      })
      .catch(() => {
        res.status(500).json({
          message: {
            msgBody: "Không có dữ liệu cần tìm",
            msgError: true,
          },
        });
      });
  }
);

//cap nhat todo theo id
userRouter.post(
  "/update-todo/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.findById(req.params.id)
      .then((todo) => {
        if (!todo)
          res.status(500).json({
            message: {
              msgBody: "Lấy dữ liệu không thành công",
              msgError: true,
            },
          });
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.img = req.body.img;

        todo
          .save()
          .then((td) => {
            res.status(200).json({
              ...td.toObject(),
              message: {
                msgBody: "Cập nhật dữ liệu thành công",
                msgError: false,
              },
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: {
                msgBody: "Cập nhật dữ liệu không thành công",
                msgError: true,
              },
            });
          });
      })
      .catch(() => {
        res.status(500).json({
          message: {
            msgBody: "Không có dữ liệu cần tìm",
            msgError: true,
          },
        });
      });
  }
);

userRouter.get(
  "/delete-todo/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.findByIdAndDelete({ _id: req.params.id }, (err, todo) => {
      if (err)
        res.status(500).json({
          message: {
            msgBody: "Không có dữ liệu cần tìm",
            msgError: true,
          },
        });
      else {
        res.status(200).json({
          message: {
            msgBody: "Xoá thành công",
            msgError: false,
          },
        });
      }
    });
  }
);

//them danh sach todos theo nguoi dung
userRouter.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const todo = new Todo(req.body);
    todo.save((err) => {
      if (err)
        res.status(500).json({
          message: { msgBody: "Có lỗi khi thêm vào CSDL", msgError: true },
        });
      else {
        //day todos vao nguoi dung
        req.user.todos.push(todo);
        //luu vao CSDL
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: {
                msgBody: "Có lỗi khi User này thêm todo",
                msgError: true,
              },
            });
          else
            res.status(200).json({
              message: {
                msgBody: "Thêm dữ liệu thành công",
                msgError: false,
              },
            });
        });
      }
    });
  }
);

//lay danh sach todos theo nguoi dung
userRouter.get(
  "/user/todos",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //tim theo id va lay khoa chinh todos
    User.findById({ _id: req.user._id })
      .populate("todos")
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: {
              msgBody: "Có lỗi khi lấy dữ liệu từ CSDL",
              msgError: true,
            },
          });
        else {
          //authenticate : true de biet minh con đang dang nhap
          res.status(200).json({ todos: document.todos, authenticate: true });
        }
      });
  }
);

//delete todos
userRouter.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let todo = await Todo.findById(req.params.id);
      if (!todo) return res.status(404).json({ msg: "Not Found" });
      await Todo.findByIdAndRemove(req.params.id);
    } catch (err) {
      res.status(500).json("Lỗi");
    }
  }
);

//load users va kiem tra tai khoan dang dang nhap la tai khoan loai gi (user,admin)
userRouter.get(
  "/admin/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      // res.status(200).json({
      //   message: { msgBody: "Đây là tài khoản admin", msgError: false },
      // });
      User.find((err, users) => {
        if (err) {
          res.status(500).json({
            message: {
              msgBody: "Có lỗi khi lấy dữ liệu từ CSDL",
              msgError: true,
            },
          });
        } else {
          res.status(200).json({
            users,
            authenticate: true,
            message: { msgBody: "Đây là tài khoản admin", msgError: false },
          });
        }
      });
    } else
      res.status(403).json({
        message: { msgBody: "Đây không phải tài khoản admin", msgError: true },
      });
  }
);

//khi nguoi dung dong trinh duyet va quay lai van dang nhap dc neu duoc xac thuc
//duy tri dang nhap
userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //const { username, role } = req.user;
    const user = req.user;
    // res.status(200).json({ isAuthenticated: true, user: { username, role } });
    res.status(200).json({ isAuthenticated: true, user});
  }
);
module.exports = userRouter;
