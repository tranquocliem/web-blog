import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import Message from "../components/Message";
const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "", role: "" });
  const [configPass, setConfigPass] = useState({ configPass: "" });
  const [activePass, setActivePass] = useState(false);
  const [activeConfigPass, setActiveConfigPass] = useState(true);
  const [message, setMessage] = useState(null);
  let timeID = useRef(null); //hẹn giờ

  useEffect(() => {
    return () => {
      clearTimeout(timeID);
    };
  }, []);

  const resetForm = () => {
    setUser({ username: "", password: "", role: "" });
    setConfigPass({ configPass: "" });
  };

  const onChange = (e) => {
    e.preventDefault();
    //...user lấy tất cả các thuộc tính hiện có trong user
    //e.target.name có thể là name hoặc pass
    //e.target.name:e.target.value //lay gia tri cua 2 truong name va pass
    const newPass = { ...user };
    newPass[e.target.name] = e.target.value;
    // setUser({ ...user, [e.target.name]: e.target.value });
    setUser(newPass);
    const count = newPass.password.length;
    if (
      user.password !== null ||
      user.password !== undefined ||
      user.password !== ""
    ) {
      if (count + 1 > 6) {
        setActivePass(true);
      } else {
        setActivePass(false);
      }
    } else {
      setActivePass(false);
    }
  };

  const onChangeConfigPass = (e) => {
    e.preventDefault();
    const newConfigPass = { ...configPass };
    newConfigPass[e.target.name] = e.target.value;
    setConfigPass(newConfigPass);
    if (user.password !== newConfigPass.configPass) {
      setActiveConfigPass(false);
    } else {
      setActiveConfigPass(true);
    }
    //console.log(newConfigPass);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (activeConfigPass === true && user.password === configPass.configPass) {
      AuthService.register(user).then((data) => {
        const { message } = data;
        //hiển thị tin nhắn
        setMessage(message);
        //clear form đăng ký
        //nếu tin nhắn trả về ko có lỗi thì sau 1.5s sẽ
        if (!message.msgError) {
          resetForm();
          timeID = setTimeout(() => {
            props.history.push("/login");
          }, 1500);
        }
      });
    } else {
      setActiveConfigPass(false);
    }
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body" style={{ background: "#FFF" }}>
            <h1 className="text-center mb-3">
              <i className="fa fa-registered"></i> Đăng ký
            </h1>
            {message ? <Message message={message} /> : null}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="username">Tên Người Dùng:</label>
                <input
                  value={user.username}
                  name="username"
                  className="form-control"
                  onChange={onChange}
                  placeholder="UserName"
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Loại Tài Khoản:</label>
                <input
                  value={user.role}
                  name="role"
                  className="form-control"
                  onChange={onChange}
                  placeholder="User or Admin"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  value={user.password}
                  type="password"
                  name="password"
                  className="form-control float-right"
                  onChange={onChange}
                  placeholder="Nhập Password"
                />
                {activePass ? (
                  <small className="form-text text-muted">
                    <i className="text-success fas fa-check-circle">
                      <i className="mx-1">Ok!!!</i>
                    </i>
                  </small>
                ) : (
                  // <i className="text-success fas fa-check-circle"></i>
                  <small className="form-text text-muted">
                    <i className="text-danger fas fa-times-circle">
                      <i className="mx-1">Vui lòng nhập mật khẩu từ 6 ký tự trở lên.</i>
                    </i>
                  </small>
                  // <i className="text-danger fas fa-times-circle"></i>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password Config</label>
                <input
                  type="password"
                  name="configPass"
                  className="form-control"
                  onChange={onChangeConfigPass}
                  placeholder="Nhập Lại Password"
                />
                {activeConfigPass ? (
                  <small className="form-text text-muted">
                    <i className="text-success fas fa-check-circle">
                      <i className="mx-1">Ok!!!</i>
                    </i>
                  </small>
                ) : (
                  // <i className="text-success fas fa-check-circle"></i>
                  <small className="form-text text-muted">
                    <i className="text-danger fas fa-times-circle">
                      <i className="mx-1">
                        Mật khẩu không khớp, để chắc chắn vui lòng nhập lại hai
                        lần password.
                      </i>
                    </i>
                  </small>
                  // <i className="text-danger fas fa-times-circle"></i>
                )}
              </div>
              <button type="submit" className="btn btn-secondary btn-block">
                Đăng ký
              </button>
            </form>
            <p className="lead mt-4" style={{ color: "#fff" }}>
              Đã có tài khoản <Link to="/login">Đăng nhập</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
