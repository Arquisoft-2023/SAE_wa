import {BrowserRouter} from "react-router-dom"
import { Box } from "@mui/material"
import { useState } from "react"

import SideBar from "./components/SideBar"
import MyRoutes from "./routers/MyRoutes"


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
            <MyRoutes/>
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
