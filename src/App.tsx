import "./styles/app.css";
import SaeRoutes from "./routers/SaeRoutes";
import userStore from "./state/zustand";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

/* eslint-disable react-hooks/exhaustive-deps */

function App() {
  const usuarioSesion = userStore((state) => state.token);
  let intervalId;

  useEffect(() => {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (usuarioSesion) {
        alert("Verificación Tokens");
      }
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [usuarioSesion]);

  return (
    <>
      <BrowserRouter basename="/sae">
        <SaeRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
