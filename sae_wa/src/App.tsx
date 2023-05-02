import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, ListItem, ListItemText, Typography } from "@mui/material";
import Homepage from "./pages/HomePage";
import MyRoutes from "./routers/MyRoutes";
import {BrowserRouter} from "react-router-dom";
import SideBar from "./components/SideBar";
import { useState } from "react";


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
