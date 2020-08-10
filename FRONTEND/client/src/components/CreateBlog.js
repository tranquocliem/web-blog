import React, { useEffect, useState, useContext } from "react";
import QuillEditor from "./QuillEditor";
import AuthService from "../Services/AuthService";
import Message from "./Message";
import BlogService from "../Services/BlogService";
import { AuthContext } from "../Context/AuthContext";

function CreateBlog(props) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState({ title: "" });
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState([]);

  const onChangeTitle = (e) => {
    const newTitle = { ...title };
    newTitle[e.target.name] = e.target.value;
    setTitle(newTitle);
    console.log(title);
  };

  const onEditorChange = (value) => {
    setContent(value);
    //console.log(content);
  };

  const onFilesChange = (files) => {
    setFiles(files);
    //console.log(files);
  };

  //lay duoc cac thong tin tai khoan dang dang nhap va luu vao state user
  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      const { user } = data;
      setUser(user);
      //console.log(user);
    });
  }, []);

  const resetForm = () => {
    setContent("");
  };

  const getRandomColor = () => {
    //0 -> 7
    const COLOR_LIST = [
      "#CC00CC",
      "#FF3333",
      "#336633",
      "#336666",
      "#009966",
      "#FF9900",
      "#AA0000",
      "#009933",
    ];
    //math.random luon ra 1 so tu 0 -> be hon 1 nen nhan cho 8 se ra 1 so tu 0 -> be hon 8 co the la 7. may
    //math.trunc de lay phan nguyen
    const randomIndex = Math.trunc(Math.random() * 8);
    //vd COLOR_LIST[0] = "#CC00CC"
    //randomIndex se tra ve 1 so
    return COLOR_LIST[randomIndex];
  };

  const onSubmit = (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    const colorRand = getRandomColor();
    const variables = {
      //nhung thu can thiet cua model blog
      content: content,
      title: title.title,
      color: colorRand,
      writer: user._id,
    };
    BlogService.addBlog(variables).then((data) => {
      const { message } = data;

      if (data && !message.msgError) {
        setMessage(message);
        resetForm();
        console.log(data);
        setTimeout(() => {
          props.history.push("/blogs");
        }, 1500);
      } else if (message.msgBody === "Error") {
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
        console.log(data);
      } else {
        setMessage(message);
        console.log(data);
      }
    });
  };
  return (
    <div className="container-fluid my-2 p-0">
      <div className="jumbotron mt-2">
        <h1 className="display-3 d-flex justify-content-center">Blog Editor</h1>
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
          <QuillEditor
            placeholder={"Bắt đầu nhập..."}
            onEditorChange={onEditorChange}
            onFilesChange={onFilesChange}
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
                value={title.title}
                onChange={(e) => onChangeTitle(e)}
                type="text"
                className="form-control"
                placeholder="Nhập tiêu đề..."
              />
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block mt-5"
              >
                Đăng bài
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
