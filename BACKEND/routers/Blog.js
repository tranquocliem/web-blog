const express = require("express");
const userRouter = express.Router();
const { authenticate } = require("passport");
const passport = require("passport");
const Blog = require("../models/Blog");
const multer = require("multer");
const User = require("../models/User");
const Todo = require("../models/Todo");

var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "tranquocliem",
  api_key: "942711663182255",
  api_secret: "jgZrUVMajdSmICxNyX3Pt0XS1QI",
});

// userRouter.post("/up", function (req, res, next) {
//   // const file = req.files.file;
//   //console.log(file);
//   cloudinary.uploader.upload(file.tempFilePath, function (err, result) {
//     // console.log(err);
//     // console.log(result);
//     if (err) {
//       return res.json({ success: false, err });
//     } else {
//       return res.json({ success: true, result });
//     }
//   });
// });

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

//upload hinh anh len cloudiary
userRouter.post("/image", (req, res, next) => {
  //const upload = multer({ storage }).single("name-of-input-key");
  upload(req, res, function (err) {
    if (err) {
      return res.send(err);
    }
    console.log("file uploaded to server");
    console.log(req.file);

    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
      function (err, result) {
        if (err) {
          return res.json({ success: false, err });
        } else {
          // xoa file trong thu muc uploads khi da up len cloud
          const fs = require("fs");
          fs.unlinkSync(path);
          return res.json({ success: true, result });
        }
      }
    );
  });
});

//bien upload file
//noi luu tru la storage
//.single la de tai tung file len server
const upload = multer({ storage: storage }).single("file");

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
                msgBody: "Có lỗi khi User này thêm Blogs",
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
    Blog.find({ isDisplay: true })
      .populate("writer", "_id username role")
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

//lay du lieu blogs co isdisplay = false
userRouter.get(
  "/getControlBlogFalse",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //.populate lay tat ca thong tin cua cua user thong qua cai id co trong writer
    Blog.find({ isDisplay: false })
      .populate("writer", "_id username role")
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
  "/getControlBlogTrue",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //.populate lay tat ca thong tin cua cua user thong qua cai id co trong writer
    Blog.find({ isDisplay: true })
      .populate("writer", "_id username role")
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
    //load blogs theo nguoi dang
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

userRouter.post(
  "/getBlogsByUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //load blogs theo nguoi dang
    const { writer } = req.body;
    Blog.find({ writer: writer })
      .populate("writer", "_id username role")
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

//lấy dữ liệu theo params
userRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Blog.findById(req.params.id)
      .populate("writer", "_id username role")
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

//lấy dữ liệu thông qua id tu client chuyen xuong
userRouter.post(
  "/getPost",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin" || req.user.role === "spadmin") {
      Blog.findOne({ _id: req.body._id })
        .populate("writer", "_id username role")
        .exec((err, blog) => {
          if (err) return res.status(400).json(err);
          res.status(200).json({ success: true, blog });
        });
    } else {
      Blog.findOne({ _id: req.body._id, writer: req.body.writer })
        .populate("writer", "_id username role")
        .exec((err, blog) => {
          if (err) return res.status(400).json(err);
          res.status(200).json({ success: true, blog });
        });
    }
  }
);

//xoá dữ liệu
userRouter.get(
  "/deletePost/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Blog.findByIdAndDelete({ _id: req.params.id }, (err, blog) => {
      if (err) {
        res.status(500).json({
          message: {
            msgBody: "Không có dữ liệu cần tìm",
            msgError: true,
          },
        });
      } else {
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

//cập nhật dữ liệu
userRouter.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Blog.findById(req.params.id)
      .then((blog) => {
        if (!blog)
          res.status(500).json({
            message: {
              msgBody: "Lấy dữ liệu không thành công",
              msgError: true,
            },
          });
        blog.title = req.body.title;
        blog.content = req.body.content;
        blog.isDisplay = req.body.isDisplay;

        blog
          .save()
          .then((bl) => {
            res.status(200).json({
              ...bl.toObject(),
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

userRouter.post(
  "/updates",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin" || req.user.role === "spadmin") {
      Blog.findOne({ _id: req.body._id })
        .then((blog) => {
          if (!blog)
            res.status(500).json({
              message: {
                msgBody: "Lấy dữ liệu không thành công",
                msgError: true,
              },
            });
          blog.title = req.body.title;
          blog.content = req.body.content;
          blog.isDisplay = req.body.isDisplay;

          blog
            .save()
            .then((bl) => {
              res.status(200).json({
                ...bl.toObject(),
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
    } else if (req.user.role === "user") {
      Blog.findOne({ _id: req.body._id, writer: req.body.writer })
        .then((blog) => {
          if (!blog)
            res.status(500).json({
              message: {
                msgBody: "Lấy dữ liệu không thành công",
                msgError: true,
              },
            });
          blog.title = req.body.title;
          blog.content = req.body.content;
          blog.isDisplay = req.body.isDisplay;

          blog
            .save()
            .then((bl) => {
              res.status(200).json({
                ...bl.toObject(),
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
  }
);

module.exports = userRouter;
