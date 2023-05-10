import {Routes,Route} from "react-router-dom"
import React from 'react'

// TUTORIAS
import { rol } from '../types/tutorial/Acompanyamiento.interface'
import ManageTutorP from "../pages/tutorial/ManageTutorPage"
import ManageObsP from "../pages/tutorial/ManageObsPage"
import ManageTutorialP from "../pages/tutorial/ManageTutorialPage"

const UserTestDocente = {userEmail: "osman", userRol: rol.Docente}
const UserTestStudent = {userEmail: "sebastian", userRol: rol.Estudiante}
//

import Homepage from "../pages/HomePage"

const AllRoutes = () => {

  return (

    <Routes>
        <Route path="/" element={<Homepage/>}/>
        
        {/* TUTORIAS */}
        <Route path="/tutorias/tutor" element={<ManageTutorP onGetRol = {"rol"}/>}/>

        <Route path="/tutorias/tutorias" element={<ManageTutorialP onGetUser = {UserTestDocente}/>}/>

        <Route path="/observaciones/obs" element={<ManageObsP onGetUser = {UserTestDocente}/>}/>
        {/* * */}
        
    </Routes>

  )
}

export default AllRoutes;