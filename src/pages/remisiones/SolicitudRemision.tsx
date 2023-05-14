import { useEffect, useState } from 'react'
import { SolicitudRemisionAJAXRequest } from '../../services/remisiones/SolicitudRemisionAJAXRequest';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DataTable from '../../components/DataTable2';
import React from 'react';
import { TipoRemisionAJAXRequest } from '../../services/remisiones/TipoRemisionAJAXRequest';

const SolicitudRemision = () => {
    
    const [charactersList, setCharactersList] = useState([]);
    const [charactersList2, setCharactersList2] = useState([]);
    
    useEffect(() => {
        (async () => {
            const solicitudesRemision =  await SolicitudRemisionAJAXRequest.solicitudesRemision();
            setCharactersList(solicitudesRemision);
            const tiposRemision = await TipoRemisionAJAXRequest.tiposRemision();
            setCharactersList2(tiposRemision);
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
      {field: 'estado', headerName: 'ESTADO', align: "center"},
      {field: 'acciones', headerName: 'ACCIONES', align: "center"}
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
                setIdSolicitudRemision(item.idSolicitudRemision);
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
            >
            </Button>
            <Button 
            startIcon={<AddBoxIcon sx={{color:"white"}}/>}
            sx={{
                width:"40px",
                backgroundColor:"blue",
            }}
            >
            </Button>
        </Box>
    }))

    const [openModal1, setOpenModal1] = React.useState(false);
    const [openModal2, setOpenModal2] = React.useState(false);
    const [openModal3, setOpenModal3] = React.useState(false);
    const [openModal4, setOpenModal4] = React.useState(false);

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
            case 'modal4':
                setOpenModal4(true);
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
            case 'modal4':
                setOpenModal4(false);
                break;
            default:
                break;
        }
      };

    const [idTipoRemision, setIdTipoRemision] = useState('');
    const [usuarioUnEstudiante, setUsuarioUnEstudiante] = useState('');
    const [programaCurricular, setProgramaCurricular] = useState('');
    const [usuarioUnDocente, setUsuarioUnDocente] = useState('');
    const [justificacion, setJustificacion] = useState('');

    const [idSolicitudRemision, setIdSolicitudRemision] = useState('');


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
            onClick={() => handleOpen('modal1')}>Generar Solicitud</Button>
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
                    <FormControl
                    sx = {{
                        m: 1,
                    }}
                    >
                        <InputLabel id="estadoPrimeraEscuchaLabel">¿Realizada?</InputLabel>
                        <Select
                        labelId="estadoPrimeraEscuchaLabelId"
                        id="estadoPrimeraEscucha"
                        value={idTipoRemision}
                        label="Tipos de Remision"
                        autoWidth
                        onChange={(e) => setIdTipoRemision(e.target.value)}
                        sx={{textAlign:"center"}}
                        >
                            {charactersList2.map((item) => (
                            <MenuItem
                                key={item.idTipoRemision}
                                value={item.idTipoRemision}
                                sx={{ textAlign: "center", ":hover": { background: "lightGrey" } }}
                            >
                                {item.tipoRemision}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                    const generarRemision = await SolicitudRemisionAJAXRequest.generarRemision(generarRemisionArray);
                    const solicitudesRemision = await SolicitudRemisionAJAXRequest.solicitudesRemision();
                    setCharactersList(solicitudesRemision);
                    handleClose('modal1');
                }}
                disabled={!Boolean(idTipoRemision) || !Boolean(usuarioUnEstudiante) || !Boolean(programaCurricular) || !Boolean(usuarioUnDocente) || !Boolean(justificacion)}
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
                            const idSolicitudRemisionValue = parseInt(idSolicitudRemision);
                            console.log(idSolicitudRemision);
                            const eliminarRemision = await SolicitudRemisionAJAXRequest.eliminarRemision(idSolicitudRemision);
                            const solicitudesRemision = await SolicitudRemisionAJAXRequest.solicitudesRemision();
                            setCharactersList(solicitudesRemision);
                            handleClose('modal2');
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
                        onClick={() => handleClose('modal2')}
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

export default SolicitudRemision;