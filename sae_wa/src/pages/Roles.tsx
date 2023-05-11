import React, { useEffect } from 'react'
import { useState } from 'react'
import { RolesAJAXRequest } from '../services/RolesAJAXRequest'
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import DataTable from '../components/DataTable';

const Roles = () => {
    const [charactersList, setCharactersList] = useState([])
    useEffect(() => {
        (async () => {
            const roles = await RolesAJAXRequest.obtenerRoles();
            setCharactersList(roles);
        })();
    }, []);
    const columns = [
      {field: 'rolId', headerName: 'ID', align: "center"},
      {field: 'rol', headerName: 'ROL', align: "center"},
  ];


  const rows = charactersList.map((item) => ({
      rolId: item.rolId, rol: item.rol,
  }))

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rol, setRol] = useState('');


  return (
      <Box
      className = "componente"
      sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop:"30px",
          border: "none",
          gap:"20px"
      }}
      >
      <Box
      className = "ModalCrear"
      sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none"
      }}
      >
          <Button 
          sx={{
              display:"block",
              padding:"10px 30px",
              borderRadius:"100px",
              color:"#fff",
              border:"none",
              background:"black",
              cursor:"pointer",
              transition:".3s ease all",
              ":hover": {
                  background:"DarkGrey",
                }
          }}
          onClick={handleOpen}>Crear Rol</Button>
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box 
          className = "crearRemision"
          sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              gap: "10px"
          }}
          >
              <Box
              sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
              }}
              >
                  <h2>
                      Crear Nuevo Rol
                  </h2>
              </Box>
              <Box
              sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
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
                  alignContent: "center",
              }}
              >
              <Button
              className='botonGuardar'
              sx={{
                  display:"block",
                  padding:"10px 30px",
                  borderRadius:"100px",
                  color:"#fff",
                  border:"none",
                  background:"black",
                  cursor:"pointer",
                  transition:".3s ease all",
                  ":hover": {
                      background:"DarkGrey",
                  }
              }}
              onClick={async () => {
                  const rolArray = {
                      rol: rol
                  };
                  const crearRol = await  RolesAJAXRequest.crearRol(rol);
                  const obtenerListaRoles = await RolesAJAXRequest.obtenerRoles();
                  setCharactersList(obtenerListaRoles);
                  handleClose();
              }}
              disabled={!Boolean(rol)}
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
          border: "none"
      }}
      >
          <DataTable rows={rows} columns={columns}/>
      </Box>
      </Box>
  )
}


export default Roles;