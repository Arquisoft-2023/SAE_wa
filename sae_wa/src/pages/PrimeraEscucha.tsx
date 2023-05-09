import { useEffect, useState } from 'react'
import { PrimeraEscuchaAJAXRequest } from '../services/PrimeraEscuchaAJAXRequest';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import DataTable from '../components/DataTable';
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
        {field: 'realizada', headerName: 'ESTADO', align: "center"}
    ];

    const rows = charactersList.map((item) => ({
        idPrimeraEscucha: item.idPrimeraEscucha, 
        fechaPrimeraEscucha: item.fechaPrimeraEscucha,
        observacion: item.observacion,
        realizada: item.realizada ? 'Realizada' : 'Pendiente',
    }))

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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
        </Box>
    )
}

export default PrimeraEscucha;