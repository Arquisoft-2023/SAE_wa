import React from 'react'
import {Routes,Route} from "react-router-dom"
import Homepage from "../pages/HomePage"
import Remision from "../pages/Remision";
import TipoRemision from '../pages/TipoRemision';
import PrimeraEscucha from '../pages/PrimeraEscucha';
import SolicitudRemision from '../pages/SolicitudRemision';

const MyRoutes = () => {

  return (

    <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/tipo_remision" element={<TipoRemision/>}/>
        <Route path="/solicitud_remision" element={<SolicitudRemision/>}/>
        <Route path="/primera_escucha" element={<PrimeraEscucha/>}/>
        <Route path="/remision" element={<Remision/>}/>
    </Routes>

  )
}

export default MyRoutes;