import { Box } from "@mui/material"
import AllRoutes from "./routers/AllRoutes"
import {BrowserRouter} from "react-router-dom"
import SideBar from "./components/SideBar"
import { useState } from "react"


function App() {

  const [sidebarOpen, setSidebarOpen] = useState(true); 

  return (
    <>
      <BrowserRouter>
        <Box className={sidebarOpen  ? "sidebarState active":""}
        sx={{
          display: "grid",
          gridTemplateColumns: "90px auto",
          transition: "all 0.3s",
          "&.active": {
            gridTemplateColumns: "300px auto",

          }
        }}
        >
            <SideBar sidebarOpen = {sidebarOpen} setSidebarOpen = {setSidebarOpen}/>
            <AllRoutes/>
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
