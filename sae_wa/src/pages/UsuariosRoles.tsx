import React, { useEffect } from "react";
import { useState } from "react";
import { UsuariosRolesAJAXRequest } from "../services/UsuariosRolesAJAXRequest";
import { Box, Button, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import DataTable from "../components/DataTable";
import { UsuariosAJAXRequest } from "../services/UsuariosAJAXRequest";
import { RolesAJAXRequest } from "../services/RolesAJAXRequest";

const UsuariosRoles = () => {
// Mapeo de la tabla y los usuarios
const [charactersList, setCharactersList] = useState([]);
useEffect(() => {
  (async () => {
    const usuariosRoles = await UsuariosRolesAJAXRequest.obtenerUsuariosRoles();
    setCharactersList(usuariosRoles);
  })();
}, []);

const columns = [
  { field: "rol", headerName: "ROL", align: "center" },
  { field: "usuarioUn", headerName: "USUARIO UN", align: "center" },
];

const rows = charactersList.map((item) => ({
  //Filas
  rol: item.rolId,
  usuarioUn: item.usuarioUn,
}));


//Obtencion de los usarios dentro del sistema
const [usuariosEnElSistema, SetUsuariosEnElSistema] = useState([]);
useEffect(() => {
  (async () => {
    const usuariosData = await UsuariosAJAXRequest.obtenerUsuarios();
    const listaUsuarios = [];
    for (let index = 0; index < usuariosData.length; index++) {
      listaUsuarios.push(usuariosData[index].usuarioUn);
    }
    SetUsuariosEnElSistema(listaUsuarios);

  })();
}, []);

//Obtencion de los roles dentro del sistema
const [rolesEnElSistema, SetRolesEnElSistema] = useState([]);
const [rolesDiccionario, SetRolesDiccionario] = useState({});
useEffect(() => {
  (async () => {
    const rolesData = await RolesAJAXRequest.obtenerRoles();
    const listaRoles= [];
    for (let index = 0; index < rolesData.length; index++) {
      listaRoles.push(rolesData[index].rol);
    }
    SetRolesEnElSistema(listaRoles);
    const rolesDiccionario: { [key: string]: string } = {};
    rolesData.forEach((rol) => { rolesDiccionario[rol.rol] = rol.rolId; });
    SetRolesDiccionario(rolesDiccionario);
  })();
}, []);



const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

//Creación de un usuario Nuevo - estados
const [rolNuevo,setRolNuevo] = useState("");
const [usuarioSeleccionado,setUsuarioSeleccionado] = useState("");










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
        Asignar Rol a un Usuario
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="asignarRol"
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
            <h2>Asignar Rol a un Usuario</h2>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
            }}
          >
            <InputLabel id="simple-select-label">Rol</InputLabel>
            <Select
              labelId="rolAEscoger"
              id="simple-select"
              value={rolNuevo}
              label="Rol a escoger"
              onChange={(e) => setRolNuevo(e.target.value)}
            >
              {rolesEnElSistema.map((rolLista) => (
            <MenuItem
              key={rolLista}
              value={rolLista}
            >
              {rolLista}
            </MenuItem>
          ))}
            </Select>
            <InputLabel id="simple-select-label">Usuario UN</InputLabel>
            <Select
              labelId="usuarioUnAEscoger"
              id="simple-select"
              value={usuarioSeleccionado}
              label="Usuario UN"
              onChange={(e) => setUsuarioSeleccionado(e.target.value)}
            >
              {usuariosEnElSistema.map((usuarioUnLista) => (
            <MenuItem
              key={usuarioUnLista}
              value={usuarioUnLista}
            >
              {usuarioUnLista}
            </MenuItem>
          ))}
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
                const usuarioRolArray = {
                  rolABuscarId: String(rolesDiccionario[String(rolNuevo)]),
                  usuarioUnABuscar: usuarioSeleccionado,
                };
                const crearUsuarioRol = await UsuariosRolesAJAXRequest.crearUsuarioRol(usuarioRolArray);
                const obtenerListaUsuariosRoles =await UsuariosRolesAJAXRequest.obtenerUsuariosRoles();
                setCharactersList(obtenerListaUsuariosRoles);
                handleClose();
              }}
              disabled={!Boolean(rolNuevo) || !Boolean(usuarioSeleccionado)}
            >
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

export default UsuariosRoles