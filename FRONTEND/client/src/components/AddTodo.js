import React, { useState, useContext } from "react";
import TodosService from "../Services/TodosService";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";

const AddTodo = (props) => {
  const [todo, setTodo] = useState({
    title: "",
    img: "",
    description: "",
  });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    const newtodo = { ...todo };
    newtodo[e.target.name] = e.target.value;
    setTodo(newtodo);
  };

  // const onChangeTitile = (e) => {
  //   setTodo({ title: e.target.value });
  //   console.log(todo);
  // };

  // const onChangeImg = (e) => {
  //   setTodo({ img: e.target.value });
  // };

  // const onChangeTarea = (e) => {
  //   setTodo({ description: e.target.value });
  //   console.log(todo);
  // };

  const resetForm = () => {
    setTodo({ title: "", img: "", description: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    TodosService.addTodo(todo).then((data) => {
      const { message } = data;
      
      if (message.msgError === true) {
        // TodosService.getTodosByUser().then((getdata) => {
        //   setTodo(getdata.todos);
        //   setMessage(message);
        // });

        setMessage(message);
      } else if (message.msgBody === "Error") {
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
        resetForm();
      }
    });
  };

  return (
    <div className="container-fluid my-2 p-0">
      <div className="jumbotron mt-2">
        <h1 className="display-3 d-flex justify-content-center">Add Todo</h1>
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
                value={todo.title}
                onChange={(e) => onChange(e)}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
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
                value={todo.img}
                onChange={(e) => onChange(e)}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
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
                value={todo.description}
                onChange={(e) => onChange(e)}
                className="form-control"
                rows={3}
                placeholder="Enter Description"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
