import axios from "axios";

export default {
  getLike: (variable) => {
    return axios
      .post("/api/like/getLikes", variable)
      .then((res) => {
        if (res.status !== 400) {
          return res.data;
        } else {
          return { message: { msgBody: "Error" }, msgError: true };
        }
      })
      .catch((err) => {
        return {
          message: { msgBody: "Lấy dữ liệu không thành công" },
          msgError: true,
        };
      });
  },

  getDisLike: (variable) => {
    return axios
      .post("/api/like/getDisLikes", variable)
      .then((res) => {
        if (res.status !== 400) {
          return res.data;
        } else {
          return { message: { msgBody: "Error" }, msgError: true };
        }
      })
      .catch((err) => {
        return {
          message: { msgBody: "Lấy dữ liệu không thành công" },
          msgError: true,
        };
      });
  },

  upLike: (variable) => {
    return axios
      .post("/api/like/upLike", variable)
      .then((res) => {
        if (res.status !== 400) {
          return res.data;
        } else {
          return { message: { msgBody: "Error", msgError: true } };
        }
      })
      .catch((err) => {
        return {
          message: { msgBody: "Lấy dữ liệu không thành công" },
          msgError: true,
        };
      });
  },

  unLike: (variable) => {
    return axios
      .post("/api/like/unLike", variable)
      .then((res) => {
        if (res.status !== 400) {
          return res.data;
        } else {
          return { message: { msgBody: "Error", msgError: true } };
        }
      })
      .catch((err) => {
        return {
          message: { msgBody: "Lấy dữ liệu không thành công" },
          msgError: true,
        };
      });
  },

  upDisLike: (variable) => {
    return axios
      .post("/api/like/upDisLike", variable)
      .then((res) => {
        if (res.status !== 400) {
          return res.data;
        } else {
          return { message: { msgBody: "Error", msgError: true } };
        }
      })
      .catch((err) => {
        return {
          message: { msgBody: "Lấy dữ liệu không thành công" },
          msgError: true,
        };
      });
  },

  unDisLike: (variable) => {
    return axios
      .post("/api/like/unDisLike", variable)
      .then((res) => {
        if (res.status !== 400) {
          return res.data;
        } else {
          return { message: { msgBody: "Error", msgError: true } };
        }
      })
      .catch((err) => {
        return {
          message: { msgBody: "Lấy dữ liệu không thành công" },
          msgError: true,
        };
      });
  },
};
