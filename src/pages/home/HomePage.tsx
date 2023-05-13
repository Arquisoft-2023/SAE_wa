import Navbar from "../../components/Navbar";
import React from "react";
import { Box } from "@mui/material";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <h1>HOME PAGE</h1>
      </Box>
    </div>
  );
};

export default HomePage;
