import React, { useState, useEffect } from "react";
import BlogService from "../Services/BlogService";
import AuthService from "../Services/AuthService";
import BlogItem from "./BlogItems";
import $ from "jquery";
import { Link } from "react-router-dom";

function BlogPage(props) {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);

  //state phang trang
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage, setNewsPerPage] = useState(3);
  const [upperPageBound, setUpperPageBound] = useState(3);
  const [lowerPageBound, setLowerPageBound] = useState(0);
  const [isPrevBtnActive, setIsPrevBtnActive] = useState("disabled");
  const [isNextBtnActive, setIsNextBtnActive] = useState("");
  const [pageBound, setPageBound] = useState(3);

  // currentPage: 1,
  // newsPerPage: 6,
  // upperPageBound: 3,
  // lowerPageBound: 0,
  // isPrevBtnActive: "disabled",
  // isNextBtnActive: "",
  // pageBound: 3,

  //su dung khi xai getblogbyuser de lay ra ten user dang blog
  const [username, setUserName] = useState("");

  //set user
  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      const { user } = data;
      setUser(user);
      console.log(user.role);
    });
    //su dung cho getblog
    //BlogService.getBlog().then((data) => {
    //const { blogs, message } = data; // const blogs = data.blogs; const message = data.message
    // if (!message.msgError) setBlogs(blogs);
    // console.log(data);
    // console.log(blogs);
    // console.log(message);
    //});

    //su dung cho getblogbyuser
    // BlogService.getBlogByUser().then((data) => {
    //   const { blogs, username } = data.blogs;
    //   const { message } = data;
    //   if (!message.msgError) setBlogs(blogs);
    //   setUserName(username);
    // console.log(data);
    // console.log(blogs);
    // console.log(message);
    // console.log(username);
    //});
  }, []);
  //lay du lieu
  useEffect(() => {
    //su dung cho getblog
    if (user.role === "admin")
      BlogService.getBlog().then((data) => {
        const { blogs, message } = data; // const blogs = data.blogs; const message = data.message
        if (!message.msgError) setBlogs(blogs);
        // console.log(data);
        // console.log(blogs);
        // console.log(message);
      });
    //su dung cho getblogbyuser
    else {
      BlogService.getBlogByUser().then((data) => {
        const { blogs, username } = data.blogs;
        const { message } = data;
        if (!message.msgError) setBlogs(blogs);
        setUserName(username);
      });
    }
  }, [user]);

  //ham phan trang

  useEffect(() => {
    $("ul li.active").removeClass("active text-primary");
    $("ul li#" + currentPage).addClass("active text-primary");
  }, [currentPage]);

  const handleClick = (event) => {
    let listid = Number(event.target.id);
    setCurrentPage(listid);
    $("ul li.active").removeClass("active text-primary");
    $("ul li#" + listid).addClass("active text-primary");
    setPrevAndNextBtnClass(listid);
  };

  const setPrevAndNextBtnClass = (listid) => {
    let totalPage = Math.ceil(blogs.length / newsPerPage);
    setIsNextBtnActive("disabled");
    setIsPrevBtnActive("disabled");
    if (totalPage === listid && totalPage > 1) {
      setIsPrevBtnActive("");
    } else if (listid === 1 && totalPage > 1) {
      setIsNextBtnActive("");
    } else if (totalPage > 1) {
      setIsPrevBtnActive("");
      setIsNextBtnActive("");
    }
  };

  const btnIncrementClick = () => {
    setUpperPageBound(upperPageBound + pageBound);
    setLowerPageBound(lowerPageBound + pageBound);
    let listid = this.state.upperPageBound + 1;
    setCurrentPage(listid);
    setPrevAndNextBtnClass(listid);
  };

  const btnDecrementClick = () => {
    setUpperPageBound(upperPageBound + pageBound);
    setLowerPageBound(lowerPageBound + pageBound);
    let listid = upperPageBound - pageBound;
    setCurrentPage(listid);
    setPrevAndNextBtnClass(listid);
  };

  const btnPrevClick = () => {
    if ((currentPage - 1) % pageBound === 0) {
      setUpperPageBound(upperPageBound - pageBound);
      setLowerPageBound(lowerPageBound - pageBound);
    }
    let listid = currentPage - 1;
    setCurrentPage(listid);
    setPrevAndNextBtnClass(listid);
  };

  const btnNextClick = () => {
    if (currentPage + 1 > upperPageBound) {
      setUpperPageBound(upperPageBound + pageBound);
      setLowerPageBound(lowerPageBound + pageBound);
    }
    let listid = currentPage + 1;
    setCurrentPage(listid);
    setPrevAndNextBtnClass(listid);
  };

  // Logic for displaying current blogs
  const indexOfLastNew = currentPage * newsPerPage;
  const indexOfFirstNew = indexOfLastNew - newsPerPage;
  const currentblogs = blogs.slice(indexOfFirstNew, indexOfLastNew);

  //console.log(user);
  //console.log(blogs);
  // const renderContent = blogs.map((blog, index) => {
  //   return (
  //     <BlogItem
  //       key={index}
  //       blog={blog}
  //       username={username}
  //       user={user}
  //       index={index + 1}
  //     />
  //   );
  // });
  const renderContent = currentblogs.map((blog, index) => {
    return (
      <BlogItem
        key={index}
        blog={blog}
        username={username}
        user={user}
        index={index + 1}
      />
    );
  });

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(blogs.length / newsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number, index) => {
    if (number === 1 && currentPage === 1) {
      return (
        <li
          key={index}
          className="active text-primary numberpage"
          id={number}
          onClick={handleClick}
        >
          <div className="" id={number}>
            {number}
          </div>
        </li>
      );
    } else if (number < upperPageBound + 1 && number > lowerPageBound) {
      return (
        <li
          key={index}
          id={number}
          className="active numberpage"
          onClick={handleClick}
        >
          <div id={number} className="">
            {number}
          </div>
        </li>
      );
    }
    return <div key={index}></div>;
  });

  let pageIncrementBtn = null;
  if (pageNumbers.length > upperPageBound) {
    pageIncrementBtn = (
      <li className="text-primary page-link dots" onClick={btnIncrementClick}>
        {/* <div onClick={this.btnIncrementClick}> &hellip; </div> */}
        &hellip;
      </li>
    );
  }

  let pageDecrementBtn = null;
  if (lowerPageBound >= 1) {
    pageDecrementBtn = (
      <li className="text-primary page-link dots" onClick={btnDecrementClick}>
        {/* <div onClick={this.btnDecrementClick}> &hellip; </div> */}
        &hellip;
      </li>
    );
  }

  let renderPrevBtn = null;
  if (isPrevBtnActive === "disabled") {
    renderPrevBtn = (
      <li className={isPrevBtnActive ? "page-item" : ""}>
        <span className="text-secondary page-link" id="btnPrev">
          {" "}
          Prev{" "}
        </span>
      </li>
    );
  } else {
    renderPrevBtn = (
      <li className={isPrevBtnActive ? "page-item" : ""} onClick={btnPrevClick}>
        <div className="text-primary page-link" id="btnPrev">
          {" "}
          Prev{" "}
        </div>
      </li>
    );
  }

  let renderNextBtn = null;
  if (isNextBtnActive === "disabled") {
    renderNextBtn = (
      <li className={isNextBtnActive ? "page-item" : ""}>
        <span id="btnNext" className="text-secondary page-link">
          {" "}
          Next{" "}
        </span>
      </li>
    );
  } else {
    renderNextBtn = (
      <li className={isNextBtnActive ? "page-item" : ""} onClick={btnNextClick}>
        <div className="text-primary page-link" id="btnNext">
          {" "}
          Next{" "}
        </div>
      </li>
    );
  }

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
        <div className="row d-flex justify-content-center">
          <ul id="page-numbers" className="pagination justify-content-center">
            {renderPrevBtn}
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            {renderNextBtn}
          </ul>
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
