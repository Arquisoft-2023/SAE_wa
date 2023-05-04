import TutoriasRouter from "../pages/tutorial/TutorialPage"
import {Routes,Route} from "react-router-dom"
import Homepage from "../pages/HomePage"
import React from 'react'

const AllRoutes = () => {

  return (

    <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/tutorias" element={<TutoriasRouter/>}/>
    </Routes>

  )
}

export default AllRoutes;