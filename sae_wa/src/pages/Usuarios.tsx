import React, { useEffect } from "react";
import { useState } from "react";
import { UsuariosAJAXRequest } from "../services/UsuariosAJAXRequest";
import { Box, Button, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import DataTable from "../components/DataTable";

const Usuarios = () => {
  // Mapeo de la tabla y los usuarios
  const [charactersList, setCharactersList] = useState([]);
  useEffect(() => {
    (async () => {
      const usuarios = await UsuariosAJAXRequest.obtenerUsuarios();
      setCharactersList(usuarios);
    })();
  }, []);
  const columns = [
    { field: "estado", headerName: "ESTADO USUARIO", align: "center" },
    { field: "usuarioUn", headerName: "USUARIO UN", align: "center" },
    { field: "documento", headerName: "DOCUMENTO", align: "center" },
    {
      field: "tipoDocumento",
      headerName: "DOCUMENTO NACIONAL",
      align: "center",
    },
    { field: "nombres", headerName: "NOMBRES", align: "center" },
    { field: "apellidos", headerName: "APELLIDOS", align: "center" },
  ];


  var estadoUsuario;
  var tipoDelDocumento;

  function definirEstadoUsuario(estadoUsuario: Boolean) {
    if (estadoUsuario == true) {
      return "Usuario Activo";
    } else {
      return "Usuario Inactivo";
    }
  }

  function definirTipoDocumento(tipoDelDocumento: Boolean) {
    if (tipoDelDocumento == true) {
      return "Documento Nacional";
    } else {
      return "Documento Extranjero";
    }
  }

  function leerBooleans(respuestaUsuario: String){
    if (respuestaUsuario == "true"){
      return true;
    } else {
      return false;
    }
  }

  const rows = charactersList.map((item) => ({
    //Filas
    estado: definirEstadoUsuario(item.estado),
    apellidos: item.apellidos,
    documento: item.documento,
    nombres: item.nombres,
    tipoDocumento: definirTipoDocumento(item.tipoDocumento),
    usuarioUn: item.usuarioUn,
  }));

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Creación de un usuario Nuevo - estados
  const [usuarioUnNuevoUsuario,setUsuario] = useState("");
  const [estadoNuevoUsuario,setEstado] = useState("");
  const [nombresNuevoUsuario,setNombres] = useState("");
  const [apellidosNuevoUsuario,setApellidos] = useState("");
  const [documentoNuevoUsuario,setDocumento] = useState("");
  const [tipoDeDocumentoNuevoUsuario,setTipoDeDocumento] = useState("");


  return (
    <Box
      className="componente"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "30px",
        border: "none",
        gap: "20px",
      }}
    >
      <Box
        className="ModalCrear"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
        }}
      >
        <Button
          sx={{
            display: "block",
            padding: "10px 30px",
            borderRadius: "100px",
            color: "#fff",
            border: "none",
            background: "black",
            cursor: "pointer",
            transition: ".3s ease all",
            ":hover": {
              background: "DarkGrey",
            },
          }}
          onClick={handleOpen}
        >
          Crear Usuario
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            className="crearUsuario"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <h2>Crear Nuevo Usuario</h2>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Usuario UNAL"
                variant="outlined"
                value={usuarioUnNuevoUsuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
              <InputLabel id="simple-select-label">Estado del Usuario</InputLabel>
              <Select
                labelId="estadoDelUsuario"
                id="simple-select"
                value={estadoNuevoUsuario}
                label="Estado del Usuario"
                onChange={(e) => setEstado(e.target.value)}>
                <MenuItem value="true">Usuario Activo</MenuItem>
                <MenuItem value="false">Usuario inactivo</MenuItem>
              </Select>
              <TextField
                id="outlined-basic"
                label="Nombres"
                variant="outlined"
                value={nombresNuevoUsuario}
                onChange={(e) => setNombres(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Apellidos"
                variant="outlined"
                value={apellidosNuevoUsuario}
                onChange={(e) => setApellidos(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Documento"
                variant="outlined"
                value={documentoNuevoUsuario}
                onChange={(e) => setDocumento(e.target.value)}
              />
              <InputLabel id="simple-select-label">Tipo de Documento</InputLabel>
              <Select
                labelId="tipoDeDocumento"
                id="simple-select"
                value={tipoDeDocumentoNuevoUsuario}
                label="Tipo de Documento"
                onChange={(e) => setTipoDeDocumento(e.target.value)}
              >
                <MenuItem value="true">Documento Nacional</MenuItem>
                <MenuItem value="false">Documento Extranjero</MenuItem>
              </Select>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Button
                className="botonGuardar"
                sx={{
                  display: "block",
                  padding: "10px 30px",
                  borderRadius: "100px",
                  color: "#fff",
                  border: "none",
                  background: "black",
                  cursor: "pointer",
                  transition: ".3s ease all",
                  ":hover": {
                    background: "DarkGrey",
                  },
                }}
                onClick={async () => {
                  const rolArray = {
                    usuarioUn: usuarioUnNuevoUsuario,
                    estado: leerBooleans(estadoNuevoUsuario),
                    nombres: nombresNuevoUsuario,
                    apellidos: apellidosNuevoUsuario,
                    documento: documentoNuevoUsuario,
                    tipoDocumento: leerBooleans(tipoDeDocumentoNuevoUsuario),
                  };
                  const crearUsuario = await UsuariosAJAXRequest.crearUsuario(
                    rolArray
                  );
                  const obtenerListaUsuarios =
                    await UsuariosAJAXRequest.obtenerUsuarios();
                  setCharactersList(obtenerListaUsuarios);
                  handleClose();
                }}
                disabled={!Boolean(usuarioUnNuevoUsuario) || !Boolean(estadoNuevoUsuario) || !Boolean(nombresNuevoUsuario) || !Boolean(apellidosNuevoUsuario) || !Boolean(documentoNuevoUsuario) || !Boolean(tipoDeDocumentoNuevoUsuario)}
              >
                Crear
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
        }}
      >
        <DataTable rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Usuarios;
