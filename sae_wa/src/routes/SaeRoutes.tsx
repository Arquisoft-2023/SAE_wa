import HomePage from "../pages/home/HomePage";
import NotFound from "../pages/notfound/NotFound";
import OtherPage from "../pages/OtherPage";
import PrivateRoute from "../components/PrivateRoute";
import React from "react";
import SigninPage from "../pages/signin/SigninPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { userStore } from "../state/zustand";

const SaeRoutes = () => {
  const { usuarioUn } = userStore();

  return (
    <BrowserRouter basename="/sae">
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute isSignedIn={usuarioUn}>
              <HomePage />
            </PrivateRoute>
          }
        />
        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route
          path="/other"
          element={
            <PrivateRoute isSignedIn={usuarioUn}>
              <OtherPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SaeRoutes;
