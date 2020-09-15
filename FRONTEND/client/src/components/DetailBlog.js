import React, { useState, useEffect, useContext } from "react";
import BlogService from "../Services/BlogService";
import { AuthContext } from "../Context/AuthContext";
import moment from "moment";
import "moment/locale/vi";
import RelatedBlog from "./RelatedBlog";
import fix from "../img/fix.jpg";
import LikeAndDisLike from "./LikeAndDisLike";
import Comments from "./Comments";
// import { Container } from './styles';

function DetailBlog(props) {
  //console.log(props);
  const [post, setPost] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [date, setDate] = useState("");
  const [dateUpdate, setDateUpdate] = useState("");
  const { user } = useContext(AuthContext);
  const postId = props.match.params.id;

  useEffect(() => {
    BlogService.getBlogById(postId).then((data) => {
      //console.log(data.writer.username);
      if (data) {
        setDate(data.createdAt);
        setDateUpdate(data.updatedAt);
        setPost(data);
      }
    });
  }, [postId]);

  useEffect(() => {
    BlogService.getBlog().then((data) => {
      const { blogs, message } = data;
      if (!message.msgError) return setBlogs(blogs);
    });
  }, []);

  //console.log(dateUpdate);
  //console.log(date);
  // const formatDate = () => {
  //   date.split(0, 8);
  // };
  // console.log(formatDate);
  //console.log(post.updatedAt);

  //date
  const dCreate = moment(date).format("L");
  const dUpdate = moment(dateUpdate).format("L");
  const upd = moment(dateUpdate).fromNow();
  const cred = moment(date).fromNow();
  console.log(post);
  //console.log(user);

  if (post.content && post.isDisplay) {
    return (
      <div className="container-fluid my-2 p-0">
        <div className="jumbotron mt-2">
          <h1
            className="display-3 d-flex justify-content-center"
            style={{ textAlign: "center" }}
          >
            {post.title}
          </h1>
        </div>
        <div className="row-fluid ">
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        <div className="row writer mt-5">
          <div className="col">
            <i>
              <p>
                Người đăng:
                {post.writer !== null ? post.writer.username : "Ẩn danh"}, Ngày
                đăng: {dCreate}
                {""}
                {dCreate === dUpdate ? null : `, Ngày cập nhật: ${dUpdate}`}
              </p>
              <p>Đã đăng được {moment(date).fromNow()}</p>
              <p>
                {upd !== cred ? `Đã cập nhật được ${upd}` : null}
                {/* Đã cập nhật được {moment(dateUpdate).fromNow()} */}
              </p>
            </i>
          </div>
        </div>
        <LikeAndDisLike postId={postId} userId={user._id} />
        <hr />
        <div className="row-fluid related-news">
          <span
            style={{ color: "#b8c3ce", fontWeight: "bold", fontSize: "25px" }}
          >
            <i>Có thể bạn muốn xem:</i>
          </span>
          {blogs.map((blog, i) => {
            if (blog._id !== postId) {
              if (i <= 4) return <RelatedBlog blog={blog} key={i} />;
              return (
                <div key={i} style={{ display: "none" }}>
                  Helo
                </div>
              );
            }
            return "";
          })}
        </div>
        <Comments />
      </div>
    );
  } else if (post.content && !post.isDisplay) {
    return (
      <div className="container-fluid my-2 p-0">
        <div className="row d-flex justify-content-center">
          <img className="mt-5" style={{ width: "40%" }} src={fix} alt="Fix" />
        </div>
        <div className="row d-flex justify-content-center">
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "27px",
              color: "#6c757d",
              textShadow: "1px 1px 5px #6c757d",
            }}
            className="mt-4"
          >
            Đang Trỉnh Sửa Quay Lại Sao Nhé!!!
          </div>
        </div>
        <div className="row d-flex justify-content-center mt-2">
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={() => {
              window.location.reload(true);
            }}
          >
            Reload Thử Cái Nè
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid my-2 p-0">
        <div className="row d-flex justify-content-center">
          <div
            style={{
              fontWeight: "bold",
              fontSize: "150px",
              color: "#6c757d",
              textShadow: "1px 1px 5px #6c757d",
            }}
            className="pt-5"
          >
            Loading...
          </div>
        </div>
      </div>
    );
  }
}

export default DetailBlog;
