import React from "react";
import { Link } from "react-router-dom";
import TodosService from "../Services/TodosService";
const TodoItems = (props) => {
  const onClickDelete = () => {
    TodosService.deleteTodo(props.todo._id)
      .then(alert("XoaThanh Cong"))
      .catch((err) => alert("Xoa Khong Thanh Cong" + err));
  };
  return (
    <tr>
      <td>{props.todo.title}</td>
      <td>{props.todo.description}</td>
      <td>{props.todo.img}</td>
      <td>
        {/* <Link
          to="/add-todo"
          className="btn btn-primary m-2"
          style={{ width: "100px" }}
        >
          Add
        </Link> */}
        <Link
          to={"/edit-todo/" + props.todo._id}
          style={{ width: "100px" }}
          className="btn btn-warning m-2"
        >
          <i className="fa fa-edit m-2"></i>Edit
        </Link>
        <button
          onClick={onClickDelete}
          style={{ width: "100px" }}
          className="btn btn-danger m-2"
        >
          <i className="fa fa-trash-alt m-2"></i>Delete
        </button>
      </td>
      {/* <td>
        <button className="btn btn-danger">Delete</button>
      </td> */}
    </tr>
  );
};

export default TodoItems;
