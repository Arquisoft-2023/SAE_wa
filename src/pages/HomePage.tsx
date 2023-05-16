import React from "react";
import { userStore } from "../state/zustand";

import { Box } from "@mui/material";

const HomePage = () => {
  const { usuarioUn } = userStore();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <Box
          sx={{
            textAlign: "center"
          }}
        >
          <h2>
            Bienvenido(a) {usuarioUn} <br />{" "}
            <span
              style={{
                fontWeight: "normal"
              }}
            >
              al Sistema de Atención Estudiantil SAE
            </span>
          </h2>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
