import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../Context/AuthContextProvider";

export default function ProtectedRoute({ children }) {
  // console.log("Protect:", localStorage.getItem("token"));

  const { token } = useContext(AuthContext);
  // console.log("Context Token:", token);
  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
