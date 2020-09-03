import axios from "axios";

export default {
  addBlog: (blog) => {
    return axios
      .post("/blog/createPost", blog)
      .then((res) => {
        if (res.status !== 400) {
          return res.data;
        } else {
          return { message: { msgBody: "Error" }, msgError: true };
        }
      })
      .catch((err) => {
        return {
          message: {
            msgBody: "Thêm không thành công vui lòng nhập đầy đủ thông tin!!!",
            msgError: true,
          },
        };
      });
  },

  //getalll
  getBlog: () => {
    return axios
      .get("/blog/getBlog")
      .then((res) => {
        if (res.status !== 400) {
          return res.data;
        } else {
          return { message: { msgBody: "Error" }, msgError: true };
        }
      })
      .catch((err) => {
        return {
          message: {
            msgBody: "Lấy dữ liệu không thành công!!!",
            msgError: true,
          },
        };
      });
  },

  getBlogByUser: () => {
    return axios
      .post("/blog/getBlogsByUser")
      .then((res) => {
        if (res.status !== 400) {
          return res.data;
        } else {
          return { message: { msgBody: "Error" }, msgError: true };
        }
      })
      .catch((err) => {
        return {
          message: {
            msgBody: "Lấy dữ liệu không thành công!!!",
            msgError: true,
          },
        };
      });
  },

  getBlogByIsDisplayFalse: () => {
    return axios
      .get("/blog/getControlBlogFalse")
      .then((res) => {
        if (res.status !== 400) {
          return res.data;
        } else {
          return { message: { msgBody: "Error" }, msgError: true };
        }
      })
      .catch((err) => {
        return {
          message: {
            msgBody: "Lấy dữ liệu không thành công!!!",
            msgError: true,
          },
        };
      });
  },
  getBlogByIsDisplayTrue: () => {
    return axios
      .get("/blog/getControlBlogTrue")
      .then((res) => {
        if (res.status !== 400) {
          return res.data;
        } else {
          return { message: { msgBody: "Error" }, msgError: true };
        }
      })
      .catch((err) => {
        return {
          message: {
            msgBody: "Lấy dữ liệu không thành công!!!",
            msgError: true,
          },
        };
      });
  },

  getBlogById: (id) => {
    return axios.get("/blog/" + id).then((res) => {
      if (res.status !== 400) {
        return res.data;
      } else {
        return { message: { msgBody: "Error" }, msgError: true };
      }
    });
  },

  getBlogsById: (variable) => {
    return axios.post("/blog/getPost", variable).then((res) => {
      if (res.status !== 400) {
        return res.data;
      } else {
        return { message: { msgBody: "Error" }, msgError: true };
      }
    });
  },

  deleteBlog: (id) => {
    return axios.get("/blog/deletePost/" + id).then((res) => {
      if (res.status !== 400) {
        return res.data;
      } else {
        return { message: { msgBody: "Error", msgError: true } };
      }
    });
  },

  updateBlog: (id, data) => {
    return axios
      .post("/blog/update/" + id, data)
      .then((res) => {
        if (res.status !== 400) {
          return res.data;
        } else {
          return { message: { msgBody: "Error" }, msgError: true };
        }
      })
      .catch((err) => {
        return {
          message: { msgBody: "Cập Nhật Không Thành Công", msgError: true },
        };
      });
  },

  updateBlogs: (variable) => {
    return axios
      .post("/blog/updates", variable)
      .then((res) => {
        if (res.status !== 400) {
          return res.data;
        } else {
          return { message: { msgBody: "Error" }, msgError: true };
        }
      })
      .catch((err) => {
        return {
          message: { msgBody: "Cập Nhật Không Thành Công", msgError: true },
        };
      });
  },
};
