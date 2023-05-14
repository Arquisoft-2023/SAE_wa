
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, ListItem, ListItemText, Typography } from "@mui/material";
import Homepage from "./pages/HomePage";
import MyRoutes from "./routers/MyRoutes";
import {BrowserRouter} from "react-router-dom";
import SideBar from "./components/SideBar";
import { useState } from "react";
import { SnackbarProvider } from "notistack";


function App() {

  const [sidebarOpen, setSidebarOpen] = useState(true); 

  return (
    <>
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      >
        <BrowserRouter>
          <Box className={sidebarOpen  ? "sidebarState active":""}
          sx={{
            display: "grid",
            gridTemplateColumns: "90px auto",
            transition: "all 0.3s",
            "&.active": {
              gridTemplateColumns: "300px auto"
            }
          }}
          >
              <SideBar sidebarOpen = {sidebarOpen} setSidebarOpen = {setSidebarOpen}/>
              <MyRoutes/>
          </Box>
        </BrowserRouter>
      </SnackbarProvider>
    </>
  );
}

export default App;