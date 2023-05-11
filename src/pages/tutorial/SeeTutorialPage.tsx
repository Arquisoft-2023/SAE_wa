import React, {useEffect, useState} from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import { acompanyamientoService } from '../../services/tutorial/AcompanyamientoAJAXRequest'
import { acompanyamiento, rol } from '../../types/tutorial/Acompanyamiento.interface'
import { tipo_estado, tipo_lugar } from '../../types/tutorial/Tutoria.interface'
import DataTable from '../../components/DataTable';

import SelectLabels from '../../components/Select';

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

const SeeTutorialP = (prop: myProps) => {
    const {onGetUser} = prop
    const [user, setUser] = useState<myState["user"]>(onGetUser);
    
    const [dataListOrgin, setdataListOrgin] = useState<myState["getValue"]>()
    const [dataList, setdataList] = useState<myState["getValue"]>()
    const [rows, setrows] = useState([])
    
    const [open, setOpen] = useState<myState["open"]>(false)
    const [optionsTutor, setOptionsTutor] = useState<myState["options"]>([])
    const [optionsStudent, setOptionsStudent] = useState<myState["options"]>([])
    const [myAction, setmyAction] = useState<myState["myAction"]>()
    

    const [mySelect, setmySelect] = useState<myState["search"]>()
    const [search, setsearch] = useState<myState["search"]>()

    const [inputValue, setInputValue] = useState<myState["inputValue"]>(INITIAL_STATE)
    const [selectedItem, setSelectedItem] = useState(null);
    
    // Mapear datos
    const mapper = (data: acompanyamiento[]) => {
        let rows = []
        let cnt = 1
        for(let item of data){
            for(let tutoria of item.listaTutoria){
                rows.push({
                    key: tutoria.Id,
                    usuarioUnTutor: item.usuarioUnTutor,
                    usuarioUnEstudiante: item.usuarioUnEstudiante,
                    estado: tutoria.estado,
                    fecha: dayjs(tutoria.fecha).format('MM-DD-YYYY'),
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
            if(user.userRol === rol.Bienestar){
                const response = await acompanyamientoService.ListAcompanyamientoService()
                const {obtenerAcompanyamiento} = response.data.data
                setdataListOrgin(obtenerAcompanyamiento)
                setdataList(obtenerAcompanyamiento)
                let optStudent = (obtenerAcompanyamiento.map((item: { usuarioUnEstudiante: any; }) => item.usuarioUnEstudiante))
                setOptionsStudent(optStudent.filter((valor, indice, arreglo) => arreglo.indexOf(valor) === indice))

                let optTutor = (obtenerAcompanyamiento.map((item: { usuarioUnTutor: any; }) => item.usuarioUnTutor))
                setOptionsTutor(optTutor.filter((valor, indice, arreglo) => arreglo.indexOf(valor) === indice))
                
                setrows(mapper(obtenerAcompanyamiento))
            }else{
                alert("Acceso no valido") 
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
        {key: 0, field: 'usuarioUnTutor', headerName: 'Tutor', align: "center"},
        {key: 1, field: 'usuarioUnEstudiante', headerName: 'Estudiante', align: "center"},
        {key: 2, field: 'estado', headerName: 'Estado', align: "center"},
        {key: 3, field: 'fecha', headerName: 'Fecha', align: "center"},
        {key: 4, field: 'lugar', headerName: 'Lugar', align: "center"},
        {key: 5, field: 'objetivo', headerName: 'Objetivo', align: "center"},
        {key: 6, field: 'acuerdo', headerName: 'Acuerdo', align: "center"},
        {key: 7, field: 'observacionesTutor', headerName: 'Observaciones Tutor', align: "center"},
        {key: 8, field: 'observacionesEstudiante', headerName: 'Observaciones Estudiante', align: "center"},
    ];  
    if(onGetUser.userRol !== rol.Bienestar) return (<div>Acceso no valido...</div>)  
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

    // Rol
    const handleUser = (getUser: myState["user"]): void => {
        setUser(getUser)
    };

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
                        // marginTop:"10px",
                    }}
                    >
                    <h1>
                        VER TUTORIAS
                    </h1>
                </Box>
                <Box className = "Table">
                    <Box className = "Filtros"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignContent: "center",
                            width: "100%",
                            m: 1
                            // background: "#000",
                        }}    
                        >
                        <Box
                            sx={{
                                display: "flex",
                                alignContent: "start",
                                width: "100%",
                                // backgroundColor: "#000"
                            }}>
                            <SelectLabels options={optionsTutor} handle = {handleOnChange} name={"Tutores"} selectOpc = "" />                         
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignContent: "start",
                                width: "100%",
                                // backgroundColor: "#000"
                            }}>
                            <SelectLabels options={optionsStudent} handle = {handleOnChange} name={"Estudiantes"} selectOpc = "" />                         
                        </Box>
                        <Box
                            className = "BuscarBox"
                            sx={{
                                display: "flex",
                                alignContent: "end",
                                // width: "100%",
                            }}>
                            <TextField 
                                sx={{
                                    m: 1, 
                                    minWidth: 255 
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
                </Box>
                    <DataTable rows={rows} columns={columns} handle={()=>{}}/>
                </Box>
            </Box>
        </ul>
    )
}

export default SeeTutorialP
