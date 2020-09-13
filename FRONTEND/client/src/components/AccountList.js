import React from "react";
import { Link } from "react-router-dom";
import UserService from "../Services/UserService";
import swal from "sweetalert";
const AccountList = (props) => {
  const onClickRemove = () => {
    swal({
      title: "Bạn Có Chắc Không?",
      text: "Nếu xoá tài khoản này sẽ không khôi phục lại được",
      icon: "warning",
      buttons: true, //hiển nút huỷ bên cạnh bên cạnh nút xác nhận mặc định
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        UserService.removeUser(props.userItem._id)
          .then(
            swal("Xoá Thành Công", {
              icon: "success",
            })
          )
          .catch((err) => console.log(err));
        props.reloadUser();
      }
    });
  };
  return (
    <>
      <td>{props.index}</td>
      <td>{props.userItem.username}</td>
      <td>{props.userItem.role}</td>
      <td>
        {/* <Link
          to="/add-todo"
          className="btn btn-primary m-2"
          style={{ width: "100px" }}
        >
          Add
        </Link> */}
        <Link to="#" style={{ width: "100px" }} className="btn btn-warning m-2">
          <i className="fa fa-edit m-2"></i>Edit
        </Link>
        <button
          onClick={onClickRemove}
          style={{ width: "100px" }}
          className="btn btn-danger m-2"
        >
          <i className="fa fa-trash-alt m-2"></i>Delete
        </button>
      </td>
      {/* <td>
        <button className="btn btn-danger">Delete</button>
      </td> */}
    </>
  );
};

export default AccountList;
