import React from "react";
import { Link } from "react-router-dom";

function BlogItem(props) {
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
  return (
    // {props.index}
    <div className="col-12 col-sm-6 col-lg-4 col-xl-4">
      <div className="card-deck">
        <div className="card card-edit">
          {/* <a href="/">
            <img
              className="card-img-top"
              src="http://placehold.it/800x400"
              alt=""
            />
          </a> */}
          <div
            className="d-flex justify-content-center stt-card"
            style={{ backgroundColor: props.blog.color }}
          >
            <h2>{props.index >= 10 ? props.index : "0" + props.index}</h2>
          </div>
          <div
            className="card-body"
            style={{ overflowY: "scroll", height: "420px" }}
          >
            <h4 className="card-title" style={{ color: "black" }}>
              {props.blog.title}
            </h4>
            {/* <p className="card-text">{blog.content}</p> */}
            {/* su dung cho getblogs */}
            {/* <p>{props.blog.writer.username}</p> */}
            {/* su dung getblogbyuser */}
            <p>
              {props.user.role === "admin"
                ? props.blog.writer.username
                : props.username}
            </p>
            <br />
            <div dangerouslySetInnerHTML={{ __html: props.blog.content }} />
          </div>
          <div className="control-blogitem mt-2 py-1">
            <div className="row d-flex justify-content-center mt-1">
              <Link
                to={"/post/" + chuyenDoiURL(props.blog.title) + "/" + props.blog._id + ".html"}
              >
                <i className="fas fa-eye view px-3"></i>
              </Link>
              <Link to="/">
                <i className="fas fa-cog update px-3"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default BlogItem;
