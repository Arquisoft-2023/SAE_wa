import Homepage from "../pages/HomePage";
import ManageObsP from "../pages/tutorial/ManageObsPage";
import ManageTutorP from "../pages/tutorial/ManageTutorPage";
import ManageTutorialP from "../pages/tutorial/ManageTutorialPage";
import PrimeraEscucha from "../pages/remisiones/PrimeraEscucha";
import React from "react";
import Remision from "../pages/remisiones/Remision";
import Roles from "../pages/Roles";
import SeeTutorialP from "../pages/tutorial/SeeTutorialPage";
import SolicitudRemision from "../pages/remisiones/SolicitudRemision";
import TipoRemision from "../pages/remisiones/TipoRemision";
import Usuarios from "../pages/Usuarios";
import UsuariosRoles from "../pages/UsuariosRoles";
import { Route, Routes } from "react-router-dom";
import { rol } from "../types/tutorial/Acompanyamiento.interface";

// TODO: Modify to use global state role of the logged user
const UserTestDocente = { userEmail: "osman", userRol: rol.Docente };
const UserTestStudent = { userEmail: "sebastian", userRol: rol.Estudiante };
const UserTestBienestar = { userEmail: "sebastian", userRol: rol.Bienestar };
const userTest = UserTestStudent;
//

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/tipo_remision" element={<TipoRemision />} />
      <Route path="/solicitud_remision" element={<SolicitudRemision />} />
      <Route path="/primera_escucha" element={<PrimeraEscucha />} />
      <Route path="/remision" element={<Remision />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/usuarios_roles" element={<UsuariosRoles />} />
      <Route
        path="/tutorias/tutor"
        element={<ManageTutorP onGetUser={userTest} />}
      />
      <Route
        path="/tutorias/tutorias"
        element={<ManageTutorialP onGetUser={userTest} />}
      />
      <Route
        path="/tutorias/ver"
        element={<SeeTutorialP onGetUser={userTest} />}
      />
      <Route
        path="/observaciones/obs"
        element={<ManageObsP onGetUser={userTest} />}
      />
    </Routes>
  );
};

export default MyRoutes;
