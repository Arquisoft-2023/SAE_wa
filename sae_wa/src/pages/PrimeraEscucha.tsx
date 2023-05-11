import { useEffect, useState } from 'react'
import { PrimeraEscuchaAJAXRequest } from '../services/PrimeraEscuchaAJAXRequest';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import DataTable from '../components/DataTable';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

const PrimeraEscucha = () => {
    
    const [charactersList, setCharactersList] = useState([]);
    
    useEffect(() => {
        (async () => {
            const primerasEscuchas =  await PrimeraEscuchaAJAXRequest.primerasEscuchas();
            setCharactersList(primerasEscuchas);
        })();
    }, []);

    const columns = [
        {field: 'idPrimeraEscucha', headerName: 'ID', align: "center"},
        {field: 'fechaPrimeraEscucha', headerName: 'FECHA PRIMERA ESCUCHA', align: "center"},
        {field: 'observacion', headerName: 'OBSERVACIÓN', align: "center"},
        {field: 'realizada', headerName: 'ESTADO', align: "center"},
        {field: 'acciones', headerName: 'ACCIONES', align: "center"}
    ];

    const rows = charactersList.map((item) => ({
        idPrimeraEscucha: item.idPrimeraEscucha, 
        fechaPrimeraEscucha: item.fechaPrimeraEscucha,
        observacion: item.observacion,
        realizada: item.realizada ? 'Realizada' : 'Pendiente',
        acciones:
        <Box 
        sx={{
            display: 'flex',
            gap: "10px",
            alignItems:"center",
            justifyContent:"center"
        }}
        >
            <Button 
            startIcon={<EditIcon sx={{color:"white"}}/>}
            sx={{
                width:"40px",
                backgroundColor:"green",
            }}
            onClick={() => {
                setIdPrimeraEscucha(item.idPrimeraEscucha);
                handleOpen();
            }}
            >
            </Button>
        </Box>
    }))

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [idPrimeraEscucha, setIdPrimeraEscucha] = useState('');
    const [observacion, setObservacion] = useState('');


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
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "none"
        }}
        >
            <DataTable rows={rows} columns={columns}/>
        </Box>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box
            className = "editarTipoRemision"
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
                        Editar Remision
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
                    label="Observacion" 
                    variant="outlined"
                    value={observacion}
                    onChange={(e) => setObservacion(e.target.value)}
                    >
                    </TextField>
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
                    handleClose();
                }}
                disabled={!Boolean(observacion)}
                >
                    Guardar
                </Button>
                </Box>
                <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                }}
                >
                    <Button>
                    </Button>
                </Box>
            </Box>
        </Modal>
        </Box>
    )
}

export default PrimeraEscucha;