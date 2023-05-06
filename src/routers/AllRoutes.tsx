import {Routes,Route} from "react-router-dom"
import React from 'react'

import CreateTutorial from "../pages/tutorial/CreateTutorialPage"
import UpdateTutorial from "../pages/tutorial/UpdateTutorialPage"
import ListTutorialP from "../pages/tutorial/ListTutorialPage"
import AssignTutorP from "../pages/tutorial/AssignTutorPage"
import UpdateTutorP from "../pages/tutorial/UpdateTutorPage"
import CreateObs from "../pages/tutorial/CreateObsPage"
import ListObs from "../pages/tutorial/ListObsPage"
import Homepage from "../pages/HomePage"

const AllRoutes = () => {

  return (

    <Routes>
        <Route path="/" element={<Homepage/>}/>
        
        {/* TUTORIAS */}
        <Route path="/tutorias/solicitar" element={<CreateTutorial/>}/>
        <Route path="/tutorias/modificar" element={<UpdateTutorial/>}/>
        <Route path="/tutorias/ver" element={<ListTutorialP/>}/>

        <Route path="/tutorias/actualizar" element={<UpdateTutorP/>}/>
        <Route path="/tutorias/asignar" element={<AssignTutorP/>}/>

        <Route path="/observaciones/crear" element={<CreateObs/>}/>
        <Route path="/observaciones/ver" element={<ListObs/>}/>
        {/* * */}
    </Routes>

  )
}

export default AllRoutes;