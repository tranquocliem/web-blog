import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import Message from "../components/Message";
const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "", role: "" });
  const [configPass, setConfigPass] = useState({ configPass: "" });
  const [activePass, setActivePass] = useState(null);
  const [activeConfigPass, setActiveConfigPass] = useState(null);
  const [activeRole, setActiveRole] = useState(null);
  const [activeUserName, setActiveUserName] = useState(null);
  const [existUser, setExistUser] = useState(null);
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
    setActivePass(null);
    setActiveConfigPass(null);
    setActiveRole(null);
    setActiveUserName(null);
    setExistUser(null);
  };

  const onChange = (e) => {
    e.preventDefault();
    //...user lấy tất cả các thuộc tính hiện có trong user
    //e.target.name có thể là name hoặc pass
    //e.target.name:e.target.value //lay gia tri cua 2 truong name va pass
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    // setUser({ ...user, [e.target.name]: e.target.value });
    setUser(newUser);
    const count = newUser.password.length;
    const rl = newUser.role;
    const usn = newUser.username;
    if (user.password !== "") {
      if (count + 1 > 6) {
        setActivePass(true);
      } else {
        setActivePass(false);
      }
    } else {
      setActivePass(false);
    }
    if (rl !== "") {
      if (rl === "admin" || rl === "user") {
        setActiveRole(true);
      }
    } else {
      setActiveRole(false);
    }
    if (usn !== "") {
      if (usn.length >= 3) {
        setActiveUserName(true);
      } else {
        setActiveUserName(false);
      }
    } else {
      setActiveUserName(false);
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
    if (
      user.username !== "" &&
      activeConfigPass === true &&
      user.password !== "" &&
      user.password === configPass.configPass &&
      user.role !== ""
    ) {
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
        } else {
          setExistUser(true);
        }
      });
    }
    if (user.username === "") {
      setActiveUserName(false);
    }

    if (user.password === "") {
      setActivePass(false);
    }
    if (user.password !== configPass.configPass) {
      setActiveConfigPass(false);
    }
    if (user.role === "") {
      setActiveRole(false);
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
                <label htmlFor="username">Tên Đăng Nhập:</label>
                <input
                  value={user.username}
                  name="username"
                  className="form-control"
                  style={existUser ? { border: "1px solid red" } : null}
                  onChange={onChange}
                  placeholder="UserName"
                />
                {activeUserName !== null ? (
                  activeUserName ? null : (
                    // <i className="text-success fas fa-check-circle"></i>
                    <small className="form-text text-muted">
                      <i className="text-danger fas fa-times-circle">
                        <i className="mx-1">
                          Vui lòng nhập username từ 3 ký tự trở lên
                        </i>
                      </i>
                    </small>
                    // <i className="text-danger fas fa-times-circle"></i>
                  )
                ) : null}
              </div>
              {/* <div className="form-group">
                <label htmlFor="username">Loại Tài Khoản:</label>
                <input
                  value={user.role}
                  name="role"
                  className="form-control"
                  onChange={onChange}
                  placeholder="User or Admin"
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="role">Chọn Loại Tài Khoản</label>
                <select
                  className="form-control"
                  name="role"
                  value={user.role}
                  onChange={onChange}
                >
                  <option value="" disabled>
                    {" "}
                    Chọn Loại
                  </option>
                  <option value="user"> User</option>
                  <option value="admin">Admin</option>
                </select>
                {activeRole !== null ? (
                  activeRole ? null : (
                    // <i className="text-success fas fa-check-circle"></i>
                    <small className="form-text text-muted">
                      <i className="text-danger fas fa-times-circle">
                        <i className="mx-1">Vui lòng chọn loại tài khoản</i>
                      </i>
                    </small>
                    // <i className="text-danger fas fa-times-circle"></i>
                  )
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="password">Mật Khẩu:</label>
                <br />
                <input
                  value={user.password}
                  type="password"
                  name="password"
                  className="form-control float-right"
                  onChange={onChange}
                  placeholder="Nhập Password"
                />
                {activePass !== null ? (
                  activePass ? (
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
                          Vui lòng nhập mật khẩu từ 6 ký tự trở lên.
                        </i>
                      </i>
                    </small>
                    // <i className="text-danger fas fa-times-circle"></i>
                  )
                ) : null}
              </div>
              <div
                className={`form-group ${activePass !== null ? null : "my-5"}`}
              >
                <label htmlFor="password">Nhập Lại Mật Khẩu:</label>
                <input
                  value={configPass.configPass}
                  type="password"
                  name="configPass"
                  className="form-control"
                  onChange={onChangeConfigPass}
                  placeholder="Nhập Lại Password"
                />
                {activeConfigPass !== null ? (
                  activeConfigPass ? (
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
                          Mật khẩu không khớp, để chắc chắn vui lòng nhập lại
                          hai lần password.
                        </i>
                      </i>
                    </small>
                    // <i className="text-danger fas fa-times-circle"></i>
                  )
                ) : null}
              </div>
              <button type="submit" className="btn btn-secondary btn-block">
                Đăng ký
              </button>
            </form>
            <p className="lead mt-4">
              Đã có tài khoản <Link to="/login">Đăng nhập</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
