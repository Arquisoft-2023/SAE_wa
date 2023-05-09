import React, {useEffect, useState} from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

import { TutorialService } from '../../services/tutorial/TutorialAJAXRequest'
import { acompanyamiento } from '../../types/tutorial/Acompanyamiento.interface'
import DataTable from '../../components/DataTable';
import SplitButton from '../../components/SplitButton';

enum myActions{
    Assing = "Asgnar Tutor",
    Modify = "Modificar Tutor"
}

interface myState {
    getValue: acompanyamiento[]
    inputValue: acompanyamiento
    search: {
        len: number
        value: string
    }
    open: boolean,
    myAction: myActions
    user: {
        userEmail: string
        userRol: string
    }
    mySelect: {
        value: string
    }
    options: string[]
}

interface myProps{
    onGetUser: myState["user"]
}

const option = ["sebastian", "lorena", "hola que hace", "hola que no hace"]

const ManageTutorialP = (prop: myProps) => {
    const {onGetUser} = prop

    const [inputValue, setInputValue] = useState<myState["inputValue"]>({
        usuarioUnEstudiante: '',
        usuarioUnTutor: '',
    })
    const [user, setUser] = useState<myState["user"]>(onGetUser);
    const [dataListOrgin, setdataListOrgin] = useState<myState["getValue"]>()
    const [dataList, setdataList] = useState<myState["getValue"]>()
    
    const [options, setoptions] = useState<myState["options"]>([])
    const [mySelect, setmySelect] = useState<myState["mySelect"]>({ value: '' })
    const [myAction, setmyAction] = useState<myState["myAction"]>()
    const [search, setsearch] = useState<myState["search"]>()
    
    const [open, setOpen] = useState<myState["open"]>(false)
    
    // Mapear datos
    const mapper = (data: acompanyamiento[]) => {
        let rows = []
        let cnt = 1
        for(let item of data){
            rows.push({
                key: cnt,
                usuarioUnEstudiante: item.usuarioUnEstudiante,
                usuarioUnTutor: item.usuarioUnTutor,
                esTutor: item.esTutor
            })
            cnt++;
        }
        return rows
    }

    // Realizar petición
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await TutorialService.GetTutorialTutorService(user.userEmail)
                const {obtenerAcompanyamientoTutor} = response.data.data
                setdataListOrgin(obtenerAcompanyamientoTutor)
                setdataList(obtenerAcompanyamientoTutor)
                setoptions(obtenerAcompanyamientoTutor.map((item) => item.usuarioUnEstudiante))
                /*
                const response = await TutorialService.GetTutorialEstudentService("sebastian")
                const {obtenerAcompanyamientoEstudiante} = response.data.data
                console.log(response)
                setdataListOrgin(obtenerAcompanyamientoEstudiante)
                console.log(obtenerAcompanyamientoEstudiante)
                setdataList(obtenerAcompanyamientoEstudiante)
                */
            } catch(error){
                console.log(error)
            }
        }
        fetchData();
    },[]);
   
    // Crear tabla
    const columns = [
        {key: 1, field: 'estado', headerName: 'Estado', align: "center"},
        {key: 2, field: 'fecha', headerName: 'Fecha', align: "center"},
        {key: 3, field: 'lugar', headerName: 'Lugar', align: "center"},
        {key: 4, field: 'objetivo', headerName: 'Objetivo', align: "center"},
        {key: 5, field: 'acuerdo', headerName: 'Acuerdo', align: "center"},
        {key: 6, field: 'observacionesTutor', headerName: 'Observaciones Tutor', align: "center"},
        {key: 7, field: 'observacionesEstudiante', headerName: 'Observaciones Estudiante', align: "center"},
        // {key: 7, field: 'Id', headerName: 'Id', align: "center", hidden: true},
    ];  
    if(!dataList) return (<div>loading...</div>)

    // Filtro
    const filterElements = (data: myState["getValue"], search: myState["search"]) => {
        const {len, value} = search
        if(len === 0){
            setdataList(dataListOrgin)            
        }
        else{
            var items = data.filter( data => {
                if(data.usuarioUnEstudiante?.toLowerCase().includes(value.toLowerCase()) || 
                    data.usuarioUnTutor?.toLowerCase().includes(value.toLowerCase()))
                {
                    return data;
                }
            });
            setdataList(items)
        }
    }
    const handleOnChangeRead = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist()
        const {name, value} = event.target
        setsearch({ len: value.length, value: value })
        filterElements(dataList, search)
    }

    // Rol
    const handleUser = (getUser: myState["user"]): void => {
        setUser(getUser)
    };

    // Opcion de busqueda
    const handleOnChange = async (newSelect: myState["mySelect"]) => {
        setmySelect(newSelect)
        filterElements(dataListOrgin, {len: newSelect.value.length, value: newSelect.value })
        // console.info(`Ud ha seleccionado ${newSelect.value}`);
    }

    // Abrir y cerrar ventana
    const handleOpen = (type: myActions) => {
        setOpen(true);
        setmyAction(type)
    }
    const handleClose = () => setOpen(false);

    return (
        <ul>
            <Box className = "componente"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop:"30px",
                    border: "none",
                    gap:"20px"
                }}>
                <Box className = "Titulo"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        marginTop:"10px",
                    }}
                    >
                    <h1>
                        GESTIONAR TUTOR
                    </h1>
                </Box>
                    <Box
                        className = "BuscarBox"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                        }}>
                        <TextField 
                            id="Buscar"
                            label="Buscar" 
                            variant="outlined"
                            name="busqueda"
                            value={search?.value || ''}
                            onChange={handleOnChangeRead}
                        />
                    </Box>
                <Box className = "Tabla">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            alignContent: "start",
                            margin:"10px"                            
                        }}>
                        <SplitButton options={options} handle = {handleOnChange} />                         
                    </Box>
                    <DataTable rows={dataList.length === 0? []: dataList[0].listaTutoria} columns={columns}/>
                </Box>
                <Box className = "ModalCrear"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none"
                }}
                > 
                    <Button className = "btnCrear" 
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
                        onClick={() => handleOpen(myActions.Assing)}> Crear
                    </Button>
                    <Button className = "btnCambiar"
                        sx={{
                            display:"block",
                            padding:"10px 30px",
                            borderRadius:"100px",
                            color:"#fff",
                            border:"none",
                            background:"black",
                            cursor:"pointer",
                            marginLeft:"20px",
                            transition:".3s ease all",
                            ":hover": {
                                background:"DarkGrey",
                            }
                        }}
                        onClick= {() => handleOpen(myActions.Modify)}> Cambiar
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className = "Modal"
                    >
                        <Box className = "BxModal"
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
                        }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                }}
                                className = "BxTitulo2"
                                >
                                    <h2>
                                        {myAction === myActions.Assing ? "Asignar Tutor" : "Cambiar Tutor"}
                                    </h2>
                            </Box>
                            <Box
                            className = "BxTextField1"
                             sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                            }}>
                                <TextField 
                                    id="usuarioUnEstudiante"
                                    label="Usuario Estudiante" 
                                    variant="outlined"
                                    name="usuarioUnEstudiante"
                                    value={inputValue.usuarioUnEstudiante}
                                    // onChange={handleChangeAssing}
                                />

                            </Box>
                            <Box
                            className = "BxTextField2"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                            }}>
                                <TextField 
                                    id="usuarioUnTutor"
                                    label="Usuario tutor" 
                                    variant="outlined"
                                    name="usuarioUnTutor"
                                    value={inputValue.usuarioUnTutor}
                                    // onChange={handleChangeAssing}
                                />
                            </Box>                            
                            <Box
                            className = "BxGuardar"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                            }}>
                                <Button 
                                    className = "btnGuardar"
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
                                }} //onClick={handleSubmitAssing} 
                                >Guardar</Button>
                            </Box>

                        </Box>
                    </Modal>
                </Box>
            </Box>
        </ul>
    )
}

export default ManageTutorialP
