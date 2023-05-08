import {Routes,Route} from "react-router-dom"
import React from 'react'

// TUTORIAS
import CreateTutorial from "../pages/tutorial/CreateTutorialPage"
import UpdateTutorial from "../pages/tutorial/UpdateTutorialPage"
import ManageTutorP from "../pages/tutorial/ManageTutorPage"
import CreateObs from "../pages/tutorial/CreateObsPage"
import ListObs from "../pages/tutorial/ListObsPage"
//

import Homepage from "../pages/HomePage"

const AllRoutes = () => {

  return (

    <Routes>
        <Route path="/" element={<Homepage/>}/>
        
        {/* TUTORIAS */}
        <Route path="/tutorias/tutor" element={<ManageTutorP onGetRol = {"rol"}/>}/>

        <Route path="/tutorias/solicitar" element={<CreateTutorial/>}/>
        <Route path="/tutorias/modificar" element={<UpdateTutorial/>}/>

        <Route path="/observaciones/crear" element={<CreateObs/>}/>
        <Route path="/observaciones/ver" element={<ListObs/>}/>
        {/* * */}
        
    </Routes>

  )
}

export default AllRoutes;