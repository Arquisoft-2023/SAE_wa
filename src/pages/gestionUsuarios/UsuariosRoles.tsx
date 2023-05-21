  import DataTable from "../../components/DataTable";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect } from "react";
import { useState } from "react";

import { RolesAJAXRequest } from "../../services/gestionUsuarios/RolesAJAXRequest";
import { UsuariosAJAXRequest } from "../../services/gestionUsuarios/UsuariosAJAXRequest";
import { UsuariosRolesAJAXRequest } from "../../services/gestionUsuarios/UsuariosRolesAJAXRequest";

import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from "@mui/material";

const UsuariosRoles = () => {
  //Obtencion de los roles dentro del sistema
  const [rolesEnElSistema, SetRolesEnElSistema] = useState([]);
  const [rolesDiccionario, SetRolesDiccionario] = useState({});
  const [rolesDiccionarioReverse, SetRolesDiccionarioReverse] = useState({});

  useEffect(() => {
    (async () => {
      const rolesData = await RolesAJAXRequest.obtenerRoles();
      const listaRoles = [];
      for (let index = 0; index < rolesData.length; index++) {
        listaRoles.push(rolesData[index].rol);
      }
      SetRolesEnElSistema(listaRoles);

      const rolesDiccionario: { [key: string]: string } = {};
      rolesData.forEach((rol) => {
        rolesDiccionario[rol.rol] = rol.rolId;
      });
      SetRolesDiccionario(rolesDiccionario);

      const rolesDiccionarioReverse: { [key: string]: string } = {};
      rolesData.forEach((rol) => {
        rolesDiccionarioReverse[rol.rolId] = rol.rol;
      });
      SetRolesDiccionarioReverse(rolesDiccionarioReverse);
    })();
  }, []);

  // Mapeo de la tabla y los usuarios
  const [charactersList, setCharactersList] = useState([]);
  useEffect(() => {
    (async () => {
      const usuariosRoles =
        await UsuariosRolesAJAXRequest.obtenerUsuariosRoles();
      setCharactersList(usuariosRoles);
    })();
  }, []);

  const columns = [
    { field: "rol", headerName: "ROL", align: "center" },
    { field: "usuarioUn", headerName: "USUARIO UN", align: "center" },
    { field: "acciones", headerName: "ACCIONES", align: "center" }
  ];

  //Agregarmos la variable para poder identificar el rol que deseamos eliminar o modificar
  const [UsuarioRolAEliminar, setUsuarioRolIdAEliminar] = useState("");
  const [UsuarioRolAModificar, setUsuarioRolIdAModificar] = useState("");

  const rows = charactersList.map((item) => ({
    //Filas
    rol: String(rolesDiccionarioReverse[String(item.rolId)]),
    usuarioUn: item.usuarioUn,
    acciones: (
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "black",
            "&:hover": {
              bgcolor: "black"
            }
          }}
          onClick={() => {
            setUsuarioRolIdAEliminar(item.usuarioUn);
            handleOpen("modal2");
          }}
        >
          <DeleteForeverIcon/>
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "black",
            "&:hover": {
              bgcolor: "black"
            }
          }}
          onClick={() => {
            setUsuarioRolIdAModificar(item.usuarioUn);
            handleOpen("modal3");
          }}
        >
          <EditIcon/>
        </Button>
      </Box>
    )
  }));

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

  const [open, setOpen] = React.useState(false);

  //Creación de un usuario Nuevo - estados
  const [rolNuevo, setRolNuevo] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

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
        gap: "20px"
      }}
    >
      <Box
        className="ModalCrear"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none"
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
              background: "DarkGrey"
            }
          }}
          onClick={() => handleOpen("modal1")}
        >
          Asignar Rol a un Usuario
        </Button>
        <Modal
          className="modal1"
          open={openModal1}
          onClose={() => handleClose("modal1")}
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
              height: 500,  
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              gap: "10px"
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              <h2>Asignar Rol a un Usuario</h2>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column"
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
                  <MenuItem key={rolLista} value={rolLista}>
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
                  <MenuItem key={usuarioUnLista} value={usuarioUnLista}>
                    {usuarioUnLista}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center"
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
                    background: "DarkGrey"
                  }
                }}
                onClick={async () => {
                  const usuarioRolArray = {
                    rolABuscarId: String(rolesDiccionario[String(rolNuevo)]),
                    usuarioUnABuscar: usuarioSeleccionado
                  };
                  const crearUsuarioRol =
                    await UsuariosRolesAJAXRequest.crearUsuarioRol(
                      usuarioRolArray
                    );
                  const obtenerListaUsuariosRoles =
                    await UsuariosRolesAJAXRequest.obtenerUsuariosRoles();
                  setCharactersList(obtenerListaUsuariosRoles);
                  handleClose("modal1");
                }}
                disabled={!Boolean(rolNuevo) || !Boolean(usuarioSeleccionado)}
              >
                Asignar
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
              gap: "15px"
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column"
              }}
            >
              <h2>¿Desea eliminar la asignación de este usuario?</h2>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center"
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
                    background: "DarkGrey"
                  }
                }}
                onClick={async () => {
                  const eliminarUsuarioRol =
                    await UsuariosRolesAJAXRequest.eliminarUsuarioRol(
                      String(UsuarioRolAEliminar)
                    );
                  const obtenerListaUsuariosRoles =
                    await UsuariosRolesAJAXRequest.obtenerUsuariosRoles();
                  setCharactersList(obtenerListaUsuariosRoles);
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
                    background: "DarkGrey"
                  }
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
              gap: "15px"
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column"
              }}
            >
              <h2>¿Desea Modificar el rol asignado a este Usuario?</h2>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
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
                  <MenuItem key={rolLista} value={rolLista}>
                    {rolLista}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center"
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
                    background: "DarkGrey"
                  }
                }}
                onClick={async () => {
                  const modificarUsuarioRol =
                    UsuariosRolesAJAXRequest.modificarUsuarioRol(
                      String(rolesDiccionario[String(rolNuevo)]),
                      String(UsuarioRolAModificar)
                    );
                  const obtenerListaUsuariosRoles =
                    await UsuariosRolesAJAXRequest.obtenerUsuariosRoles();
                  setCharactersList(obtenerListaUsuariosRoles);
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
                    background: "DarkGrey"
                  }
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
          border: "none"
        }}
      >
        <DataTable rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default UsuariosRoles;
