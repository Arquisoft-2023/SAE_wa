import { useEffect, useState } from 'react'
import { PrimeraEscuchaAJAXRequest } from '../../services/remisiones/PrimeraEscuchaAJAXRequest';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import DataTable from '../../components/DataTable2';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { RemisionAJAXRequest } from '../../services/remisiones/RemisionAJAXRequest';

const PrimeraEscucha = () => {
    
    const [charactersList, setCharactersList] = useState([]);
    const [charactersList2, setCharactersList2] = useState([]);
    const [observacionEdit, setObservacionEdit] = useState('');
    const [idPrimeraEscuchaInput, setIdPrimeraEscuchaInput] = useState('');
    const [realizadaEdit, setRealizadaEdit] = useState('');
    
    useEffect(() => {
        (async () => {
            const primerasEscuchas =  await PrimeraEscuchaAJAXRequest.primerasEscuchas();
            setCharactersList(primerasEscuchas);
            const remisiones =  await RemisionAJAXRequest.remisiones();
            setCharactersList2(remisiones);
            console.log(remisiones)
        })();
    }, []);

    const columns = [
        {field: 'idPrimeraEscucha', headerName: 'ID', align: "center"},
        {field: 'fechaPrimeraEscucha', headerName: 'FECHA PRIMERA ESCUCHA', align: "center"},
        {field: 'usuarioUnEstudiante', headerName: 'ESTUDIANTE', align: "center"},
        {field: 'observacion', headerName: 'OBSERVACIÓN', align: "center"},
        {field: 'realizada', headerName: 'ESTADO', align: "center"},
        {field: 'acciones', headerName: 'ACCIONES', align: "center"}
    ];

    const rows = charactersList.map((item) => {

    // Buscar el elemento correspondiente en characterList2 utilizando la propiedad idPrimeraEscucha
    const matchingItem = charactersList2.find((character) => character.idPrimeraEscucha === item.idPrimeraEscucha);
    console.log('remisiones'+matchingItem);


    // Verificar si se encontró el elemento correspondiente en characterList2
    const usuarioUnEstudiante = matchingItem ? matchingItem.usuarioUnEstudiante : '';
    console.log(usuarioUnEstudiante);

    return {
        idPrimeraEscucha: item.idPrimeraEscucha, 
        fechaPrimeraEscucha: item.fechaPrimeraEscucha,
        usuarioUnEstudiante: usuarioUnEstudiante,
        observacion: item.observacion,
        realizada: item.realizada ? 'Realizada' : 'Pendiente',
        acciones: (
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
                    const remisionId = matchingItem ? matchingItem.idRemision : null;
                    setIdPrimeraEscuchaInput(remisionId);
                    handleOpen();
                }}
                >
                </Button>
            </Box>
            )
            }
    })

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
        className="dataTable"
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
        className="modalEdicion"
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
                className="tituloModal"
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
                className="observacionTextField"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                }}
                >
                    <TextField
                    fullWidth
                    id="outlined-basic" 
                    label="Observacion" 
                    variant="outlined"
                    value={observacionEdit}
                    onChange={(e) => setObservacionEdit(e.target.value)}
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
                    <FormControl
                    sx = {{
                        m: 1,
                        minWidth:120
                    }}
                    >
                        <InputLabel id="estadoPrimeraEscuchaLabel">¿Realizada?</InputLabel>
                        <Select
                        labelId="estadoPrimeraEscuchaLabelId"
                        id="estadoPrimeraEscucha"
                        value={realizadaEdit}
                        label="Realizada"
                        autoWidth
                        onChange={(e) => setRealizadaEdit(e.target.value)}
                        sx={{textAlign:"center"}}
                        >
                            <MenuItem value="true" sx={{textAlign:"center", ":hoover":{background:"lightGrey"}}}>Si</MenuItem>
                            <MenuItem value="false" sx={{textAlign:"center", ":hoover":{background:"lightGrey"}}}>No</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box
                className="botonGuardarEdicion"
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
                    const idPrimeraEscuchaEdit = parseInt(idPrimeraEscuchaInput);
                    const primeraEscuchaArray = {
                        observacion: observacionEdit,
                        realizada: Boolean(realizadaEdit)
                    };
                    console.log(primeraEscuchaArray);
                    console.log(idPrimeraEscuchaEdit);
                    const editarRemision = await PrimeraEscuchaAJAXRequest.editarPrimeraEscucha(idPrimeraEscuchaEdit,primeraEscuchaArray);
                    const primerasEscuchas = await PrimeraEscuchaAJAXRequest.primerasEscuchas();
                    setCharactersList(primerasEscuchas);
                    handleClose();
                }}
                disabled={!Boolean(observacionEdit)}
                >
                    Guardar
                </Button>
                </Box>                
            </Box>
        </Modal>
        </Box>
    )
}

export default PrimeraEscucha;