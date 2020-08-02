import axios from "axios";

export default {
  getTodosAll: () => {
    return axios.get("/todos").then((res) => {
      if (res.status !== 401) {
        return res.data;
      } else {
        return { message: { msgBody: "Error" }, msgError: true };
      }
    });
  },

  getTodosByUser: () => {
    return axios.get("/user/todos").then((res) => {
      if (res.status !== 400) {
        return res.data;
      } else {
        return { message: { msgBody: "Error" }, msgError: true };
      }
    });
  },

  addTodo: (todo) => {
    return axios
      .post("/add", todo)
      .then((res) => {
        if (res.status !== 400) {
          return res.data;
        } else {
          return { message: { msgBody: "Error" }, msgError: true };
        }
      })
      .catch((err) => {
        return {
          message: { msgBody: "Thêm không thành công vui lòng nhập đầy đủ thông tin!!!", msgError: true },
        };
      });
  },

  getTodoByID: (id) => {
    return axios.get("/todos/" + id).then((res) => {
      if (res.status !== 400) {
        return res.data;
      } else {
        return { message: { msgBody: "Error" }, msgError: true };
      }
    });
  },

  updateTodoById: (id, data) => {
    return axios
      .post("/update-todo/" + id, data)
      .then((res) => {
        //console.log(res);
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

  deleteTodo: (id) => {
    return axios.get("/delete-todo/" + id).then((res) => {
      if (res.status !== 400) {
        return res.data;
      } else {
        return { message: { msgBody: "Error", msgError: true } };
      }
    });
  },
};
