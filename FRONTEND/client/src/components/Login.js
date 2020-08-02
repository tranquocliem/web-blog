import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import Message from "../components/Message";
const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(false);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    e.preventDefault();
    //...user lấy tất cả các thuộc tính hiện có trong user
    //e.target.name có thể là name hoặc pass
    //e.target.name:e.target.value //lay gia tri cua 2 truong name va pass
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/");
      } else setMessage(message);
    });
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body" style={{ background: "#7386d5" }}>
            <h1 className="text-center mb-3">
              <i className="fas fa-sign-in-alt" /> Đăng nhập
            </h1>
            {message ? <Message message={message} /> : null}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="sr-only">
                  Tên Người Dùng:
                </label>
                <input
                  type="text"
                  name="username"
                  onChange={onChange}
                  className="form-control"
                  placeholder="UserName"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={onChange}
                  className="form-control"
                  placeholder="Nhập Password"
                />
              </div>
              <button type="submit" className="btn btn-secondary btn-block">
                Đăng nhập
              </button>
            </form>
            <p className="lead mt-4" style={{ color: "#fff" }}>
              Chư có tài khoản <Link to="/register">Đăng ký</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
