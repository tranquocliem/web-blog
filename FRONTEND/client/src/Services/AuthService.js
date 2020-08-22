// //chưa các fetch yêu cầu như đăng nhập,tạo tài khoản,đăng xuất,kiểm tra đăng nhập
// //tạo file riêng để sử dụng gloable và sử dụng APIContext

export default {
  login: (user) => {
    //fetch(url,{phuong thuc,gui du lieu dang json})
    return (
      fetch("/login", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        //sau đó chúng ta sẽ nhân đc phản hồi từ máy chủ(res) và ta phải trả lại phản hồi đó (=>res,json) dạng json
        //và sau đó sẽ phân tích cho chung ta
        .then((res) => {
          if (res.status !== 401) {
            return res.json().then((data) => data);
          } else {
            return {
              isAuthenticated: false,
              user: { username: "", role: "" },
              message: {
                msgBody: "Sai Tài Khoản Hoặc Mật Khẩu",
                msgError: true,
              },
            };
          }
        })
        .catch((err) => {
          return {
            message: {
              msgBody: "Đăng nhập không thành công!!!",
              msgError: true,
            },
          };
        })
    ); //ta sẽ nhận lại được data khi phân tích
  },
  register: (user) => {
    return fetch("/register", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  logout: () => {
    return fetch("/logout")
      .then((res) => res.json())
      .then((data) => data);
  },
  //đây là chức năng để duy trì khi chúng ta đăng nhập
  isAuthenticated: () => {
    return fetch("/authenticated").then((res) => {
      //nếu phản hồi từ máy chủ khác 401 thì chúng ta mới gửi lại phản hồi và sau đó nhận lại đc data
      //401 -> passport sẽ tự gửi nếu chúng ta không đc xác thực
      if (res.status !== 401) return res.json().then((data) => data);
      //ngược lại
      else {
        return { isAuthenticated: false, user: { username: "", role: "" } };
      }
    });
  },
};

// export default {
//   login: (user) => {
//     console.log(user);
//     return fetch("/login", {
//       method: "post",
//       body: JSON.stringify(user),
//       headers: {
//         "Content-Type": "application/json",
//         'Accept': 'application/json'
//       },
//     }).then((res) => {
//       if (res.status !== 401) return res.json().then((data) => data);
//       else return { isAuthenticated: false, user: { username: "", role: "" } };
//     });
//   },
//   register: (user) => {
//     console.log(user);
//     return fetch("/register", {
//       method: "post",
//       body: JSON.stringify(user),
//       headers: {
//         "Content-Type": "application/json",
//         'Accept': 'application/json'
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => data);
//   },
//   logout: () => {
//     return fetch("/logout")
//       .then((res) => res.json())
//       .then((data) => data);
//   },
//   isAuthenticated: () => {
//     return fetch("/authenticated").then((res) => {
//       if (res.status !== 401) return res.json().then((data) => data);
//       else return { isAuthenticated: false, user: { username: "", role: "" } };
//     });
//   },
// };
