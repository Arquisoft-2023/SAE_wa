import React, { useEffect } from "react";
import { useState } from "react";
import { UsuariosAJAXRequest } from "../services/UsuariosAJAXRequest";
import { Box, Button, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DataTable from "../components/DataTable2";
import { UsuariosRolesAJAXRequest } from "../services/UsuariosRolesAJAXRequest";

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
    { field: "acciones", headerName: "ACCIONES", align: "center" },
  ];


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

  //Agregamos el manejo de los moodales
  const [openModal1, setOpenModal1] = React.useState(false);
  const [openModal2, setOpenModal2] = React.useState(false);
  const [openModal3, setOpenModal3] = React.useState(false);

  const handleOpen = (modal) => {
    switch (modal) {
      //Crear
      case "modal1":
        setOpenModal1(true);
        break;
      //Eliminar
      case "modal2":
        setOpenModal2(true);
        break;
      //Modificar
      case "modal3":
        setOpenModal3(true);
        break;
      default:
        break;
    }
  };

  const handleClose = (modal) => {
    switch (modal) {
      case "modal1":
        setOpenModal1(false);
        break;
      case "modal2":
        setOpenModal2(false);
        break;
      case "modal3":
        setOpenModal3(false);
        break;
      default:
        break;
    }
  };

  const [usuarioUnAEliminar,setUsuarioUnAEliminar] = useState("");
  const [usuarioUnAModificar,setUsuarioUnAModificar] = useState("");

  const rows = charactersList.map((item) => ({
    //Filas
    estado: definirEstadoUsuario(item.estado),
    apellidos: item.apellidos,
    documento: item.documento,
    nombres: item.nombres,
    tipoDocumento: definirTipoDocumento(item.tipoDocumento),
    usuarioUn: item.usuarioUn,
    acciones: (
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          startIcon={<DeleteForeverIcon sx={{ color: "white" }} />}
          sx={{
            width: "40px",
            backgroundColor: "red",
          }}
          onClick={() => {
            setUsuarioUnAEliminar(item.usuarioUn);
            handleOpen("modal2");
          }}
        ></Button>
        <Button
          startIcon={<EditIcon sx={{ color: "white" }} />}
          sx={{
            width: "40px",
            backgroundColor: "green",
          }}
          onClick={() => {
            setUsuarioUnAModificar(item.usuarioUn);
            handleOpen("modal3");
          }}
        ></Button>
      </Box>
    ),
}));

  const [open, setOpen] = React.useState(false);

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
          onClick={() => handleOpen("modal1")}
        >
          Crear Usuario
        </Button>

        <Modal
          className="modal1"
          open={openModal1}
          onClose={() => handleClose("modal1")}
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
                  handleClose("modal1");
                }}
                disabled={!Boolean(usuarioUnNuevoUsuario) || !Boolean(estadoNuevoUsuario) || !Boolean(nombresNuevoUsuario) || !Boolean(apellidosNuevoUsuario) || !Boolean(documentoNuevoUsuario) || !Boolean(tipoDeDocumentoNuevoUsuario)}
              >
                Crear
              </Button>
            </Box>
          </Box>
        </Modal>

        <Modal
          className="modal2"
          open={openModal2}
          onClose={() => handleClose("modal2")}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              height: 500,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              gap: "15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column",
              }}
            >
              <h2>¿Desea eliminar este usuario?</h2>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Button
                className="botonSi"
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
                  const eliminarUsuarioRol =
                    await UsuariosRolesAJAXRequest.eliminarUsuarioRol(
                      String(usuarioUnAEliminar)
                    );
                  const eliminarUsuario = await UsuariosAJAXRequest.eliminarUsuario(
                    String(usuarioUnAEliminar)
                  );
                  const obtenerListaUsuarios =
                    await UsuariosAJAXRequest.obtenerUsuarios();
                  setCharactersList(obtenerListaUsuarios);
                  handleClose("modal2");
                }}
              >
                Si
              </Button>
              <Button
                className="botonNo"
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
                onClick={() => handleClose("modal2")}
              >
                No
              </Button>
            </Box>
          </Box>
        </Modal>

        <Modal
          className="modal3"
          open={openModal3}
          onClose={() => handleClose("modal3")}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            className="modificarUsuario"
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
              <h2>¿Desea Modificar este Usuario?</h2>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column",
              }}
            >
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
                className="botonSi"
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
                    usuarioUn: usuarioUnAModificar,
                    estado: leerBooleans(estadoNuevoUsuario),
                    nombres: nombresNuevoUsuario,
                    apellidos: apellidosNuevoUsuario,
                    documento: documentoNuevoUsuario,
                    tipoDocumento: leerBooleans(tipoDeDocumentoNuevoUsuario),
                  };
                  const modificarUsuario = await UsuariosAJAXRequest.modificarUsuario(
                    rolArray
                  );
                  const obtenerListaUsuarios =
                    await UsuariosAJAXRequest.obtenerUsuarios();
                  setCharactersList(obtenerListaUsuarios);
                  handleClose("modal3");
                }}
              >
                Si
              </Button>
              <Button
                className="botonNo"
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
                onClick={() => handleClose("modal3")}
              >
                No
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
