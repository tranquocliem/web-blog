import React, { useState, useEffect } from "react";
import BlogService from "../Services/BlogService";

// import { Container } from './styles';

function DetailBlog(props) {
  //console.log(props);
  const [post, setPost] = useState([]);
  const [date, setDate] = useState("");
  const [dateUpdate, setDateUpdate] = useState("");
  const postId = props.match.params.id;
  useEffect(() => {
    BlogService.getBlogById(postId).then((data) => {
      //console.log(data.writer.username);
      setDate(data.createdAt);
      setDateUpdate(data.updatedAt);
      setPost(data);
    });
  }, [postId]);

  //console.log(dateUpdate);
  //console.log(date);
  // const formatDate = () => {
  //   date.split(0, 8);
  // };
  // console.log(formatDate);
  //console.log(post.updatedAt);
  if (post.writer) {
    return (
      <div className="container-fluid my-2 p-0">
        <div className="jumbotron mt-2">
          <h1 className="display-3 d-flex justify-content-center">
            {post.title}
          </h1>
        </div>
        <div className="row-fluid d-flex justify-content-center">
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        <div className="row writer mt-5">
          <div className="col">
            <i>
              <p>
                Người đăng:{" "}
                {post.writer !== undefined ? post.writer.username : ""}, Ngày
                đăng: {date.substr(0, 10)}{" "}
                {date !== dateUpdate
                  ? `, Ngày Cập Nhật: ${dateUpdate.substr(0, 10)}`
                  : null}
              </p>
            </i>
          </div>
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
            className="pt-5 mt-5"
          >
            Loading...
          </div>
        </div>
      </div>
    );
  }
}

export default DetailBlog;
