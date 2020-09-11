import axios from "axios";

export default {
  //lấy tất cả user danh cho spadmin
  getUserAll: () => {
    return axios.get("spadmin/account").then((res) => {
      if (res.status !== 401) {
        return res.data;
      } else {
        return { message: { msgBody: "Error" }, msgError: true };
      }
    });
  },
  //lay cac users có loại là user
  getUsers: () => {
    return axios.get("admin/account").then((res) => {
      if (res.status !== 401) {
        return res.data;
      } else {
        return { message: { msgBody: "Error" }, msgError: true };
      }
    });
  },
  removeUser: (id) => {
    return axios.delete("remove/user/" + id).then((res) => {
      if (res.status !== 401) {
        return res.data;
      } else {
        return { message: { msgBody: "Error" }, msgError: true };
      }
    });
  },
};
