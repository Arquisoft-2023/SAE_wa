import React from "react";
import { Navigate } from "react-router-dom";
import { rolesByLink } from "../services/rolesServices/rolesFunctions";
import { userStore } from "../state/zustand";

const PrivateRoute = ({ isSignedIn, type, children }) => {
  const globalState = userStore.getState();

  if (!isSignedIn) {
    return <Navigate to={"/signin"} replace />;
  } else {
    if (type === "home") {
      return children;
    } else if (type) {
      return children;
      // if (rolesByLink(type, globalState.usuarioRol)) {
      // } else {
      //   return <Navigate to={"/home"} replace />;
      // }
    }
  }
  return children;
};

export default PrivateRoute;
