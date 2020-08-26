import React, { useState, useEffect } from "react";
import BlogService from "../Services/BlogService";
import AuthService from "../Services/AuthService";
import BlogItem from "./BlogItems";
import $ from "jquery";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const BlogPage = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]); //de xac dinh tai khoan nao dang dang nhap
  const [filter, setFilter] = useState("");
  const [findPage, setFindPage] = useState("1");

  const onChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  //state phang trang
  const [currentPage, setCurrentPage] = useState(1); //trang hien tai, mac dinh dau tien la trang 1
  const [blogsPerPage, setblogsPerPage] = useState(3); // so luong hien thi
  const [upperPageBound, setUpperPageBound] = useState(3); // so trang hien thi toi da tren thanh chuyen trang, mac dinh la 3
  const [lowerPageBound, setLowerPageBound] = useState(0); // so trang hien thi toi thieu tren thanh chuyen trang, mac dinh la 0
  const [isPrevBtnActive, setIsPrevBtnActive] = useState("disabled"); // dung de cap nhat trang thai cho nut prev, mac dinh la disable
  const [isNextBtnActive, setIsNextBtnActive] = useState(""); // dung de cap nhat trang thai cho nut next
  const [isLastBtnActive, setIsLastBtnActive] = useState(""); // dung de cap nhat trang thai cho nut next
  const [isFirstBtnActive, setIsFirstBtnActive] = useState("disabled"); // dung de cap nhat trang thai cho nut next
  const [pageBound, setPageBound] = useState(3); // rang buoc trang (luon nho hon so luong du lieu hien thi)

  // currentPage: 1,
  // blogsPerPage: 6,
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
    }, []);
  }, []);
  //lay du lieu
  useEffect(() => {
    if (user.role === "admin")
      BlogService.getBlog().then((data) => {
        const { blogs, message } = data; // const blogs = data.blogs; const message = data.message
        if (!message.msgError) setBlogs(blogs);
        // console.log(data);
        // console.log(blogs);
        // console.log(message);
      });
    //su dung cho getblogbyuser neu la user (chi load cac blog cua user do)
    else {
      BlogService.getBlogByUser().then((data) => {
        const { blogs, username } = data.blogs;
        const { message } = data;
        if (!message.msgError) setBlogs(blogs);
        setUserName(username);
      });
    }
  }, [user]);

  const toTop = () => {
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  //ham phan trang

  //thay doi so trang
  //bam vao so
  const handleClick = (event) => {
    toTop(); //về đầu trang
    let listid = Number(event.target.id); // so trang vua click
    setCurrentPage(listid); // set lai so trang hien tai cho state currentPage
    setFindPage(listid);
    $("ul li.active").removeClass("active text-primary"); //xoa
    $("ul li#" + listid).addClass("active text-primary"); //cap nhat lai
    setPrevAndNextBtnClass(listid); // cap nhat trang thai prev va next khi dang o trang vua click
  };

  //cap nhat trang thai cho prev va next
  //khi chuyen vao so trang
  const setPrevAndNextBtnClass = (listid) => {
    //tong so trang
    let totalPage = Math.ceil(blogs.length / blogsPerPage); // ceil lam tron len
    setIsNextBtnActive("disabled");
    setIsPrevBtnActive("disabled");
    setIsLastBtnActive("disabled");
    setIsFirstBtnActive("disabled");
    if (totalPage === listid && totalPage > 1) {
      setIsPrevBtnActive(""); // neu tong trang === so trang dang hien thi tong so trang > 1 thi prev dc bat
      setIsFirstBtnActive("");
    } else if (listid === 1 && totalPage > 1) {
      setIsNextBtnActive(""); // neu so trang dang hien === 1 (trang dau tien) va tong so trang > 1 thi nut next dc bat
      setIsLastBtnActive("");
    } else if (totalPage > 1) {
      //con neu khong xac dinh tong so trang = may va trang hien tai la bao nhieu ma chi biet tong so trang > 1 prev next deu bat
      setIsPrevBtnActive("");
      setIsLastBtnActive("");
      setIsNextBtnActive("");
      setIsFirstBtnActive("");
    }
  };

  //tang so
  //dung de click vao so
  const btnIncrementClick = () => {
    toTop();
    setUpperPageBound(upperPageBound + pageBound);
    setLowerPageBound(lowerPageBound + pageBound);
    let listid = upperPageBound + 1;
    setCurrentPage(listid);
    setFindPage(listid);
    setPrevAndNextBtnClass(listid);
  };

  //giam so
  //dung de click vao so
  const btnDecrementClick = () => {
    toTop();
    setUpperPageBound(upperPageBound - pageBound);
    setLowerPageBound(lowerPageBound - pageBound);
    let listid = upperPageBound - pageBound;
    setCurrentPage(listid);
    setFindPage(listid);
    setPrevAndNextBtnClass(listid);
  };

  //giam so trang
  //dung de click vao nut prev
  const btnPrevClick = () => {
    toTop();
    //truong hop khong the xay ra
    //vi luc nao trang hien tai cung nho hon pageBound
    if ((currentPage - 1) % pageBound === 0) {
      setUpperPageBound(upperPageBound - pageBound);
      setLowerPageBound(lowerPageBound - pageBound);
    }

    //truong hop xay ra
    let listid = currentPage - 1; //trang hien tai tru 1
    setCurrentPage(listid); // set lai state currentPage
    setFindPage(listid);
    setPrevAndNextBtnClass(listid); // cap nhat lai cac nut
  };

  //tang so trang
  //dung de click vao nut next
  const btnNextClick = () => {
    toTop();
    if (currentPage + 1 > upperPageBound) {
      setUpperPageBound(upperPageBound + pageBound);
      setLowerPageBound(lowerPageBound + pageBound);
    }
    let listid = currentPage + 1;
    setCurrentPage(listid);
    setFindPage(listid);
    setPrevAndNextBtnClass(listid);
  };

  //trang cuoi
  const btnLastClick = () => {
    toTop();
    let listid = Math.ceil(blogs.length / blogsPerPage);
    setCurrentPage(listid);
    setFindPage(listid);
    setIsNextBtnActive("disabled");
    setIsLastBtnActive("disabled");
    setIsPrevBtnActive("");
    setIsFirstBtnActive("");
  };

  const btnFirstClick = () => {
    toTop();
    let listid = 1;
    setCurrentPage(listid);
    setFindPage(listid);
    setIsNextBtnActive("");
    setIsPrevBtnActive("disabled");
    setIsLastBtnActive("");
    setIsFirstBtnActive("disabled");
  };

  // Logic for displaying current blogs
  const indexOfLastNew = currentPage * blogsPerPage; //vd dang o trang 1  = 3
  const indexOfFirstNew = indexOfLastNew - blogsPerPage; // 3 - 3 = 0
  const currentblogs = blogs.slice(indexOfFirstNew, indexOfLastNew); // lay trong khoang tu 0 -> 3

  const render = filter
    ? blogs.filter((blog) => {
        return blog.title.toLowerCase().includes(filter.toLowerCase());
      })
    : currentblogs.filter((blog) => {
        return blog.title.toLowerCase().includes(filter.toLowerCase());
      });

  const renderContent = render.map((blog, index) => {
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

  let totalPage = Math.ceil(blogs.length / blogsPerPage); //tong trang ceil lam tron len

  const handlePage = (event) => {
    const listid = event.target.value;
    setFindPage(listid);
    //setCurrentPage(listid);
    //setPrevAndNextBtnClass(listid);
  };

  const handleKeyPress = (event) => {
    const re = /^[0-9\b]+$/;
    //const page = event.target.value;
    //kiem tra khi nhan phim enter se thuc hien yeu cau
    if (event.key === "Enter") {
      //kiem tra co phai la so ko
      if (re.test(findPage) && findPage <= totalPage) {
        setCurrentPage(findPage);
        setPrevAndNextBtnClass(findPage);
        toTop();
      } else if (!findPage || findPage > totalPage) {
        alert("khong co trang nay");
      } else {
        alert("chi nhap so");
      }
    }
  };

  const renderFindPage = () => {
    return (
      <div
        className="row"
        style={{
          color: "#b8c3ce",
          fontSize: "26px",
          fontWeight: "bold",
          textAlign: "right",
        }}
      >
        <div className="col">
          {"Trang "}
          <input
            type="text"
            onKeyPress={handleKeyPress}
            onChange={handlePage}
            value={findPage}
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              width: "33px",
              height: "23px",
              textAlign: "right",
              color: "#b8c3ce",
              background: "#343a40",
              outline: "none",
            }}
          ></input>
          {totalPage === 0 ? " /?" : ` /${totalPage}`}
        </div>
      </div>
    );
  };

  if (blogs.length > 0 && renderContent.length > 0) {
    return (
      <div className="container-fluid my-2 p-0">
        <div className="jumbotron mt-2">
          <h1 className="display-3 d-flex justify-content-center">
            Blog Lists
          </h1>
        </div>
        <div className="row">
          <div className="col">
            <div className="editor-blog">
              <Link to="/blog/create">
                <button type="button" className="btn btn-primary">
                  <i className="fas fa-newspaper mx-2"></i>
                  Biên Tập
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              className="mt-2"
              type="text"
              placeholder="lọc dữ liệu"
              value={filter}
              onChange={onChangeFilter}
            />
          </div>
        </div>

        {/* <div
          style={{ fontSize: "25px", fontWeight: "bold", color: "#b8c3ce" }}
        >{`Trang ${currentPage}/${totalPage}`}</div>
        <input type="text" onKeyPress={handleKeyPress}></input> */}
        <hr />
        {filter === "" ? renderFindPage() : null}
        <div className="row mt-2 d-flex justify-content-center">
          {renderContent}
        </div>
        {blogs.length > 3 && filter === "" ? (
          <Pagination
            blogs={blogs}
            currentPage={currentPage}
            blogsPerPage={blogsPerPage}
            upperPageBound={upperPageBound}
            lowerPageBound={lowerPageBound}
            isPrevBtnActive={isPrevBtnActive}
            isNextBtnActive={isNextBtnActive}
            isLastBtnActive={isLastBtnActive}
            isFirstBtnActive={isFirstBtnActive}
            handleClick={handleClick}
            btnIncrementClick={btnIncrementClick}
            btnDecrementClick={btnDecrementClick}
            btnPrevClick={btnPrevClick}
            btnNextClick={btnNextClick}
            btnLastClick={btnLastClick}
            btnFirstClick={btnFirstClick}
          />
        ) : null}
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
        <div className="row">
          <div className="col">
            <div className="editor-blog">
              <Link to="/blog/create">
                <button type="button" className="btn btn-primary">
                  <i className="fas fa-newspaper mx-2"></i>
                  Biên Tập
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              className="mt-2"
              type="text"
              placeholder="lọc dữ liệu"
              value={filter}
              onChange={onChangeFilter}
            />
          </div>
        </div>

        {filter === "" ? renderFindPage() : null}
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
};

export default BlogPage;
