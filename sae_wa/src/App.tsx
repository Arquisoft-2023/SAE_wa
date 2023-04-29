import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, ListItem, ListItemText, Typography } from "@mui/material";
import Homepage from "./pages/HomePage";
import MyRoutes from "./routers/Routes";
import {BrowserRouter} from "react-router-dom";
import SideBar from "./components/SideBar";


function App() {

  return (
    <>
      <BrowserRouter>
        <Box>
          <SideBar/>
          <MyRoutes/>
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
