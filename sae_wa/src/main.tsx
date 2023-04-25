import App from "./App.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* Reinicio de estilos por defecto */}
    <CssBaseline />
    <App />
  </React.StrictMode>
);
