import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";

const NavBar = (props) => {
  //kiểm tra quyền truy cập
  //từ AuthContext ta rút ra đc người dùng và xác thực
  //nếu đc xác thực thì sẽ hiển thị đúng authenticatednavbar ngc lại hiển thị  unauthenticatednavbar
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickLogout = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        //thiết lập lại người dùng thành rỗng
        setUser(data.user);
        //và thiết lập lại quyền truy cập thành false
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavBar = () => {
    return (
      <>
        <li>
          <NavLink exact to="/" activeStyle={{ background: "#7f0b16bf" }}>
            <i className="fa fa-home" />
            Home
          </NavLink>
        </li>
        <li>
          <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">
            <i className="fa fa-user-circle"></i>
            Account
          </a>
          <ul className="collapse list-unstyled" id="pageSubmenu">
            <li>
              <NavLink to="/login" activeStyle={{ background: "#7f0b16bf" }}>
                <i className="fa fa-sign-in-alt"></i>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="register" activeStyle={{ background: "#7f0b16bf" }}>
                <i className="fa fa-registered"></i>
                Register
              </NavLink>
            </li>
          </ul>
        </li>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <li className="active">
          <NavLink exact to="/" activeStyle={{ background: "#7f0b16bf" }}>
            <i className="fa fa-home" />
            Home
          </NavLink>
          <NavLink exact to="#" title={user.username}>
            <i className="fa fa-user" />
            <span className="username">
              {user.username + "(" + user.role + ")"}
            </span>
          </NavLink>
        </li>

        {user.role === "admin" ? (
          <>
            <li>
              <a
                href="#pageSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
              >
                <i className="fas fa-ad" />
                Admin
              </a>
              <ul className="collapse list-unstyled" id="pageSubmenu">
                <li>
                  <NavLink
                    to="/admin/users"
                    activeStyle={{ background: "#7f0b16bf" }}
                  >
                    <i className="fa fa-users-cog" />
                    Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/controlblogs"
                    activeStyle={{ background: "#7f0b16bf" }}
                  >
                    <i className="fas fa-calendar-check"></i>
                    Phê Duyệt Blogs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/todos"
                    activeStyle={{ background: "#7f0b16bf" }}
                  >
                    <i className="fas fa-clipboard-list" />
                    Todos
                  </NavLink>
                </li>
              </ul>
              <NavLink to="/blogs" activeStyle={{ background: "#7f0b16bf" }}>
                <i className="fas fa-blog" />
                Blogs
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            {/* <NavLink to="/todos" activeStyle={{ background: "#7f0b16bf" }}>
              <i className="fas fa-clipboard-list" />
              Todos
            </NavLink> */}
            <NavLink to="/blogs" activeStyle={{ background: "#7f0b16bf" }}>
              <i className="fas fa-blog" />
              Blogs
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/" onClick={onClickLogout}>
            <i className="fa fa-sign-out-alt"></i>
            Logout
          </NavLink>
        </li>
      </>
    );
  };

  return (
    <nav
      id="sidebar"
      className={"no-select" + (props.activeNav ? " active" : "")}
    >
      <NavLink to="/">
        <div className="sidebar-header">
          <h3>M.E.R.N Stack</h3>
          <strong>F.B</strong>
        </div>
      </NavLink>
      <hr />
      <ul className="list-unstyled components">
        {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        {/* <li className="active">
          <Link to="/">
            <i className="fa fa-home" />
            Home
          </Link>
        </li>
        <li>
          <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">
            <i className="fas fa-ad" />
            Admin
          </a>
          <ul className="collapse list-unstyled" id="pageSubmenu">
            <li>
              <Link to="/admin/users">
                <i className="fa fa-users-cog" />
                Users
              </Link>
            </li>
            <li>
              <Link to="/admin/todos">
                <i className="fas fa-clipboard-list" />
                Todos
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/about">
            <i className="fa fa-briefcase" />
            About
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

// class NavBar extends Component {
//   render() {
//     return (
//       <nav id="sidebar">
//         <Link to="/">
//           <div className="sidebar-header">
//             <h3>Bootstrap Sidebar</h3>
//             <strong>BS</strong>
//           </div>
//         </Link>
//         <hr />
//         <ul className="list-unstyled components">
//           <li className="active">
//             <Link to="/">
//               <i className="fa fa-home" />
//               Home
//             </Link>
//           </li>
//           <li>
//             <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">
//               <i className="fas fa-ad" />
//               Admin
//             </a>
//             <ul className="collapse list-unstyled" id="pageSubmenu">
//               <li>
//                 <Link to="/admin/users">
//                   <i className="fa fa-users-cog" />
//                   Users
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/admin/todos">
//                   <i className="fas fa-clipboard-list" />
//                   Todos
//                 </Link>
//               </li>
//             </ul>
//             <Link to="/about">
//               <i className="fa fa-briefcase" />
//               About
//             </Link>
//           </li>
//         </ul>
//         <footer id="sticky-footer" className="py-4 bg-dark text-white-50">
//           <div className="container text-center">
//             <small>Copyright © Your Website</small>
//           </div>
//         </footer>
//       </nav>
//     );
//   }
// }

export default NavBar;
