import React, { useState, useEffect, useContext } from "react";
import Message from "./Message";
import BlogService from "../Services/BlogService";
import QuillUpdate from "./QuillUpdate";
import { AuthContext } from "../Context/AuthContext";
import UpdateError from "../img/update-error.gif";
// import { Container } from './styles';

function UpdateBlog(props) {
  const [content, setContent] = useState("");
  const id = props.match.params.id;
  const [title, setTitle] = useState("");
  const [isDisplay, setIsDisplay] = useState(null);
  const [message, setMessage] = useState(null);
  const [activeHacker, setActiveHacker] = useState(false);
  const { user } = useContext(AuthContext);

  const chuyenDoiURL = (str) => {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    str = str.replace(/(đ)/g, "d");

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, "");

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, "-");

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, "");

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, "");

    // return
    return str;
  };

  // useEffect(() => {
  //   //console.log(props.match.params.id);
  //   BlogService.getBlogById(props.match.params.id).then((data) => {
  //     const { content, title, isDisplay } = data;
  //     //console.log(data);
  //     setContent(content);
  //     setTitle(title);
  //     setIsDisplay(isDisplay);
  //     //setIdWriter(data.writer._id);
  //     //console.log(title);
  //     //console.log(writer);
  //   });
  // }, [props.match.params.id]);

  useEffect(() => {
    const variable = {
      _id: id,
      writer: user._id,
    };
    BlogService.getBlogsById(variable).then((data) => {
      if (data.blog !== null) {
        const { content, title, isDisplay } = data.blog;
        //console.log(data);
        setContent(content);
        setTitle(title);
        setIsDisplay(isDisplay);
        //setIdWriter(data.writer._id);
        //console.log(title);
        //console.log(writer);
        //console.log(data);
      } else {
        setActiveHacker(true);
      }
    });
  }, [id, user._id]);

  const onChangeTitle = (e) => {
    // const newTitle = {...title};
    // newTitle[e.target.name] = e.target.value;
    // setTitle(newTitle);
    //console.log(newTitle);
    setTitle(e.target.value);
  };

  const onEditorChange = (value) => {
    setContent(value);
    //console.log(content);
  };

  const onHandleDisplay = () => {
    setIsDisplay(!isDisplay);
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   BlogService.updateBlog(id, { content, title, isDisplay }).then((data) => {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //     const { message } = data;
  //     setMessage(message);
  //     if (!message.msgError) {
  //       setTimeout(() => {
  //         props.history.push(
  //           "/post/" + chuyenDoiURL(data.title) + "/" + id + ".html"
  //         );
  //       }, 1500);
  //     }
  //   });
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    const variable = {
      _id: id,
      writer: user._id,
      content: content,
      title: title,
      isDisplay: isDisplay,
    };
    BlogService.updateBlogs(variable).then((data) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const { message } = data;
      setMessage(message);
      if (!message.msgError) {
        setTimeout(() => {
          props.history.push(
            "/post/" + chuyenDoiURL(data.title) + "/" + id + ".html"
          );
        }, 1500);
      }
    });
  };

  if (!activeHacker) {
    return (
      <div className="container-fluid my-2 p-0">
        <div className="jumbotron mt-2">
          <h1 className="display-3 d-flex justify-content-center">
            Update Blog
          </h1>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-10">
            {message ? <Message message={message} /> : null}
            {user.role === "admin" ? (
              <button
                type="button"
                onClick={onHandleDisplay}
                className={isDisplay ? "btn btn-primary" : "btn btn-secondary"}
              >
                {isDisplay ? "Đã Phê Duyệt" : "Chưa Phê Duyệt"}
              </button>
            ) : null}
            <br />
            <label
              htmlFor="exampleFormControlInput1"
              className="text-white font-weight-bold mt-3"
            >
              Nội Dung:
            </label>
            <QuillUpdate
              placeholder={"Bắt đầu nhập..."}
              onEditorChange={onEditorChange}
              id={id}
              userId={user._id}
            />
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="text-white font-weight-bold mt-4"
                >
                  Tiêu Đề:
                </label>
                <input
                  name="title"
                  value={title}
                  onChange={(e) => onChangeTitle(e)}
                  type="text"
                  className="form-control"
                  placeholder="Nhập tiêu đề..."
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block mt-5"
                >
                  Cập Nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid my-2 p-0">
        <div className="row mt-4">
          <div className="col d-flex justify-content-center">
            <img src={UpdateError}></img>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "45px",
                color: "#6c757d",
                textShadow: "1px 1px 5px #6c757d",
              }}
            >
              Hừ Nè Dám Sửa Bài Của Người Ta À!!! &#128544;&#128544;&#128544;{" "}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateBlog;
