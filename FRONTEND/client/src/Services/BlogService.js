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
      .get("/blog/user/getBlogs")
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
};
