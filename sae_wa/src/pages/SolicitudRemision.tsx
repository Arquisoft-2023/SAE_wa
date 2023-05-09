import { useEffect, useState } from 'react'
import { SolicitudRemisionAJAXRequest } from '../services/SolicitudRemisionAJAXRequest';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import DataTable from '../components/DataTable';
import React from 'react';

const SolicitudRemision = () => {
    
    const [charactersList, setCharactersList] = useState([]);
    
    useEffect(() => {
        (async () => {
            const solicitudesRemision =  await SolicitudRemisionAJAXRequest.solicitudesRemision();
            setCharactersList(solicitudesRemision);


        })();
    }, []);

    const columns = [
      {field: 'idSolicitudRemision', headerName: 'ID', align: "center"},
      {field: 'fechaSolicitudRemision', headerName: 'FECHA DE SOLICITUD', align: "center"},
      {field: 'tipoRemision', headerName: 'TIPO DE REMISIÓN', align: "center"},
      {field: 'usuarioUnDocente', headerName: 'DOCENTE', align: "center"},
      {field: 'usuarioUnEstudiante', headerName: 'ESTUDIANTE', align: "center"},
      {field: 'programaCurricular', headerName: 'PROGRAMA', align: "center"},
      {field: 'justificacion', headerName: 'JUSTIFICACIÓN', align: "center"},
      {field: 'estado', headerName: 'ESTADO', align: "center"}
    ];

    const rows = charactersList.map((item) => ({
        idSolicitudRemision: item.idSolicitudRemision, 
        fechaSolicitudRemision: item.fechaSolicitudRemision,
        tipoRemision: item.tipoRemision,
        usuarioUnDocente: item.usuarioUnDocente,
        usuarioUnEstudiante: item.usuarioUnEstudiante,
        programaCurricular: item.programaCurricular,
        justificacion: item.justificacion,
        estado: item.estado ? 'Remitido' : 'Pendiente',
    }))

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [idTipoRemision, setIdTipoRemision] = useState('');
    const [usuarioUnEstudiante, setUsuarioUnEstudiante] = useState('');
    const [programaCurricular, setProgramaCurricular] = useState('');
    const [usuarioUnDocente, setUsuarioUnDocente] = useState('');
    const [justificacion, setJustificacion] = useState('');


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
            onClick={handleOpen}>Generar Solicitud</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box 
            className = "crearTipoRemision"
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
                height: 500,
                bgcolor: 'background.paper',
                border: '2px solid #000',
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
                    <h2>
                        Generar Solicitud Remision
                    </h2>
                </Box>
                <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    flexDirection: "column",
                    gap:"5px"
                }}
                >
                    <TextField 
                        id="outlined-basic" 
                        label="Tipo de Remision" 
                        variant="outlined"
                        type="number"
                        value={idTipoRemision}
                        onChange={(e) => setIdTipoRemision(e.target.value)}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="Estudiante" 
                        variant="outlined"
                        value={usuarioUnEstudiante}
                        onChange={(e) => setUsuarioUnEstudiante(e.target.value)}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="Programa" 
                        variant="outlined"
                        value={programaCurricular}
                        onChange={(e) => setProgramaCurricular(e.target.value)}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="Docente" 
                        variant="outlined"
                        value={usuarioUnDocente}
                        onChange={(e) => setUsuarioUnDocente(e.target.value)}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="Justificación" 
                        variant="outlined"
                        value={justificacion}
                        onChange={(e) => setJustificacion(e.target.value)}
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
                    const generarRemisionArray = {
                        idTipoRemision: parseInt(idTipoRemision),
                        usuarioUnEstudiante: usuarioUnEstudiante,
                        programaCurricular: programaCurricular,
                        usuarioUnDocente: usuarioUnDocente,
                        justificacion: justificacion
                    };
                    console.log(generarRemisionArray);
                    const generarRemision = await SolicitudRemisionAJAXRequest.generarRemision(generarRemisionArray);
                    const solicitudesRemision = await SolicitudRemisionAJAXRequest.solicitudesRemision();
                    setCharactersList(solicitudesRemision);
                    handleClose();
                }}
                disabled={!Boolean(idTipoRemision) && !Boolean(usuarioUnEstudiante) && !Boolean(programaCurricular) && !Boolean(usuarioUnDocente) && !Boolean(justificacion)}
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

export default SolicitudRemision;