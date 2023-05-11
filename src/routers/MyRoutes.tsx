import {Routes,Route} from "react-router-dom"
import React from 'react'

// TUTORIAS
import { rol } from '../types/tutorial/Acompanyamiento.interface'
import ManageTutorP from "../pages/tutorial/ManageTutorPage"
import SeeTutorialP from "../pages/tutorial/SeeTutorialPage"
import ManageObsP from "../pages/tutorial/ManageObsPage"
import ManageTutorialP from "../pages/tutorial/ManageTutorialPage"

const UserTestDocente = {userEmail: "osman", userRol: rol.Docente}
const UserTestStudent = {userEmail: "sebastian", userRol: rol.Estudiante}
const UserTestBienestar = {userEmail: "sebastian", userRol: rol.Bienestar}
const userTest = UserTestDocente
//

import Homepage from "../pages/HomePage"

const AllRoutes = () => {

  return (

    <Routes>
        <Route path="/" element={<Homepage/>}/>
        
        {/* TUTORIAS */}
        <Route path="/tutorias/tutor" element={<ManageTutorP onGetUser = {userTest}/>}/>

        <Route path="/tutorias/tutorias" element={<ManageTutorialP onGetUser = {userTest}/>}/>
        <Route path="/tutorias/ver" element={<SeeTutorialP onGetUser = {userTest}/>}/>

        <Route path="/observaciones/obs" element={<ManageObsP onGetUser = {userTest}/>}/>
        {/* * */}
        
    </Routes>

  )
}

export default AllRoutes;