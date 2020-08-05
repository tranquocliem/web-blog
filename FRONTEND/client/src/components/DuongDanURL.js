import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Users from "./Users";
import Todos from "./Todos";
import Login from "./Login";
import Register from "./Register";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import TodosUser from "./TodosUser";
import PrivateRouter from "../ProtectingRouter/PrivateRouter";
import UnPrivateRouter from "../ProtectingRouter/UnPrivateRouter";
import CreateBlog from "./CreateBlog";
import BlogPage from "./BlogPage";
import DetailBlog from "./DetailBlog";
class DuongDanURL extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <UnPrivateRouter path="/login" component={Login} />
        <UnPrivateRouter path="/register" component={Register} />
        <PrivateRouter
          path="/add-todo"
          roles={["user", "admin"]}
          component={AddTodo}
        />
        <PrivateRouter
          path="/edit-todo/:id"
          roles={["user", "admin"]}
          component={EditTodo}
        />
        <PrivateRouter
          path="/admin/todos"
          roles={["admin"]}
          component={Todos}
        />
        <PrivateRouter
          path="/admin/users"
          roles={["admin"]}
          component={Users}
        />
        <PrivateRouter path="/todos" roles={["user"]} component={TodosUser} />
        <PrivateRouter path="/blog/create" roles={["user","admin"]} component={CreateBlog}/>
        <PrivateRouter path="/blogs" roles={["user","admin"]} component={BlogPage}/>
        <PrivateRouter path="/post/:tieude/:id.html" roles={["user","admin"]} component={DetailBlog}/>

        {/* <Route path="/admin/users" component={Users} /> */}
        {/* <Route path="/admin/todos" component={Todos} /> */}
        {/* <Route path="/todos" component={TodosUser} /> */}
        {/* <Route path="/about" component={About} /> */}
        {/* <Route path="/login" component={Login} /> */}
        {/* <Route path="/register" component={Register} /> */}
        {/* <Route path="/add-todo" component={AddTodo} /> */}
        {/* <Route path="/edit-todo/:id" component={EditTodo} /> */}
      </Switch>
    );
  }
}

export default DuongDanURL;
