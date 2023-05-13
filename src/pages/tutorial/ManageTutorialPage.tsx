import React, {useEffect, useState} from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import { TutorialService } from '../../services/tutorial/TutorialAJAXRequest'
import { acompanyamiento, rol } from '../../types/tutorial/Acompanyamiento.interface'
import { tipo_estado, tipo_lugar } from '../../types/tutorial/Tutoria.interface'
import DataTable from '../../components/DataTable';
import BasicDatePicker from '../../components/Date';
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
    const [selectedItem, setSelectedItem] = useState(null);
    
    // Mapear datos
    const mapper = (data: acompanyamiento[]) => {
        let rows = []
        let cnt = 1
        for(let item of data){
            for(let tutoria of item.listaTutoria){
                rows.push({
                    key: tutoria.Id,
                    correo: item.usuarioUnEstudiante || item.usuarioUnTutor,
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
            if(user.userRol === rol.Docente){
                const response = await TutorialService.GetTutorialTutorService(user.userEmail)
                const {obtenerAcompanyamientoTutor} = response.data.data
                setdataListOrgin(obtenerAcompanyamientoTutor)
                setdataList(obtenerAcompanyamientoTutor)
                setoptions((obtenerAcompanyamientoTutor.map((item: { usuarioUnEstudiante: any; }) => item.usuarioUnEstudiante)))
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
                setoptions((obtenerAcompanyamientoEstudiante.map((item: { usuarioUnTutor: any; }) => item.usuarioUnTutor)))
                optionUser = ((obtenerAcompanyamientoEstudiante.map((item: acompanyamiento) =>{
                    if(item.esTutor === "Actual"){
                        return item.usuarioUnTutor
                    }
                })))
                optionUser = optionUser.filter((item: any) => item !== undefined && item !== null && item !== "")
                setrows(mapper(obtenerAcompanyamientoEstudiante))
            }     
            setInputValue({
                ...inputValue,
                [(onGetUser.userRol === rol.Docente? "usuarioUnTutor": "usuarioUnEstudiante")] : onGetUser.userEmail
            })      
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
        {key: 8, field: 'actionsEdit', headerName: 'Acciones', align: "center"},
        // {key: 7, field: 'Id', headerName: 'Id', align: "center", hidden: true},
    ];  
    if(onGetUser.userRol === rol.Bienestar) return (<div>Acceso no valido...</div>)  
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
        let {len, value, opc} = newSelect
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
                if(value.toLowerCase() === "no realizada") value = "no_realizada"	
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
        let response = null
        if(myAction === myActions.Create){
            response = await TutorialService.CreateTutorialService(inputValue)
        }
        else if(myAction === myActions.Modify){
            inputValue.listaTutoria[0]["Id"] = selectedItem?.key
            setInputValue({ 
                ...inputValue
            })
            response = await TutorialService.ModTutorialService(inputValue)
        }
        setInputValue(INITIAL_STATE)
        setInputValue({
            ...inputValue,
            [(onGetUser.userRol === rol.Docente? "usuarioUnTutor": "usuarioUnEstudiante")] : onGetUser.userEmail
        })
        if(response?.status !== 200) return alert("Error al guardar los datos")
        const res:string = response?.data.data.crearTutoriaMq || response?.data.data.actualizarTutoriaCmq
        if(!(res.includes("200"))){
            // const description = res.slice(16,33)
            return alert(res)
        }
        alert("Dator Guardados")
        fetchData();
    }

    // Modificar tutoria
    const handleRowClick = (item) => {
        setSelectedItem(item);
        let auxState = ''
        if(item.estado.toLowerCase() === "no realizada") auxState = "no_realizada"
        else auxState = item.estado.toLowerCase()
        setInputValue({
            ...inputValue,
            [(onGetUser.userRol === rol.Docente? "usuarioUnEstudiante": "usuarioUnTutor")] : item.correo,
            ["listaTutoria"] : [{
                "estado": tipo_estado[auxState],
                "lugar":  tipo_lugar[item.lugar.toLowerCase()],
                "fecha": dayjs(new Date(item.fecha)).toISOString(),
                "objetivo": item.objetivo,
                "acuerdo": item.acuerdo,
                "observacionesTutor": item.observacionesTutor,
                "observacionesEstudiante": item.observacionesEstudiante
            }]
        })
        handleOpen(myActions.Modify);
    };

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
                        // marginTop:"10px",
                    }}
                    >
                    <h1>
                        GESTIONAR TUTORIAS
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
                            <SelectLabels options={options} handle = {handleOnChange} name={onGetUser.userRol === rol.Docente? "Estudiantes": "Tutor"} selectOpc = "" />                         
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
                    <DataTable rows={rows} columns={columns} handle={handleRowClick}/>
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
                        onClick={() => {handleOpen(myActions.Create);}}> Crear
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
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignContent: "start",
                                        }}>
                                        <SelectLabels options={optionUser} handle = {handleOnChangeCreate} name = {onGetUser.userRol === rol.Docente? "Estudiantes": "Tutores"} selectOpc = {(onGetUser.userRol === rol.Docente? inputValue?.usuarioUnEstudiante: inputValue?.usuarioUnTutor) || ""} />  
                                    </Box>                       
                                    <Box
                                    sx={{
                                        display: "flex",
                                        alignContent: "end",
                                    }}>
                                        <SelectLabels options={typePlace} handle = {handleOnChangeCreate} name={"Lugar"} selectOpc = {inputValue?.listaTutoria[0].lugar || ""}/>                         
                                    </Box>
                                </Box>
                                <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignContent: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                }}>
                                    <Box
                                    sx={{
                                        display: "flex",
                                        alignContent: "start",
                                        // backgroundColor: "#000",
                                    }}>
                                        <SelectLabels options={typeState} handle = {handleOnChangeCreate} name = {"Estado"} selectOpc = {inputValue?.listaTutoria[0].estado || ""}/>                         
                                    </Box>
                                    <Box
                                    className = "BxTextField2"
                                    sx={{
                                        display: "flex",
                                        alignContent: "end",
                                        marginLeft: "10px",
                                    }}>
                                        <BasicDatePicker handle  = {handleOnChangeCreate} dateDefault = {dayjs(myAction === myActions.Create? new Date(): inputValue?.listaTutoria[0].fecha)}/>                            
                                    </Box>
                                </Box>
                                <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                }}>
                                    <Box
                                    className = "BxTextField3"
                                    sx={{
                                        display: "flex",
                                        alignContent: "start"
                                    }}>
                                        <TextField 
                                            sx={{ m: 1, minWidth: 255 }}
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
                                        alignContent: "end",
                                    }}>
                                        <TextField 
                                            sx={{ m: 1, minWidth: 255 }}
                                            id="acuerdoCreate"
                                            label="Acuerdo" 
                                            variant="outlined"
                                            name="acuerdo"
                                            value={inputValue?.listaTutoria[0].acuerdo}
                                            onChange={handleChangeAssing}
                                        />
                                    </Box>
                                </Box>   
                                <Box
                                className = "BxTextField5"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                }}>
                                    <TextField 
                                        sx={{ m: 1, minWidth: 530, marginLeft: "20px", }}
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
