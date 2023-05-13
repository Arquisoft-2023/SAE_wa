import React from "react";
import { Navigate, Route } from "react-router-dom";
import { userStore } from "../state/zustand";

const PrivateRoute = ({ isSignedIn, children }) => {
  if (!isSignedIn) {
    return <Navigate to={"/signin"} replace />;
  }
  return children;
};

export default PrivateRoute;
