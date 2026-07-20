import React, { createContext, useEffect, useState } from "react";
export let AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
// export default function AuthContextProvider({ children }) {
//   let [token, setToken] = useState(null);

//   useEffect(() => {
//     const isLogin = localStorage.getItem("token");
//      console.log("Context:", isLogin);
//     if (isLogin) {
//       setToken(isLogin);
//     }
//   }, []);
//   return (
//     <AuthContext.Provider value={{ token, setToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
