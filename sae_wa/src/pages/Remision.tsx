import { useEffect, useState } from 'react'
import { RemisionAJAXRequest } from '../services/RemisionAJAXRequest';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import DataTable from '../components/DataTable';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

const Remision = () => {
    
    const [charactersList, setCharactersList] = useState([]);
    
    useEffect(() => {
        (async () => {
            const remisiones =  await RemisionAJAXRequest.remisiones();
            setCharactersList(remisiones);


        })();
    }, []);

    const columns = [
      {field: 'idRemision', headerName: 'ID', align: "center"},
      {field: 'fechaEnvioRemision', headerName: 'FECHA DE REMISIÓN', align: "center"},
      {field: 'tipoRemision', headerName: 'TIPO DE REMISIÓN', align: "center"},
      {field: 'usuarioUnDocente', headerName: 'DOCENTE', align: "center"},
      {field: 'usuarioUnEstudiante', headerName: 'ESTUDIANTE', align: "center"},
      {field: 'programaCurricular', headerName: 'PROGRAMA', align: "center"},
      {field: 'justificacionSolicitud', headerName: 'JUSTIFICACIÓN', align: "center"},
      {field: 'primeraEscuchaRealizada', headerName: 'PRIMERA ESCUCHA', align: "center"},
      {field: 'observacionPrimeraEscucha', headerName: 'OBSERVACIÓN', align: "center"},
      {field: 'remisionEfectiva', headerName: 'ESTADO', align: "center"},
      {field: 'acciones', headerName: 'ACCIONES', align: "center"}
    ];

    const rows = charactersList.map((item) => ({
        idRemision: item.idRemision,
        fechaEnvioRemision: item.fechaEnvioRemision,
        tipoRemision: item.tipoRemision,
        usuarioUnDocente: item.usuarioUnDocente,
        usuarioUnEstudiante: item.usuarioUnEstudiante,
        programaCurricular: item. programaCurricular,
        justificacionSolicitud: item.justificacionSolicitud,
        primeraEscuchaRealizada: item.primeraEscuchaRealizada ? 'Realizada' : 'Pendiente',
        observacionPrimeraEscucha: item.observacionPrimeraEscucha,
        remisionEfectiva: item.remisionEfectiva ? 'Efectiva' : 'No Efectiva',
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
            onClick={() => {
                setIdRemision(item.idRemision);
                handleOpen('modal3');
            }}
            >
            </Button>
            <Button 
            startIcon={<EditIcon sx={{color:"white"}}/>}
            sx={{
                width:"40px",
                backgroundColor:"green",
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

    const [usuarioUn, setUsuarioUn] = useState('');
    const [idSolicitudRemision, setIdSolicitudRemision] = useState('');
    const [dia, setDia] = useState('');
    const [mes, setMes] = useState('');
    const [anyo, setAnyo] = useState('');

    const [idRemision,setIdRemision] = useState('');

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
        className = "BotonesSuperiores"
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            flexDirection: "row",
            gap: "20px"        }}
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
            onClick={() => handleOpen('modal1')}>Generar Remisión</Button>
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
            onClick={() => handleOpen('modal2')}>Remision por Usuario UN</Button>
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
            onClick={async () => {
                const remisionesEfectivas = await RemisionAJAXRequest.remisionesEfectivas();
                setCharactersList(remisionesEfectivas);
            }}
            >Remisiones Efectivas</Button>
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
            onClick={async () => {
                const remisiones = await RemisionAJAXRequest.remisiones();
                setCharactersList(remisiones);
            }}
            >Todas las Remisiones</Button>
            <Modal
            className='modal1'
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
                            label="Id Solicitud de Remision" 
                            variant="outlined"
                            value={idSolicitudRemision}
                            onChange={(e) => setIdSolicitudRemision(e.target.value)}
                        />
                        <Box
                        className="fechaTextFields"
                        sx = {{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            flexDirection: "row"
                        }}
                        >
                            <TextField 
                                id="outlined-basic" 
                                label="Dia" 
                                variant="outlined"
                                value={dia}
                                onChange={(e) => setDia(e.target.value)}
                            />
                            <TextField 
                                id="outlined-basic" 
                                label="Mes" 
                                variant="outlined"
                                value={mes}
                                onChange={(e) => setMes(e.target.value)}
                            />
                            <TextField 
                                id="outlined-basic" 
                                label="Año" 
                                variant="outlined"
                                value={anyo}
                                onChange={(e) => setAnyo(e.target.value)}
                            />
                        </Box>
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
                        idSolicitudRemision: parseInt(idSolicitudRemision),
                        fechaPrimeraEscucha: anyo+"-"+mes+"-"+dia
                    };
                    const generarRemision = await RemisionAJAXRequest.generarRemision(generarRemisionArray);
                    const remisiones = await RemisionAJAXRequest.remisiones();
                    setCharactersList(remisiones);
                    handleClose('modal1');
                }}
                disabled={!Boolean(idSolicitudRemision) || !Boolean(dia) || !Boolean(mes) || !Boolean(anyo)}
                >
                    Crear
                </Button>
                </Box>
            </Box>
            </Modal>

            <Modal
            className='modal2'
            open={openModal2}
            onClose={() => handleClose('modal2')}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box
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
                            Buscar por Usuario UN
                        </h2>
                    </Box>
                    <Box
                    className="UsuarioUnTextFields"
                    sx = {{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        flexDirection: "row"
                    }}
                    >
                    <TextField 
                        id="outlined-basic" 
                        label="UsuarioUN" 
                        variant="outlined"
                        value={usuarioUn}
                        onChange={(e) => {
                            setUsuarioUn(e.target.value);
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
                        className='botonBuscar'
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
                            const remisionesUsuarioUnString = usuarioUn
                            const remisionesUsuarioUn = await RemisionAJAXRequest.remisionUsuarioUn(remisionesUsuarioUnString);
                            setCharactersList(remisionesUsuarioUn);
                            handleClose('modal2');
                        }}
                        disabled={!Boolean(usuarioUn)}
                        >
                            Buscar
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
            className='modal3'
            open={openModal3}
            onClose={() => handleClose('modal3')}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box
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
                            ¿Desea eliminar esta solicitud?
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
                            const idRemisionValue = parseInt(idRemision);
                            console.log(idRemisionValue);
                            const eliminarRemision = await RemisionAJAXRequest.eliminarRemision(idRemisionValue);
                            const remisiones = await RemisionAJAXRequest.remisiones();
                            setCharactersList(remisiones);
                            handleClose('modal3');
                        }}
                        >
                            Si
                        </Button>
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
                        onClick={() => handleClose('modal3')}
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
            <DataTable rows={rows} columns={columns}/>
        </Box>
        </Box>
    )
}

export default Remision;