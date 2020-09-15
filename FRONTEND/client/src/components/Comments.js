import React from "react";
import Textarea from "react-autosize-textarea";
// import { Container } from './styles';

function Comments() {
  return (
    <div>
      <hr></hr>
      <div className="row">
        <div className="col">
          <p>Bình Luận</p>
        </div>
        <div className="pt-2 px-3">
          <select className="form-control">
            <option>Sắp Xếp</option>
            <option>Sắp Xếp</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <form>
            <div className="row">
              <div className="col">
                <Textarea
                  rows={1}
                  maxLength="5500"
                  spellCheck="false"
                  placeholder="viết bình luận"
                  style={{
                    width: "100%",
                    background: "transparent",
                    outline: "none",
                    borderTop: "none",
                    resize: "",
                    borderLeft: "none",
                    borderRight: "none",
                    color: "#b8c3ce",
                  }}
                />
              </div>
            </div>
            <div className="row d-flex justify-content-right">
              <div className="col">
                <button
                  style={{ height: "43px" }}
                  type="button"
                  className="btn btn-primary"
                >
                  Bình Luận
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Comments;
