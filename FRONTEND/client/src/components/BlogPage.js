import React, { useState, useEffect } from "react";
import BlogService from "../Services/BlogService";
import BlogItem from "./BlogItems";
import { Link } from "react-router-dom";

function BlogPage(props) {
  const [blogs, setBlogs] = useState([]);
  //su dung khi xai getblogbyuser de lay ra ten user dang blog
  const [username, setUserName] = useState("");
  useEffect(() => {
    BlogService.getBlogByUser().then((data) => {
      //su dung cho getblog
      //const { blogs, message } = data; // const blogs = data.blogs; const message = data.message
      // if (!message.msgError) setBlogs(blogs);
      // console.log(data);
      // console.log(blogs);
      // console.log(message);

      //su dung cho getblogbyuser
      const { blogs, username } = data.blogs;
      const { message } = data;
      if (!message.msgError) setBlogs(blogs);
      setUserName(username);
      // console.log(data);
      // console.log(blogs);
      // console.log(message);
      // console.log(username);
    });
  }, []);
  console.log(blogs);
  const renderContent = blogs.map((blog, index) => {
    return (
      <BlogItem key={index} blog={blog} username={username} index={index + 1} />
    );
  });
  if (blogs.length > 0) {
    return (
      // <div className="container-fluid my-2 p-0">
      //   <div className="jumbotron mt-2">
      //     <h1 className="display-3 d-flex justify-content-center">Blog Lists</h1>
      //   </div>
      //   <div className="row d-flex justify-content-center">
      //     <div class="col-10">Hello</div>
      //   </div>
      // </div>
      <div className="container-fluid my-2 p-0">
        <div className="jumbotron mt-2">
          <h1 className="display-3 d-flex justify-content-center">
            Blog Lists
          </h1>
        </div>
        <div className="editor-blog">
          <Link to="/blog/create">
            <button type="button" className="btn btn-primary">
              <i className="fas fa-newspaper mx-2"></i>
              Biên Tập
            </button>
          </Link>
        </div>
        <div className="row mt-2 d-flex justify-content-center">
          {renderContent}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid my-2 p-0">
        <div className="jumbotron mt-2">
          <h1 className="display-3 d-flex justify-content-center">
            Blog Lists
          </h1>
        </div>
        <div className="editor-blog">
          <Link to="/blog/create">
            <button type="button" className="btn btn-primary">
              <i className="fas fa-newspaper mx-2"></i>
              Biên Tập
            </button>
          </Link>
        </div>
        <div className="row">
          <h1
            className="col-12 d-flex justify-content-center mt-5"
            style={{ color: "#6c757d", fontWeight: "bold" }}
          >
            <i>Vắng Hoe Luôn :((</i>
          </h1>
        </div>
      </div>
    );
  }
}

export default BlogPage;
