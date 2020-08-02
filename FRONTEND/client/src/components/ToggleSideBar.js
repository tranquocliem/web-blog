import React from "react";
import $ from "jquery";



const ToggBar = () => {
  $(document).ready(function () {
    $("#sidebarCollapse").on("click", function () {
      $("#sidebar").toggleClass("active");
    });
  });
};

const ToggleSiderBar = () => {
  return (
    <div className="container-fluid my-2 p-0">
      <div className="navbar-header">
        <button
          type="button"
          id="sidebarCollapse"
          className="btn btn-info navbar-btn"
          onClick={ToggBar}
        >
          <i className="fa fa-bars mx-2" />
          <span>Double Click</span>
        </button>
      </div>
    </div>
  );
};

// class ToggleSiderBar extends Component {
//   render() {
//     return (
//       <div className="container-fluid my-2 p-0" onClick={ToggBar}>
//         <div className="navbar-header">
//           <button
//             type="button"
//             id="sidebarCollapse"
//             className="btn btn-info navbar-btn"
//           >
//             <i className="fa fa-bars mx-2" />
//             <span>Toggle Sidebar</span>
//           </button>
//         </div>
//       </div>
//       // {/* <table className="table">
//       //   <thead className="thead-dark">
//       //     <tr>
//       //       <th scope="col">#</th>
//       //       <th scope="col">First</th>
//       //       <th scope="col">Last</th>
//       //       <th scope="col">Handle</th>
//       //     </tr>
//       //   </thead>
//       //   <tbody>
//       //     <tr>
//       //       <th scope="row">1</th>
//       //       <td>Mark</td>
//       //       <td>Otto</td>
//       //       <td>@mdo</td>
//       //     </tr>
//       //     <tr>
//       //       <th scope="row">2</th>
//       //       <td>Jacob</td>
//       //       <td>Thornton</td>
//       //       <td>@fat</td>
//       //     </tr>
//       //     <tr>
//       //       <th scope="row">3</th>
//       //       <td>Larry</td>
//       //       <td>the Bird</td>
//       //       <td>@twitter</td>
//       //     </tr>
//       //   </tbody>
//       // </table>
//       // <table className="table"> */}
//       // {/* <thead className="thead-light">
//       //     <tr>
//       //       <th scope="col">#</th>
//       //       <th scope="col">First</th>
//       //       <th scope="col">Last</th>
//       //       <th scope="col">Handle</th>
//       //     </tr>
//       //   </thead>
//       //   <tbody>
//       //     <tr>
//       //       <th scope="row">1</th>
//       //       <td>Mark</td>
//       //       <td>Otto</td>
//       //       <td>@mdo</td>
//       //     </tr>
//       //     <tr>
//       //       <th scope="row">2</th>
//       //       <td>Jacob</td>
//       //       <td>Thornton</td>
//       //       <td>@fat</td>
//       //     </tr>
//       //     <tr>
//       //       <th scope="row">3</th>
//       //       <td>Larry</td>
//       //       <td>the Bird</td>
//       //       <td>@twitter</td>
//       //     </tr>
//       //   </tbody>
//       // </table> */}
//     );
//   }
// }

export default ToggleSiderBar;
