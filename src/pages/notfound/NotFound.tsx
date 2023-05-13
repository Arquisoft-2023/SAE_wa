import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const [counter, setCounter] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (counter === 0) {
      navigate("/signin", { replace: true });
    } else {
      const intervalId = setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100vw"
      }}
    >
      <h1>404 Not Found</h1>
      <h4>Redireccionando a signin en {counter}</h4>
    </Box>
  );
};

export default NotFound;
