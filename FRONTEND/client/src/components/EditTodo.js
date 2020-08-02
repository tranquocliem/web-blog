import React, { useState, useEffect } from "react";
import TodosService from "../Services/TodosService";
import Message from "./Message";

const EditTodo = (props) => {
  const [todo, setTodo] = useState({ title: "", img: "", description: "" });
  const [message, setMessage] = useState(null);
  useEffect(() => {
    TodosService.getTodoByID(props.match.params.id).then((data) => {
      setTodo(data);
      //console.log(data);
    });
  }, [props.match.params.id]);

  const onChange = (e) => {
    const newtodo = { ...todo };
    newtodo[e.target.name] = e.target.value;
    setTodo(newtodo);
  };

  const resetForm = () => {
    setTodo({ title: "", img: "", description: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    TodosService.updateTodoById(todo._id, { ...todo }).then((data) => {
      const { message } = data;
      //console.log(data);

      if (message.msgError === false) {
        //props.history.push("/");
        resetForm();
        setTodo(data);
        setMessage(message);
      } else {
        setMessage(message);
      }
    });
  };
  return (
    <div className="container-fluid my-2 p-0">
      <div className="jumbotron mt-2">
        <h1 className="display-3 d-flex justify-content-center">Edit Todo</h1>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-7">
          {message ? <Message message={message} /> : null}
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label
                htmlFor="exampleFormControlInput1"
                className="text-white font-weight-bold"
              >
                Title
              </label>
              <input
                name="title"
                onChange={onChange}
                value={todo !== undefined ? todo.title : ""}
                type="text"
                className="form-control"
                placeholder="Enter Title"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="exampleFormControlInput1"
                className="text-white font-weight-bold"
              >
                Image
              </label>
              <input
                name="img"
                onChange={onChange}
                value={todo !== undefined ? todo.img : ""}
                type="text"
                className="form-control"
                placeholder="Enter Link"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="text-white font-weight-bold"
              >
                Description
              </label>
              <textarea
                name="description"
                onChange={onChange}
                value={todo !== undefined ? todo.description : ""}
                className="form-control"
                rows={3}
                placeholder="Enter Description"
              />
            </div>
            <button type="submit" className="btn btn-warning btn-lg btn-block">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
