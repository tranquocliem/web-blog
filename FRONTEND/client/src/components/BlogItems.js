import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import BlogService from "../Services/BlogService";

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

  const deletePost = () => {
    swal({
      title: "Bạn Có Chắc Không?",
      text: "Nếu xoá bài đăng này sẽ không khôi phục lại được",
      icon: "warning",
      buttons: true, //hiển nút huỷ bên cạnh bên cạnh nút xác nhận mặc định
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        BlogService.deleteBlog(props.blog._id)
          .then(
            swal("Xoá Thành Công", {
              icon: "success",
            })
          )
          .catch((err) => console.log(err));
      }
    });
  };

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            {/* <p>
              {props.user.role === "admin" && props.user !== undefined
                ? props.blog.writer.username
                : props.username}
            </p> */}
            <p>
              {props.user.role === "admin"
                ? props.blog.writer !== null
                  ? props.blog.writer.username
                  : "Ẩn danh"
                : props.username !== null
                ? props.username
                : "Ẩn danh"}
            </p>
            <br />
            <div dangerouslySetInnerHTML={{ __html: props.blog.content }} />
          </div>
          <div className="control-blogitem mt-2 py-1">
            <div className="row d-flex justify-content-center mt-1">
              <Link to={"/update/" + props.blog._id} onClick={toTop}>
                <i className="fas fa-cog update px-3"></i>
              </Link>
              <Link
                to={
                  "/post/" +
                  chuyenDoiURL(props.blog.title) +
                  "/" +
                  props.blog._id +
                  ".html"
                }
                onClick={toTop}
              >
                <i className="fas fa-eye view px-3"></i>
              </Link>
              <div onClick={deletePost}>
                <i className="fas fa-trash-alt delete px-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default BlogItem;
