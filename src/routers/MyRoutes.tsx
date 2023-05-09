import {Routes,Route} from "react-router-dom"
import React from 'react'

// TUTORIAS
import ManageTutorP from "../pages/tutorial/ManageTutorPage"
import ManageObsP from "../pages/tutorial/ManageObsPage"
import ManageTutorialP from "../pages/tutorial/ManageTutorialPage"
//

import Homepage from "../pages/HomePage"

const AllRoutes = () => {

  return (

    <Routes>
        <Route path="/" element={<Homepage/>}/>
        
        {/* TUTORIAS */}
        <Route path="/tutorias/tutor" element={<ManageTutorP onGetRol = {"rol"}/>}/>

        <Route path="/tutorias/tutorias" element={<ManageTutorialP onGetUser = {{userEmail: "osman", userRol: "estudiante"}}/>}/>

        <Route path="/observaciones/obs" element={<ManageObsP/>}/>
        {/* * */}
        
    </Routes>

  )
}

export default AllRoutes;