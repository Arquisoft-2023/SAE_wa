import React from 'react'
import  {Routes,Route} from "react-router-dom"
import Homepage from "../pages/HomePage"
import Remisiones from "../pages/Remisiones";

const MyRoutes = () => {
  return (

    <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/remisiones" element={<Remisiones/>}/>
    </Routes>

  )
}

export default MyRoutes;