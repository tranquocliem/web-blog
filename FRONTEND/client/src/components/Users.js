import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserItem from "./UserItem";
import UserService from "../Services/UserService";
import { AuthContext } from "../Context/AuthContext";
// class Users extends Component {
//   render() {
//     return (
//       <div className="container-fluid my-2 p-0">
//         <div className="jumbotron mt-2">
//           <h1 className="display-3 d-flex justify-content-center">Users</h1>
//         </div>
//       </div>
//     );
//   }
// }

const Users = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.role === "spadmin")
      UserService.getUserAll().then((data) => {
        const { users, message } = data;
        if (!message.msgError) {
          setListUsers(users);
        }
      });

    UserService.getUsers().then((data) => {
      const { users, message } = data;
      if (!message.msgError) {
        setListUsers(users);
      }
    });
  }, [user]);

  const reloadUser = () => {
    if (user.role === "spadmin")
      UserService.getUserAll().then((data) => {
        const { users, message } = data;
        if (!message.msgError) {
          setListUsers(users);
        }
      });

    UserService.getUsers().then((data) => {
      const { users, message } = data;
      if (!message.msgError) {
        setListUsers(users);
      }
    });
  };

  const renderUser = listUsers.map((userItem, index) => {
    return (
      <tr key={index}>
        <UserItem
          userItem={userItem}
          index={index + 1}
          reloadUser={reloadUser}
        />
      </tr>
    );
  });

  return (
    <div className="container-fluid my-2 p-0">
      <div className="jumbotron mt-2">
        <h1 className="display-3 d-flex justify-content-center">Users</h1>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col">
          <Link
            to="/register"
            className="btn btn-primary my-2"
            //style={{ width: "200px" }}
          >
            <i className="fa fa-plus m-2"></i>Add
          </Link>
          <table className="table table-striped table-dark table-bordered">
            <thead className="thead-dark text-center">
              <tr>
                <th>STT</th>
                <th>UserName</th>
                <th>Số Má</th>
                <th colSpan="2">Hành Động</th>
              </tr>
            </thead>
            <tbody className="text-center">{renderUser}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
