import React from "react";
// const ToggBar = () => {
//   $(document).ready(function () {
//     $("#sidebarCollapse").on("click", function () {
//       $("#sidebar").toggleClass("active");
//     });
//   });
// };

const ToggleSiderBar = (props) => {
  //chuyen ra ngoai app (con -> cha)
  //o day khong co du lieu gi de chuyen chi biet la vua click vao button nay cho app biet de xu ly
  const handleSliderBarClick = () => {
    props.handleSliderBarClick(); //app chuyen vao 1 cai props la 1 ham de chuyen du lieu ra o day ko co gi de chuyen ra
  };

  return (
    <div className="container-fluid my-2 p-0">
      <div className="navbar-header">
        <button
          data-title="Thay Đổi SliderBar"
          type="button"
          id="sidebarCollapse"
          className="btn btn-info navbar-btn"
          onClick={handleSliderBarClick}
        >
          <i className="fa fa-bars mx-2" />
          <span>{props.activeNav ? "Thụt Ra" : "Thụt Vào"}</span>
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
