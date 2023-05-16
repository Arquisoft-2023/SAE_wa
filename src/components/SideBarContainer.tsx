import React, { useState } from "react";
import SideBar from "./SideBar";
import { Box } from "@mui/material";

const SideBarContainer = ({ main, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box
      className={sidebarOpen ? "sidebarState active" : ""}
      sx={{
        display: "grid",
        gridTemplateColumns: "90px auto",
        transition: "all 0.3s",
        "&.active": {
          gridTemplateColumns: "300px auto"
        }
      }}
    >
      <SideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        showByRole={role}
      />
      {main}
    </Box>
  );
};

export default SideBarContainer;
