import React from "react";
import { Link } from "react-router-dom";
const TodoItems = (props) => {
  return (
    <tr>
      <td></td>
      <td></td>
      <td></td>
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
        <button style={{ width: "100px" }} className="btn btn-danger m-2">
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
