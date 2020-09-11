import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import DuongDanURL from "./components/DuongDanURL";
import TonggleSider from "./components/ToggleSideBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollIndicator from "./components/ScrollIndicator";

// class App extends Component {
//   render() {
//     return (
//       <HashRouter>
//         <div className="wrapper">
//           <NavBar />
//           <div id="content">
//             <TonggleSider />
//             <DuongDanURL />
//           </div>
//         </div>
//       </HashRouter>
//     );
//   }
// }

function App(props) {
  const [activeNav, setActiveNav] = useState(false);

  //app nhan lai mot ham de xu ly tu toggleSiderBar
  const handleSliderBarClick = () => {
    setActiveNav(!activeNav);
  };

  return (
    <HashRouter>
      <ScrollIndicator />
      <div className="wrapper">
        {/* chuyen cai state active xuong NavBar (cha -> con thong qua props) */}
        <NavBar activeNav={activeNav} />
        <div id="content">
          <TonggleSider
            handleSliderBarClick={handleSliderBarClick}
            activeNav={activeNav}
          />
          <DuongDanURL />
        </div>
      </div>
      <ScrollToTop />
      <Footer />
    </HashRouter>
  );
}

export default App;
// function App() {
//   return (
//     <div>Hello</div>
//     // <Router>
//     //   <div className="container">
//     //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//     //       <Link to={"/"} className="navbar-brand">
//     //         React CRUD Example
//     //       </Link>
//     //       <div className="collapse navbar-collapse" id="navbarSupportedContent">
//     //         <ul className="navbar-nav mr-auto">
//     //           <li className="nav-item">
//     //             <Link to={"/"} className="nav-link">
//     //               Home
//     //             </Link>
//     //           </li>
//     //           <li className="nav-item">
//     //             <Link to={"/add"} className="nav-link">
//     //               Add
//     //             </Link>
//     //           </li>
//     //           <li className="nav-item">
//     //             <Link to={"/index"} className="nav-link">
//     //               Index
//     //             </Link>
//     //           </li>
//     //         </ul>
//     //       </div>
//     //     </nav>
//     //     <br />
//     //     <h2>Welcome to React CRUD Tutorial</h2> <br />
//     //     <Switch>
//     //       <Route exact path="/add" component={Add} />
//     //       <Route path="/edit/:id" component={Edit} />
//     //       <Route path="/index" component={index} />
//     //     </Switch>
//     //   </div>
//     // </Router>
//   );
// }

// export default App;
