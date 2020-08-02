// import React, { createContext, useState, useEffect } from "react";
// import AuthService from "../Services/AuthService";

// export const AuthContext = createContext();

// export default ({ children }) => {
//   //react hook sử dụng state
//   //gán giá trị mặc định cho state là null
//   //sử dụng setUser để cập nhật state
//   //state đăng nhập
//   const [user, setUser] = useState(null);
//   //state xác thực đăng nhập
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   //state tải và thiết lập được tải
//   //xem xác thực rồi mới đc tải
//   const [isLoaded, setIsLoaded] = useState(false);

//   // //đối số thứ để [] có nghĩa là sẽ chỉ chạy một lần duy nhất <=> componentdismoutn
//   // useEffect(() => {
//   //   AuthService.isAuthenticated().then((data) => {
//   //     //tìm và nạp dữ liệu
//   //     setUser(data.user);
//   //     setIsAuthenticated(data.isAuthenticated);
//   //     //khi đã có 2 bộ trên đã nạp dữ liệu xong
//   //     setIsLoaded(true);
//   //   });
//   // }, []);

//   useEffect(() => {
//     AuthService.isAuthenticated().then((data) => {
//       setUser(data.user);
//       setIsAuthenticated(data.isAuthenticated);
//       setIsLoaded(true);
//     });
//   }, []);

//   return (
//     <div>
//       {!isLoaded ? (
//         <h1>Loading</h1>
//       ) : (
//         <AuthContext.Provider
//           value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
//         >
//           {children}
//         </AuthContext.Provider>
//       )}
//     </div>
//   );
// };

import React, { createContext, useState, useEffect } from "react";
import AuthService from "../Services/AuthService";

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <h1>Loading</h1>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
