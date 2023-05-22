import CircularProgress from "@mui/material/CircularProgress";
import LogoSae from "../../components/LogoSae";
import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Card, IconButton, TextField } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import { signinQueries } from "../../queries/gestionUsuarios/signinQueries";
import { UsuariosRolesAJAXRequest } from "../../services/gestionUsuarios/UsuariosRolesAJAXRequest";
import { SigninAJAXRequest } from "../../services/signin/SigninAJAXRequest";
import { userStore } from "../../state/zustand";

const SigninPage = () => {
  const [usuarioField, setUsuarioField] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();
  const { setUser, usuarioUn } = useStore(userStore);

  const handleChangeTextField = (event) => {
    event.target.value
      ? setUsuarioField(event.target.value)
      : setUsuarioField("");
  };

  const obtainDataGestionUsuarios = async () => {
    const readUsers = await UsuariosRolesAJAXRequest.obtenerUsuariosRoles();
    return readUsers;
  };

  const obtainRolesGestionUsuarios = async () => {
    const readRoles = await UsuariosRolesAJAXRequest.obtenerRoles();
    return readRoles;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoadingState(true);
    // console.log(usuarioUn);
    //BACKDOOR FOR DEV
    if (usuarioField === "devsae") {
      setUser("devsae", "bienestar");
      setTimeout(() => {
        setLoadingState(false);
        navigate("/home");
      }, 4000);
    } else {
      try {
        const signinCall = await SigninAJAXRequest.verificarAuth(usuarioField);
        const userInfoWithRole = await obtainDataGestionUsuarios();
        const userDataInfo = userInfoWithRole?.find((elem) => {
          return elem.usuarioUn === usuarioField;
        });
        const roleUsersInfo = await obtainRolesGestionUsuarios();
        const userRole = roleUsersInfo?.find((elem) => {
          return elem.rolId === userDataInfo["rolId"];
        });
        const roleModified = userRole["rol"].toLowerCase();
        // console.log(userInfoWithRole);
        // console.log(roleModified);
        if ((signinCall != null && userRole != null) || userRole != undefined) {
          const { usuarioUn, token, estado } = signinCall;
          setUser(usuarioUn, roleModified);
          setTimeout(() => {
            setLoadingState(false);
            navigate("/home");
          }, 4000);
        }
      } catch (error) {
        console.log(error);
        alert("Signin Failed");
        setLoadingState(false);
      }
    }
  };

  return (
    <Box
      display={"flex"}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          borderRadius: "10px"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <LogoSae />
          <Box component="form" sx={{ mt: 1 }} onSubmit={handleFormSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="usuarioun"
              label="Usuario UN"
              name="usuarioun"
              autoComplete="usuarioun"
              autoFocus
              onChange={handleChangeTextField}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {loadingState ? (
                <CircularProgress
                  sx={{
                    marginTop: "2rem"
                  }}
                />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "black",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "black"
                    }
                  }}
                  disabled={!usuarioField}
                >
                  Entrar
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default SigninPage;
