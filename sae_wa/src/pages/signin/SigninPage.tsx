import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import LogoSae from "../../components/LogoSae";
import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Card, IconButton, TextField } from "@mui/material";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import { signinQueries } from "../../queries/signinQueries";
import { userStore } from "../../state/zustand";

const SigninPage = () => {
  const [usuarioField, setUsuarioField] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();
  const { setUser, usuarioUn } = useStore(userStore);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleToastClose = (key) => {
    closeSnackbar(key);
  };

  const handleChangeTextField = (event) => {
    event.target.value
      ? setUsuarioField(event.target.value)
      : setUsuarioField("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoadingState(true);
    console.log(usuarioUn);
    try {
      const result = await axios.post("http://127.0.0.8:3121/auth/signin", {
        headers: {
          "Content-Type": "application/json"
        },
        query: signinQueries.signin,
        variables: {
          usuarioUnSearch: usuarioField
        }
      });
      if (result.data.data.signin) {
        const { usuarioUn, token, estado } = result.data.data.signin;
        setUser(usuarioUn, "estudiante");
        enqueueSnackbar("Login Successfully", {
          variant: "success",
          action: (key) => (
            <IconButton>
              <CloseIcon onClick={() => handleToastClose(key)} />
            </IconButton>
          )
        });
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
