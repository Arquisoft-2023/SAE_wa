import React from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "zustand";
import { userStore } from "../state/zustand";

import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Box
} from "@mui/material";

const Navbar = () => {
  const { clearUser } = useStore(userStore);

  const handleLogout = () => {
    try {
      <Navigate to={"/signin"} />;
      clearUser();
    } catch (error) {
      alert(`Error: $error`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "#000"
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SAE
          </Typography>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
