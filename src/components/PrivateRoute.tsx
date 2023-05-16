import React from "react";
import { Navigate } from "react-router-dom";
import { userStore } from "../state/zustand";

const PrivateRoute = ({ isSignedIn, children }) => {
  const { usuarioRol } = userStore();
  if (!isSignedIn) {
    return <Navigate to={"/signin"} replace />;
  }
  return children;
};

export default PrivateRoute;
