const express = require("express");
const userRouter = express.Router();
const { authenticate } = require("passport");
const passport = require("passport");
const Blog = require("../models/Blog");
const multer = require("multer");
const User = require("../models/User");
const Todo = require("../models/Todo");

// STORAGE MULTER CONFIG
//upload file
//khai bao bien storage de chi ra thu muc luu chu va cach dat ten file
let storage = multer.diskStorage({
  //noi luu tru
  //bien cb de kiem tra xem file co duoc chap nhan de luu tru hay ko
  destination: (req, file, cb) => {
    //đây là đích đến khi tải tên lên sẽ lưu xuống thư mục uploads này
    cb(null, "uploads/");
  },
  //cach dat ten file.originalname la lai ten giong nhu ban dau tai len
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  //loc file cac file ho tro
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    //các định dạng hổ trợ
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

//bien upload file
//noi luu tru la storage
//.single la de tai tung file len server
const upload = multer({ storage: storage }).single("file");

//api uploadfiles
userRouter.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

//tao bai viet
userRouter.post(
  "/createPost",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const blog = new Blog(req.body);
    // blog.save((err, postInfo) => {
    //   if (err) {
    //     return res.status(500).json({
    //       message: {
    //         msgBody: "Có lỗi khi thêm dữ liệu",
    //         msgError: true,
    //       },
    //     });
    //   } else {
    //     return res.status(200).json({
    //       message: {
    //         msgBody: "Thêm dữ liệu thành công",
    //         msgError: false,
    //       },
    //       postInfo,
    //     });
    //   }
    // });
    //them blog theo nguoi dung
    blog.save((err) => {
      if (err) {
        return res.status(500).json({
          message: {
            msgBody: "Có lỗi khi thêm dữ liệu",
            msgError: true,
          },
        });
      } else {
        req.user.blogs.push(blog);
        req.user.save((err) => {
          if (err) {
            return res.status(500).json({
              message: {
                msgBody: "Có lỗi khi User này thêm todo",
                msgError: true,
              },
            });
          } else {
            return res.status(200).json({
              message: {
                msgBody: "Thêm dữ liệu thành công",
                msgError: false,
              },
            });
          }
        });
      }
    });
  }
);

//lay du lieu bai viet
userRouter.get(
  "/getBlog",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //.populate lay tat ca thong tin cua cua user thong qua cai id co trong writer
    Blog.find()
      .populate("writer")
      .exec((err, blogs) => {
        if (err) {
          return res.status(500).json({
            message: {
              msgBody: "Có lỗi khi lấy dữ liệu",
              msgError: true,
            },
          });
        } else {
          return res.status(200).json({
            message: {
              msgBody: "Lấy dữ liệu thành công",
              msgError: false,
            },
            blogs,
          });
        }
      });
  }
);

userRouter.get(
  "/user/getBlogs",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //tim theo id va lay khoa chinh todos

    User.findById({ _id: req.user._id })
      .populate("blogs")
      .exec((err, blogs) => {
        if (err)
          res.status(500).json({
            message: {
              msgBody: "Có lỗi khi lấy dữ liệu từ CSDL",
              msgError: true,
            },
          });
        else {
          //authenticate : true de biet minh con đang dang nhap
          res.status(200).json({
            blogs: blogs,
            message: {
              msgBody: "Lấy dữ liệu thành công",
              msgError: false,
            },
            authenticate: true,
          });
        }
      });
  }
);

userRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Blog.findById(req.params.id)
      .populate("writer")
      .exec((err, blog) => {
        if (err) {
          res.status(500).json({
            message: {
              msgBody: "Lấy dữ liệu không thành công",
              msgError: true,
            },
          });
        } else {
          return res.status(200).json(blog);
        }
      });
    // Blog.findById(req.params.id)
    //   .then((blog) => {
    //     if (!blog) {
    //       res.status(500).json({
    //         message: {
    //           msgBody: "Lấy dữ liệu không thành công",
    //           msgError: true,
    //         },
    //       });
    //     }
    //     return res.status(200).json(blog);
    //   })
    //   .catch(() => {
    //     res.status(500).json({
    //       message: {
    //         msgBody: "Không có dữ liệu cần tìm",
    //         msgError: false,
    //       },
    //     });
    //   });
  }
);

userRouter.post("/getPost", (req, res) => {
  Blog.findOne({ _id: req.body.postId })
    .populate("writer")
    .exec((err, post) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, post });
    });
});

module.exports = userRouter;
