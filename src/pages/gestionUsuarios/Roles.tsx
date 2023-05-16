import DataTable from "../../components/DataTable";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { RolesAJAXRequest } from "../../services/RolesAJAXRequest";

const Roles = () => {
  const [charactersList, setCharactersList] = useState([]);
  useEffect(() => {
    (async () => {
      const roles = await RolesAJAXRequest.obtenerRoles();
      setCharactersList(roles);
    })();
  }, []);
  const columns = [
    { field: "rolId", headerName: "ID", align: "center" },
    { field: "rol", headerName: "ROL", align: "center" },
    { field: "acciones", headerName: "ACCIONES", align: "center" }
  ];

  //Agregarmos la variable para poder identificar el rol que deseamos eliminar o modificar
  const [rolIdAEliminar, setRolIdAEliminar] = useState("");
  const [rolIdAModificar, setRolIdAModificar] = useState("");

  const rows = charactersList.map((item) => ({
    rolId: item.rolId,
    rol: item.rol,
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
          startIcon={<DeleteForeverIcon sx={{ color: "white" }} />}
          sx={{
            width: "40px",
            backgroundColor: "red"
          }}
          onClick={() => {
            setRolIdAEliminar(item.rolId);
            handleOpen("modal2");
          }}
        ></Button>
        <Button
          startIcon={<EditIcon sx={{ color: "white" }} />}
          sx={{
            width: "40px",
            backgroundColor: "green"
          }}
          onClick={() => {
            setRolIdAModificar(item.rolId);
            handleOpen("modal3");
          }}
        ></Button>
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

  const [open, setOpen] = React.useState(false);

  const [rol, setRol] = useState("");

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
          Generar Rol
        </Button>
        <Modal
          className="modal1"
          open={openModal1}
          onClose={() => handleClose("modal1")}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            className="crearRemision"
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
              <h2>Crear Nuevo Rol</h2>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              <TextField
                id="outlined-basic"
                label="Rol"
                variant="outlined"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              />
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
                  const rolArray = {
                    rol: rol
                  };
                  const crearRol = await RolesAJAXRequest.crearRol(rol);
                  const obtenerListaRoles =
                    await RolesAJAXRequest.obtenerRoles();
                  setCharactersList(obtenerListaRoles);
                  handleClose("modal1");
                }}
                disabled={!Boolean(rol)}
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
              <h2>¿Desea eliminar este rol?</h2>
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
                  const eliminarRol = await RolesAJAXRequest.eliminarRol(
                    String(rolIdAEliminar)
                  );
                  const obtenerListaRoles =
                    await RolesAJAXRequest.obtenerRoles();
                  setCharactersList(obtenerListaRoles);
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
              <h2>¿Desea Modificar este rol?</h2>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              <TextField
                id="outlined-basic"
                label="Rol"
                variant="outlined"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              />
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
                  const eliminarRol = await RolesAJAXRequest.modificarRol(
                    String(rolIdAModificar),
                    String(rol)
                  );
                  const obtenerListaRoles =
                    await RolesAJAXRequest.obtenerRoles();
                  setCharactersList(obtenerListaRoles);
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
      ></Box>
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

export default Roles;
