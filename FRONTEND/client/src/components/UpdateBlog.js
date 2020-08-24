import React, { useState, useEffect } from "react";
import Message from "./Message";
import BlogService from "../Services/BlogService";
import QuillUpdate from "./QuillUpdate";
// import { Container } from './styles';

function UpdateBlog(props) {
  const [content, setContent] = useState("");
  const id = props.match.params.id;
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState(null);

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

  useEffect(() => {
    //console.log(props.match.params.id);
    BlogService.getBlogById(props.match.params.id).then((data) => {
      const { content, title } = data;
      //console.log(data);
      setContent(content);
      setTitle(title);
      //console.log(title);
    });
  }, [props.match.params.id]);

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

  const onSubmit = (e) => {
    e.preventDefault();
    BlogService.updateBlog(id, { content, title }).then((data) => {
      window.scrollTo(0, 0);
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

  const sendContent = content;
  //console.log(sendContent);
  return (
    <div className="container-fluid my-2 p-0">
      <div className="jumbotron mt-2">
        <h1 className="display-3 d-flex justify-content-center">Update Blog</h1>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-10">
          {message ? <Message message={message} /> : null}
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
            sendContent={sendContent}
            Temp={content}
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
}

export default UpdateBlog;
