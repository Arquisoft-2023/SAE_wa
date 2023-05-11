import React from 'react'
import {Routes,Route} from "react-router-dom"
import Homepage from "../pages/HomePage"
import Remision from "../pages/Remision";
import TipoRemision from '../pages/TipoRemision';
import PrimeraEscucha from '../pages/PrimeraEscucha';
import SolicitudRemision from '../pages/SolicitudRemision';
import Usuarios from '../pages/Usuarios';
import Roles from '../pages/Roles';
import UsuariosRoles from '../pages/UsuariosRoles';

const MyRoutes = () => {

  return (

    <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/tipo_remision" element={<TipoRemision/>}/>
        <Route path="/solicitud_remision" element={<SolicitudRemision/>}/>
        <Route path="/primera_escucha" element={<PrimeraEscucha/>}/>
        <Route path="/remision" element={<Remision/>}/>
        <Route path="/usuarios" element={<Usuarios/>}/>
        <Route path="/roles" element={<Roles/>}/>
        <Route path="/usuarios_roles" element={<UsuariosRoles/>}/>
    </Routes>

  )
}

export default MyRoutes;