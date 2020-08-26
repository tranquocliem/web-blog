import React, { useEffect } from "react";
import $ from "jquery";

function Pagination(props) {
  //ham phan trang

  const handleClick = (event) => {
    props.handleClick(event);
  };

  const btnIncrementClick = () => {
    props.btnIncrementClick();
  };

  const btnDecrementClick = () => {
    props.btnDecrementClick();
  };

  const btnPrevClick = () => {
    props.btnPrevClick();
  };

  const btnNextClick = () => {
    props.btnNextClick();
  };

  const btnLastClick = () => {
    props.btnLastClick();
  };

  const btnFirstClick = () => {
    props.btnFirstClick();
  };

  //cap nhat classname khi trang hien tai thay doi
  useEffect(() => {
    $("ul li.active").removeClass("active text-primary");
    $("ul li#" + props.currentPage).addClass("active text-primary");
  }, [props.currentPage]);

  //cap nhat trang thai cho prev va next
  //khi chuyen vao so trang

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(props.blogs.length / props.blogsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number, index) => {
    if (number === 1 && props.currentPage === 1) {
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
    } else if (
      number < props.upperPageBound + 1 &&
      number > props.lowerPageBound
    ) {
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
  if (pageNumbers.length > props.upperPageBound) {
    pageIncrementBtn = (
      <li className="text-primary page-link dots" onClick={btnIncrementClick}>
        {/* <div onClick={btnIncrementClick}> &hellip; </div> */}
        &hellip;
      </li>
    );
  }

  let pageDecrementBtn = null;
  if (props.lowerPageBound >= 1) {
    pageDecrementBtn = (
      <li className="text-primary page-link dots" onClick={btnDecrementClick}>
        {/* <div onClick={btnDecrementClick}> &hellip; </div> */}
        &hellip;
      </li>
    );
  }

  let renderPrevBtn = null;
  if (props.isPrevBtnActive === "disabled") {
    renderPrevBtn = (
      <li className={props.isPrevBtnActive ? "page-item" : ""}>
        <span className="text-secondary page-link" id="btnPrev">
          {" "}
          <i className="fas fa-angle-left"></i>{" "}
        </span>
      </li>
    );
  } else {
    renderPrevBtn = (
      <li
        className={props.isPrevBtnActive ? "page-item" : ""}
        onClick={btnPrevClick}
      >
        <div className="text-primary page-link" id="btnPrev">
          {" "}
          <i className="fas fa-angle-left"></i>{" "}
        </div>
      </li>
    );
  }

  let renderNextBtn = null;
  if (props.isNextBtnActive === "disabled") {
    renderNextBtn = (
      <li className={props.isNextBtnActive ? "page-item" : ""}>
        <span id="btnNext" className="text-secondary page-link">
          {" "}
          <i className="fas fa-angle-right"></i>{" "}
        </span>
      </li>
    );
  } else {
    renderNextBtn = (
      <li
        className={props.isNextBtnActive ? "page-item" : ""}
        onClick={btnNextClick}
      >
        <div className="text-primary page-link" id="btnNext">
          {" "}
          <i className="fas fa-angle-right"></i>{" "}
        </div>
      </li>
    );
  }

  let renderLastBtn = null;
  if (props.isLastBtnActive === "disabled") {
    renderLastBtn = (
      <li className={props.isLastBtnActive ? "page-item" : ""}>
        <span id="btnLast" className="text-secondary page-link">
          {" "}
          <i className="fas fa-angle-double-right"></i>{" "}
        </span>
      </li>
    );
  } else {
    renderLastBtn = (
      <li
        className={props.isLastBtnActive ? "page-item" : ""}
        onClick={btnLastClick}
      >
        <div className="text-primary page-link" id="btnLast">
          {" "}
          <i className="fas fa-angle-double-right"></i>{" "}
        </div>
      </li>
    );
  }

  let renderFistBtn = null;
  if (props.isFirstBtnActive === "disabled") {
    renderFistBtn = (
      <li className={props.isFirstBtnActive ? "page-item" : ""}>
        <span id="btnLast" className="text-secondary page-link">
          {" "}
          <i className="fas fa-angle-double-left"></i>{" "}
        </span>
      </li>
    );
  } else {
    renderFistBtn = (
      <li
        className={props.isFirstBtnActive ? "page-item" : ""}
        onClick={btnFirstClick}
      >
        <div className="text-primary page-link" id="btnLast">
          {" "}
          <i className="fas fa-angle-double-left"></i>{" "}
        </div>
      </li>
    );
  }

  return (
    <div className="row-fluid d-flex justify-content-center">
      <ul id="page-numbers" className="pagination justify-content-center">
        {renderFistBtn}
        {renderPrevBtn}
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        {renderNextBtn}
        {renderLastBtn}
      </ul>
    </div>
  );
}

export default Pagination;
