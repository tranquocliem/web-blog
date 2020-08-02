import React, { useState, useEffect } from "react";
import TodosService from "../Services/TodosService";
import TodoItems from "./TodoItems";
import { Link } from "react-router-dom";
// class Todos extends Component {
//   render() {
//     return (
//       <div className="container-fluid my-2 p-0">
//         <div className="jumbotron mt-2">
//           <h1 className="display-3 d-flex justify-content-center">Todos</h1>
//         </div>
//       </div>
//     );
//   }
// }

const TodosUser = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    TodosService.getTodosByUser().then((data) => {
      setTodos(data.todos);
    });
  }, [todos]);

  return (
    <div className="container-fluid my-2 p-0">
      <div className="jumbotron mt-2">
        <h1 className="display-3 d-flex justify-content-center">Todo Lists</h1>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col">
          <Link
            to="/add-todo"
            className="btn btn-primary my-2"
            //style={{ width: "200px" }}
          >
            <i className="fa fa-plus m-2"></i>Add
          </Link>
          <table className="table table-striped table-dark table-bordered">
            <thead className="thead-dark text-center">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Img</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {todos.map((todo, i) => {
                return <TodoItems key={i} todo={todo} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodosUser;
