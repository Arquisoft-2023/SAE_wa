import "./styles/app.css";
import SaeRoutes from "./routers/SaeRoutes";
import userStore from "./state/zustand";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  const usuarioSesion = userStore((state) => state.token);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (usuarioSesion) {
        alert("Verificación Tokens");
      }
    }, 60000);

    return () => {
      if (usuarioSesion === null) {
        clearInterval(intervalId);
      }
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
