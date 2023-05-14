import { useEffect, useState } from 'react'
import { TipoRemisionAJAXRequest } from '../../services/remisiones/TipoRemisionAJAXRequest';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from '../../components/DataTable2';
import React from 'react';

const TipoRemision = () => {
    
    const [charactersList, setCharactersList] = useState([]);
    
    useEffect(() => {
        (async () => {
            const tiposRemision =  await TipoRemisionAJAXRequest.tiposRemision();
            setCharactersList(tiposRemision);
        })();
    }, []);

    const columns = [  
        { field: 'idTipoRemision', headerName: 'ID', align: "center" },  
        { field: 'tipoRemision', headerName: 'TIPO DE REMISIÓN', align: "center" },  
        { field: 'acciones', headerName: 'ACCIONES', align: "center" }
    ];


    
    const rows = charactersList.map((item) => ({
        idTipoRemision: item.idTipoRemision, 
        tipoRemision: item.tipoRemision,
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
            startIcon={<DeleteForeverIcon sx={{color:"white"}}/>}
            sx={{
                width:"40px",
                backgroundColor:"red",
            }}
            onClick={async () => {
                setIdTipoRemision(item.idTipoRemision);
                handleOpen('modal2');
            }}
            >
            </Button>
            <Button 
            startIcon={<EditIcon sx={{color:"white"}}/>}
            sx={{
                width:"40px",
                backgroundColor:"green",
            }}
            onClick={async () => {
                setIdTipoRemision(item.idTipoRemision);
                handleOpen('modal3');
            }}
            >
            </Button>
        </Box>
    }))

    const [openModal1, setOpenModal1] = React.useState(false);
    const [openModal2, setOpenModal2] = React.useState(false);
    const [openModal3, setOpenModal3] = React.useState(false);

    const handleOpen = (modal) => {
        switch (modal) {
            case 'modal1':
                setOpenModal1(true);
                break;
            case 'modal2':
                setOpenModal2(true);
                break;
            case 'modal3':
                setOpenModal3(true);
                break;            
            default:
                break;
        }
      };

      const handleClose = (modal) => {
        switch (modal) {
            case 'modal1':
                setOpenModal1(false);
                break;
            case 'modal2':
                setOpenModal2(false);
                break;
            case 'modal3':
                setOpenModal3(false);
                break;
            default:
                break;
        }
      };
    
    const [tipoRemision, setTipoRemision] = useState('');
    const [idTipoRemision, setIdTipoRemision] = useState('');


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
            onClick={() => handleOpen('modal1')}>Crear Tipo Remision</Button>
            <Modal
            open={openModal1}
            onClose={() => handleClose('modal1')}
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
                        Crear Tipo Remision
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
                        label="Tipo de Remision" 
                        variant="outlined"
                        value={tipoRemision}
                        onChange={(e) => setTipoRemision(e.target.value)}
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
                    const tipoRemisionArray = {
                        tipoRemision: tipoRemision
                    };
                    const crearTipoRemision = await TipoRemisionAJAXRequest.crearTipoRemision(tipoRemisionArray);
                    const tiposRemision = await TipoRemisionAJAXRequest.tiposRemision();
                    setCharactersList(tiposRemision);
                    handleClose('modal1');
                }}
                disabled={!Boolean(tipoRemision)}
                >
                    Crear
                </Button>
                </Box>
            </Box>
            </Modal>
            <Modal
            open={openModal2}
            onClose={() => handleClose('modal2')}
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
                        ¿Desea eliminar este Tipo de Remisión?
                    </h2>
                </Box>
                <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                }}
                >
                    <Button
                        className='botonSi'
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
                            const idTipoRemisionValue = parseInt(idTipoRemision);
                            const eliminarRemision = await TipoRemisionAJAXRequest.eliminarTipoRemision(idTipoRemisionValue);
                            const tiposRemision = await TipoRemisionAJAXRequest.tiposRemision();
                            setCharactersList(tiposRemision);
                            handleClose('modal2');
                        }}
                        >
                            Si
                    </Button>
                </Box>
                <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                }}
                >
                    <Button
                        className='botonNo'
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
                        onClick={() => handleClose('modal2')}
                        >
                            No
                    </Button>
                </Box>
            </Box>
            </Modal>
            <Modal
            open={openModal3}
            onClose={() => handleClose('modal3')}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box
                className=''
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
                            Editar Tipo de Remisión
                        </h2>
                    </Box>
                    <Box>
                        <TextField 
                        id="outlined-basic" 
                        label="UsuarioUN" 
                        variant="outlined"
                        value={tipoRemision}
                        onChange={(e) => {
                            setTipoRemision(e.target.value);
                        }}
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
                            const tipoRemisionString = {
                                tipoRemision: tipoRemision
                            };
                            const idTipoRemisionValue = parseInt(idTipoRemision);
                            const editarTipoRemision = await TipoRemisionAJAXRequest.editarTipoRemision(idTipoRemisionValue,tipoRemisionString);
                            const tiposRemision = await TipoRemisionAJAXRequest.tiposRemision();
                            setCharactersList(tiposRemision);
                            handleClose('modal3');
                        }}
                        disabled={!Boolean(tipoRemision)}
                        >
                            Guardar
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

export default TipoRemision;