import {Routes,Route} from "react-router-dom"
import React from 'react'

import CreateTutorial from "../pages/tutorial/CreateTutorialPage"
import UpdateTutorial from "../pages/tutorial/UpdateTutorialPage"
import ListTutotial from "../pages/tutorial/ListTutorialPage"
import AssignTutor from "../pages/tutorial/AssignTutorPage"
import UpdateTutor from "../pages/tutorial/UpdateTutorPage"
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
        <Route path="/tutorias/ver" element={<ListTutotial/>}/>

        <Route path="/tutorias/actualizar" element={<UpdateTutor/>}/>
        <Route path="/tutorias/asignar" element={<AssignTutor/>}/>

        <Route path="/observaciones/crear" element={<CreateObs/>}/>
        <Route path="/observaciones/ver" element={<ListObs/>}/>
        {/* * */}
    </Routes>

  )
}

export default AllRoutes;