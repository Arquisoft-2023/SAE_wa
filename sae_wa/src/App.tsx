import { Box } from "@mui/material";
import { useEffect, useState } from "react";

function App() {
  const [contador, setContador] = useState(0); // Hook para controlar cambios de estado

  // Hook para realizar acciones por debajo de la ejecución del código
  useEffect(() => {
    const interval = setInterval(() => {
      setContador((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {/* MATERIAL UI BOX */}
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h1>Front-End Web SAE</h1>
        <h2>{contador}s </h2>
      </Box>
    </>
  );
}

export default App;
