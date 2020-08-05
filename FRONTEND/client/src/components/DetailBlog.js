import React, { useState, useEffect } from "react";
import BlogService from "../Services/BlogService";

// import { Container } from './styles';

function DetailBlog(props) {
  //console.log(props);
  const [post, setPost] = useState([]);
  const postId = props.match.params.id;
  useEffect(() => {
    BlogService.getBlogById(postId).then((data) => {
      //console.log(data);
      setPost(data);
    });
  }, [postId]);
  console.log(post);
  return (
    <div className="container-fluid my-2 p-0">
      <div className="jumbotron mt-2">
        <h1 className="display-3 d-flex justify-content-center">
          {post.title}
        </h1>
      </div>
      <div className="row d-flex justify-content-center">
        <div
          className="content-img"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}

export default DetailBlog;
