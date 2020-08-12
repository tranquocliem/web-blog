import React from "react";

function Footer() {
  return (
    <>
      {/* Footer */}
      <footer
        className="page-footer font-small blue-grey lighten-5"
        style={{ backgroundColor: "#DDDDDD" }}
      >
        <div style={{ backgroundColor: "#0066CC" }}>
          <div className="container-fluid">
            <div className="row py-4 d-flex align-items-center">
              <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                <h6
                  className="mb-0"
                  style={{ fontSize: "30px", fontWeight: "bold" }}
                >
                  Quản Lý Blogs
                </h6>
              </div>
              <div className="col-md-6 col-lg-7 text-center text-md-right">
                <a
                  className="fb-ic"
                  target="blank"
                  href="https://www.facebook.com/profile.php?id=100008464638082"
                >
                  <i
                    className="fab fa-facebook-square white-text mr-4"
                    style={{ fontSize: "30px", fontWeight: "bold" }}
                  ></i>
                </a>
                <a
                  className="fb-ic"
                  target="blank"
                  href="https://www.youtube.com/channel/UC488JjMyalqMl7ST0YVEu6w?view_as=subscriber"
                >
                  <i
                    className="fab fa-youtube mr-4"
                    style={{
                      fontSize: "30px",
                      fontWeight: "bold",
                      color: "#CC0000",
                      backgroundColor: "white",
                    }}
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center text-md-left mt-5">
          <div className="row mt-3 dark-grey-text">
            <div className="col-md-3 col-lg-4 col-xl-3 mb-4">
              <h6 className="text-uppercase font-weight-bold">Công Ty</h6>
              <hr
                className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p className="text-secondary font-weight-bold">
                Trách nhiệm hữu hạn một thành viên.
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase font-weight-bold">Công Nghệ</h6>
              <hr
                className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p>
                <a
                  className="text-secondary font-weight-bold"
                  href="https://reactjs.org/"
                  target="blank"
                >
                  ReactJS
                </a>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase font-weight-bold">Liên Hệ</h6>
              <hr
                className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p>
                <i className="fas fa-home mr-3" />
                <span className="text-secondary font-weight-bold">
                  Phong Điền, Cần Thơ
                </span>
              </p>
              <p>
                <i className="fas fa-envelope mr-3" />{" "}
                <span
                  className="text-secondary"
                  style={{ fontWeight: "bold", fontSize: "16.4px" }}
                >
                  tranquocliemc6@gmail.com
                </span>
              </p>
              <p>
                <i className="fas fa-phone mr-3" />{" "}
                <span className="text-secondary font-weight-bold">
                  + 84 782 872 822
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="footer-copyright text-center text-black-50 py-3  font-weight-bold">
          © 2020 Copyright.
        </div>
      </footer>
      {/* Footer */}
    </>
  );
}

export default Footer;
