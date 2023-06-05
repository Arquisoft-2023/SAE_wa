import { useEffect, useState } from 'react'
import { ConsumoAJAXRequest } from '../../services/tutorial/ConsumoAJAXRequest';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from '../../components/DataTable2';
import React from 'react';
import { userStore } from '../../state/zustand';
import { useStore } from 'zustand';

const Lugares = () => {

    
    const [charactersList, setCharactersList] = useState([]);

    const {usuarioRol} = useStore(userStore);
    
    useEffect(() => {
        (async () => {
            const lugares =  await ConsumoAJAXRequest.lugares();
            setCharactersList(lugares);
        })();
    }, []);

    const columns = [  
        { field: 'id', headerName: 'ID', align: "center" },  
        { field: 'establishmentName', headerName: 'NOMBRE', align: "center" },  
        { field: 'description', headerName: 'DESCRIPCION', align: "center" },
        { field: 'location', headerName: 'DIRECCION', align: "center" },
        { field: 'opening', headerName: 'APERTURA', align: "center" },
        { field: 'closing', headerName: 'CIERRE', align: "center" },
        { field: 'capacity', headerName: 'CAPACIDAD', align: "center" }
    ];


    
    const rows = charactersList.map((item) => ({
        id: item.id,
        establishmentName: item.establishmentName,
        description: item.description,
        location: item.location,
        opening: item.opening,
        closing: item.closing,
        capacity: item.capacity
    }))
    
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

export default Lugares;
