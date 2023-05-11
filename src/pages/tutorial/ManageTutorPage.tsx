import React, {useEffect, useState} from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

import { acompanyamientoService } from '../../services/tutorial/AcompanyamientoAJAXRequest'
import { acompanyamiento, rol} from '../../types/tutorial/Acompanyamiento.interface'
import DataTable from '../../components/DataTable';

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
        userRol: rol
    }
}

interface myProps{
    onGetUser: myState["user"]
}

const ManageTutorP = (prop: myProps) => {
    const {onGetUser} = prop

    const [inputValue, setInputValue] = useState<myState["inputValue"]>({
        usuarioUnEstudiante: '',
        usuarioUnTutor: '',
    })
    const [dataListOrgin, setdataListOrgin] = useState<myState["getValue"]>()
    const [myAction, setmyAction] = useState<myState["myAction"]>()
    const [dataList, setdataList] = useState<myState["getValue"]>()
    const [search, setsearch] = useState<myState["search"]>()
    const [open, setOpen] = useState<myState["open"]>(false)
    const [rows, setrows] = useState([])
    
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
                const response = await acompanyamientoService.ListAcompanyamientoService()
                const {obtenerAcompanyamiento} = response.data.data
                // console.log(*)
                setdataListOrgin(obtenerAcompanyamiento)
                setdataList(obtenerAcompanyamiento)
                setrows(mapper(obtenerAcompanyamiento))
            } catch(error){
                console.log(error)
            }
        }
        fetchData();
    },[]);
    
    // Crear tabla
    const columns = [
        {key: 1, field: 'usuarioUnEstudiante', headerName: 'Correo Estudiante', align: "center"},
        {key: 2, field: 'usuarioUnTutor', headerName: 'Correo tutor', align: "center"},
        {key: 3, field: 'esTutor', headerName: 'Estado', align: "center"},
    ];  

    if(onGetUser.userRol !== rol.Bienestar) return (<div>Acceso no valido...</div>) 
    if(!dataList) return (<div>loading...</div>)

    // Filtro
    const filterElements = (data: myState["getValue"], search: myState["search"]) => {
        const {len, value} = search
        if(len === 0) {
            setrows(mapper(dataListOrgin))
            return
        }
        else{
            var items = data.filter( data => {
                if(data.usuarioUnEstudiante.toLowerCase().includes(value.toLowerCase()) || 
                    data.usuarioUnTutor.toLowerCase().includes(value.toLowerCase()))
                {
                    return data;
                }
            });
            setrows(mapper(items))
        }
    }
    const handleOnChangeRead = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist()
        const {name, value} = event.target
        setsearch({ len: value.length, value: value })
        filterElements(dataList, search)
    }

    // Abrir y cerrar ventana
    const handleOpen = (type: myActions) => {
        setOpen(true);
        setmyAction(type)
    }
    const handleClose = () => setOpen(false);
    
    // Asignar tutor
    const handleSubmitAssing = async () => {
        // event.preventDefault()
        if(!inputValue.usuarioUnEstudiante || !inputValue.usuarioUnTutor){
            alert("Por favor, ingrese todos los datos")
            return
        }

        if(myAction === myActions.Assing){
            const response = await acompanyamientoService.assingTutorService(inputValue)
            if(response.status != 200) return alert("Error al guardar los datos")
            
            const {asignarTutor} = response.data.data
            if(asignarTutor.usuarioUnTutor != inputValue.usuarioUnTutor) return alert("Ya tiene un tutor asignado. El tutor es: " + asignarTutor.usuarioUnTutor)
        }
        else if(myAction === myActions.Modify){
            const response = await acompanyamientoService.UpdateTutorService(inputValue)
            if(response.status != 200) return alert("Error al guardar los datos")
            // const {actualizarTutor} = response.data.data
        }

        const response2 = await acompanyamientoService.ListAcompanyamientoService()
        const {obtenerAcompanyamiento} = response2.data.data
        setdataListOrgin(obtenerAcompanyamiento)
        setdataList(obtenerAcompanyamiento)

        handleClose();
        alert("Dator Guardados")
    }

    const handleChangeAssing = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setInputValue({
            ...inputValue,
            [name]: value
        })
    }


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
                    <DataTable rows={rows} columns={columns} handle={()=>{}}/>
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
                        onClick={() => handleOpen(myActions.Assing)}> Asignar
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
                                    onChange={handleChangeAssing}
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
                                    onChange={handleChangeAssing}
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
                                }} onClick={handleSubmitAssing} >Guardar</Button>
                            </Box>

                        </Box>
                    </Modal>
                </Box>
            </Box>
        </ul>
    )
}

export default ManageTutorP
