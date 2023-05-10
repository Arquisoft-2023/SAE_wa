import React, {useEffect, useState} from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { TutorialService } from '../../services/tutorial/TutorialAJAXRequest'
import { acompanyamiento, rol } from '../../types/tutorial/Acompanyamiento.interface'
import { tipo_estado, tipo_lugar } from '../../types/tutorial/Tutoria.interface'
import DataTable from '../../components/DataTable';
import SplitButton from '../../components/SplitButton';
import BasicDatePicker from '../../components/Date';
import { Search } from 'react-router-dom';
import { on } from 'events';
import { type } from 'os';

enum myActions{
    Create = "Crear Tutoria",
    Modify = "Modificar Tutor"
}

interface myState {
    getValue: acompanyamiento[]
    inputValue: acompanyamiento
    search: {
        len: number
        value: string
        opc: string
    }
    open: boolean,
    myAction: myActions
    user: {
        userEmail: string
        userRol: rol
    }
    options: string[]
}

interface myProps{
    onGetUser: myState["user"]
}

const INITIAL_STATE: myState["inputValue"] = {
    usuarioUnEstudiante: "",
    usuarioUnTutor: "",
    listaTutoria: [{
        Id: "",
        fecha: "",
        estado: "",
        lugar: "",
        objetivo: "",
        acuerdo: "",
        observacionesTutor: "",
        observacionesEstudiante: "",
    }] as any
}

let optionUser = []
const typeState = Object.values(tipo_estado)
const typePlace = Object.values(tipo_lugar)

const ManageTutorialP = (prop: myProps) => {
    const {onGetUser} = prop
    const [user, setUser] = useState<myState["user"]>(onGetUser);
    
    const [dataListOrgin, setdataListOrgin] = useState<myState["getValue"]>()
    const [dataList, setdataList] = useState<myState["getValue"]>()
    const [rows, setrows] = useState([])
    
    const [open, setOpen] = useState<myState["open"]>(false)
    const [options, setoptions] = useState<myState["options"]>([])
    const [myAction, setmyAction] = useState<myState["myAction"]>()
    

    const [mySelect, setmySelect] = useState<myState["search"]>()
    const [search, setsearch] = useState<myState["search"]>()

    const [inputValue, setInputValue] = useState<myState["inputValue"]>(INITIAL_STATE)
    
    // Mapear datos
    const mapper = (data: acompanyamiento[]) => {
        let rows = []
        let cnt = 1
        for(let item of data){
            for(let tutoria of item.listaTutoria){
                rows.push({
                    key: cnt,
                    correo: item.usuarioUnEstudiante || item.usuarioUnTutor,
                    estado: tutoria.estado,
                    fecha: dayjs(tutoria.fecha).format('DD/MM/YYYY'),
                    lugar: tutoria.lugar,
                    objetivo: tutoria.objetivo,
                    acuerdo: tutoria.acuerdo,
                    observacionesTutor: tutoria.observacionesTutor,
                    observacionesEstudiante: tutoria.observacionesEstudiante,
                })
                cnt++; 
            }
        }
        return rows
    }

    // Realizar petición    
    const fetchData = async () => {
        try{
            if(user.userRol === rol.Docente){
                const response = await TutorialService.GetTutorialTutorService(user.userEmail)
                const {obtenerAcompanyamientoTutor} = response.data.data
                setdataListOrgin(obtenerAcompanyamientoTutor)
                setdataList(obtenerAcompanyamientoTutor)
                setoptions(obtenerAcompanyamientoTutor.map((item: { usuarioUnEstudiante: any; }) => item.usuarioUnEstudiante))
                optionUser = (obtenerAcompanyamientoTutor.map((item: acompanyamiento) =>{
                    if(item.esTutor === "Actual") return item.usuarioUnEstudiante
                }))
                optionUser = optionUser.filter((item: any) => item !== undefined && item !== null && item !== "")
                setrows(mapper(obtenerAcompanyamientoTutor))
            }
            else if(user.userRol === rol.Estudiante){                                        
                const response = await TutorialService.GetTutorialEstudentService(user.userEmail)
                const {obtenerAcompanyamientoEstudiante} = response.data.data
                setdataListOrgin(obtenerAcompanyamientoEstudiante)
                setdataList(obtenerAcompanyamientoEstudiante)
                setoptions([("Tutores")].concat(obtenerAcompanyamientoEstudiante.map((item: { usuarioUnTutor: any; }) => item.usuarioUnTutor)))
                optionUser = ([("Tutores")].concat(obtenerAcompanyamientoEstudiante.map((item: acompanyamiento) =>{
                    if(item.esTutor === "Actual"){
                        return item.usuarioUnTutor
                    }
                })))
                optionUser = optionUser.filter((item: any) => item !== undefined && item !== null && item !== "")
                setrows(mapper(obtenerAcompanyamientoEstudiante))
            }
            
        } catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    },[]);
   
    // Crear tabla
    const columns = [
        {key: 0, field: 'correo', headerName: 'Correo', align: "center"},
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

    // Filtro Busqueda
    const filterElements = (data: myState["getValue"], slc: myState["search"]) => {
        var items = []
        const {len, value, opc} = slc
        if(value === "Estudiantes" || value === "Tutores"){
            setrows(mapper(dataListOrgin))
            return
        }
        if(len === 0) {
            setrows(mapper(dataList))
            return
        }
        switch(opc){
            case "filterBoton":
                items = data.filter( data => {
                    if(data.usuarioUnEstudiante?.toLowerCase().includes(value.toLowerCase()) || 
                        data.usuarioUnTutor?.toLowerCase().includes(value.toLowerCase()))
                    {
                        return data;
                    }
                });
                setdataList(items)
            break;
            case "filterSearch":
                for(const tuto of data){
                    for(const elem of tuto.listaTutoria){
                        if(elem.estado?.toLowerCase().includes(value.toLowerCase()) || 
                        // elem.fecha?.toLowerCase().includes(value.toLowerCase()) ||
                        elem.lugar?.toLowerCase().includes(value.toLowerCase()) ||
                        elem.objetivo?.toLowerCase().includes(value.toLowerCase()) ||
                        elem.acuerdo?.toLowerCase().includes(value.toLowerCase()) ||
                        elem.observacionesTutor?.toLowerCase().includes(value.toLowerCase()) ||
                        elem.observacionesEstudiante?.toLowerCase().includes(value.toLowerCase()))
                        {
                            const x: acompanyamiento = {...tuto, listaTutoria: [elem]}
                            items.push(x)
                        }
                    }
                }   
            break;
            default:
            
            break;
        }
        setrows(mapper(items))
    }
    const handleOnChangeRead = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist()
        const {value} = event.target
        setsearch({ len: value.length, value: value, opc: "filterSearch"})
        filterElements(dataList, { len: value.length, value: value, opc: "filterSearch"})
    }

    // Opcion de busqueda
    const handleOnChange = async (newSelect: myState["search"]) => {
        const {len, value, opc} = newSelect
        setmySelect({ len: len, value: value, opc: "filterBoton"})
        filterElements(dataListOrgin, { len: len, value: value, opc: "filterBoton"})
    }

    // Crear tutoria
    const handleOnChangeCreate = async (newSelect: myState["search"]) => {
        const {len, value, opc} = newSelect
        let {listaTutoria} = inputValue
        // setmySelect(newSelect)
        switch(opc){
            case "Tutor":
                setInputValue({
                    ...inputValue,
                    ["usuarioUnTutor"] : value
                })
            break;
            case "Estudiantes":
                setInputValue({
                    ...inputValue,
                    ["usuarioUnEstudiante"] : value
                })
            break;
            case "Estado":
                listaTutoria[0]["estado"] = tipo_estado[value.toLowerCase()]
                setInputValue({
                    ...inputValue
                })
            break;
            case "Lugar":
                listaTutoria[0]["lugar"] = tipo_lugar[value.toLowerCase()]
                setInputValue({
                    ...inputValue
                })
            break;
            case "Fecha":
                listaTutoria[0]["fecha"] = dayjs(value).toISOString()
                setInputValue({ 
                    ...inputValue
                })
            default:
            break;
        }
        // console.log(inputValue)
        // filterElements(dataListOrgin, { len: newSelect.length, value: newSelect, opc: "filterBoton"})
    }

    const handleChangeAssing = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        let {listaTutoria} = inputValue
        listaTutoria[0][name] = value
        setInputValue({
            ...inputValue
        })
    }

    const handleSubmitCreate = async () =>{
        if(myAction === myActions.Create){
            setInputValue({
                ...inputValue,
                [(onGetUser.userRol === rol.Docente? "usuarioUnTutor": "usuarioUnEstudiante")] : onGetUser.userEmail
            })           

            const response = await TutorialService.CreateTutorialService(inputValue)
            setInputValue(INITIAL_STATE)
            if(response.status !== 200) return alert("Error al guardar los datos")
            const res:string = response.data.data.crearTutoriaMq
            if(!(res.includes("200"))){
                const description = res.slice(16,33)
                return alert(description)
            }
            alert("Dator Guardados")
        }
        fetchData();
    }

    // Rol
    const handleUser = (getUser: myState["user"]): void => {
        setUser(getUser)
    };


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
                    width: "100%",
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
                        GESTIONAR TUTORIAS
                    </h1>
                </Box>
                <Box className = "Table">
                <Box 
                    sx = {{
                        // marginLeft: "200px",
                        display: "flex",
                        justifyContent: "start",
                        width: "100%",
                    }}
                    >
                    <Box className = "Filtros"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",  
                            // background: "#000",
                        }}    
                        >
                        <Box
                            className = "BuscarBox"
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                margin:"10px",
                                // width: "100%",
                                // backgroundColor: "#000"                         
                            }}>
                            <TextField 
                                sx={{
                                    display: "flex",
                                    margin:"10px",
                                    width: "100%",
                                    // backgroundColor: "#000"                         
                                }}
                                id="Buscar"
                                label="Buscar" 
                                variant="outlined"
                                name="busqueda"
                                value={search?.value || ''}
                                onChange={handleOnChangeRead}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                margin:"20px",
                                width: "100%",  
                                // backgroundColor: "#000"
                            }}>
                            <SplitButton options={options} handle = {handleOnChange} name={onGetUser.userRol === rol.Docente? "Estudiantes": "Tutor"} />                         
                        </Box>
                    </Box>
                </Box>
                <DataTable rows={rows} columns={columns}/>
                </Box>
                <Box className = "ModalCrear"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",                   
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
                        onClick={() => handleOpen(myActions.Create)}> Crear
                    </Button>
                    <Box>
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
                                width: 600,
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
                                            {myAction === myActions.Create ? "Crear Tutoria" : "Modificar tutoria"}
                                        </h2>
                                </Box>
                                <Box className = "BxOptionsUser"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignContent: "center",
                                    }}>
                                    <SplitButton options={optionUser} handle = {handleOnChangeCreate} name = {onGetUser.userRol === rol.Docente? "Estudiantes": "Tutores"} />  
                                </Box>                       
                                <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    width: "100%",
                                }}>
                                    <SplitButton options={typeState} handle = {handleOnChangeCreate} name = {"Estado"}/>                         
                                </Box>
                                <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    width: "100%",
                                }}>
                                    <SplitButton options={typePlace} handle = {handleOnChangeCreate} name={"Lugar"}/>                         
                                </Box>
                                </Box>
                                <Box
                                className = "BxTextField2"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                }}>
                                    <BasicDatePicker handle  = {handleOnChangeCreate}/>                            
                                </Box>
                                <Box
                                className = "BxTextField3"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                }}>
                                    <TextField 
                                        id="objetivoCreate"
                                        label="Objetivo" 
                                        variant="outlined"
                                        name="objetivo"
                                        // disabled
                                        // defaultValue={onGetUser.userEmail}
                                        // value={"2023-05-09"}
                                        // onChange={handleChangeAssing}
                                        value={inputValue?.listaTutoria[0].objetivo}
                                        onChange={handleChangeAssing}
                                    />
                                </Box>
                                <Box
                                className = "BxTextField4"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                }}>
                                    <TextField 
                                        id="acuerdoCreate"
                                        label="Acuerdo" 
                                        variant="outlined"
                                        name="acuerdo"
                                        value={inputValue?.listaTutoria[0].acuerdo}
                                        onChange={handleChangeAssing}
                                    />
                                </Box>   
                                <Box
                                className = "BxTextField5"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                }}>
                                    <TextField 
                                        id="observationCreate"
                                        label="Observaciones" 
                                        variant="outlined"
                                        name={onGetUser.userRol === rol.Docente? "observacionesTutor": "observacionesEstudiante"}
                                        value={onGetUser.userRol === rol.Docente ? inputValue?.listaTutoria[0].observacionesTutor: inputValue?.listaTutoria[0].observacionesEstudiante}
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
                                    }} onClick={handleSubmitCreate} 
                                    >Guardar</Button>
                                </Box>

                            </Box>
                        </Modal>
                    </Box>
                </Box>
            </Box>
        </ul>
    )
}

export default ManageTutorialP
