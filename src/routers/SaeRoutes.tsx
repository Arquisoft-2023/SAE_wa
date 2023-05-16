import HomePage from "../pages/HomePage";
import ManageObsP from "../pages/tutorial/ManageObsPage";
import ManageTutorP from "../pages/tutorial/ManageTutorPage";
import ManageTutorialP from "../pages/tutorial/ManageTutorialPage";
import NotFound from "../pages/notfound/NotFound";
import PrimeraEscucha from "../pages/remisiones/PrimeraEscucha";
import PrivateRoute from "../components/PrivateRoute";
import Remision from "../pages/remisiones/Remision";
import Roles from "../pages/gestionUsuarios/Roles";
import SeeTutorialP from "../pages/tutorial/SeeTutorialPage";
import SideBarContainer from "../components/SideBarContainer";
import SigninPage from "../pages/signin/SigninPage";
import SolicitudRemision from "../pages/remisiones/SolicitudRemision";
import TipoRemision from "../pages/remisiones/TipoRemision";
import Usuarios from "../pages/gestionUsuarios/Usuarios";
import UsuariosRoles from "../pages/gestionUsuarios/UsuariosRoles";
import { Navigate, Route, Routes } from "react-router-dom";
import { userStore } from "../state/zustand";
import { rol } from "../types/tutorial/Acompanyamiento.interface";

// const UserTestDocente = { userEmail: "osman", userRol: rol.Docente };
// const UserTestStudent = { userEmail: "sebastian", userRol: rol.Estudiante };
// const UserTestBienestar = { userEmail: "sebastian", userRol: rol.Bienestar };
// const userTest = UserTestStudent;

const SaeRoutes = () => {
  const { usuarioUn, usuarioRol } = userStore();
  const usuarioRolModified = usuarioUn
    ? usuarioRol.charAt(0).toUpperCase() + usuarioRol.slice(1)
    : null;

  const objectTutorias = {
    userEmail: usuarioUn,
    userRol: rol[usuarioRolModified]
  };

  return (
    <Routes>
      <Route
        path="/signin"
        element={usuarioUn != null ? <Navigate to="/home" /> : <SigninPage />}
      />
      <Route
        path="/home"
        element={
          <PrivateRoute isSignedIn={usuarioUn} type={"home"}>
            <SideBarContainer main={<HomePage />} role={usuarioRol} />
          </PrivateRoute>
        }
      />
      <Route
        path="/tipo_remision"
        element={
          <PrivateRoute
            isSignedIn={usuarioUn}
            type={["remision", "tipoRemision"]}
          >
            <SideBarContainer main={<TipoRemision />} role={usuarioRol} />
          </PrivateRoute>
        }
      />
      <Route
        path="/solicitud_remision"
        element={
          <PrivateRoute
            isSignedIn={usuarioUn}
            type={["remision", "solicitudRemision"]}
          >
            <SideBarContainer main={<SolicitudRemision />} role={usuarioRol} />
          </PrivateRoute>
        }
      />
      <Route
        path="/primera_escucha"
        element={
          <PrivateRoute
            isSignedIn={usuarioUn}
            type={["remision", "primeraEscucha"]}
          >
            <SideBarContainer main={<PrimeraEscucha />} role={usuarioRol} />
          </PrivateRoute>
        }
      />
      <Route
        path="/remision"
        element={
          <PrivateRoute isSignedIn={usuarioUn} type={["remision"]}>
            <SideBarContainer main={<Remision />} role={usuarioRol} />
          </PrivateRoute>
        }
      />
      <Route
        path="/usuarios"
        element={
          <PrivateRoute
            isSignedIn={usuarioUn}
            type={["gestionUsuario", "usuarios"]}
          >
            <SideBarContainer main={<Usuarios />} role={usuarioRol} />
          </PrivateRoute>
        }
      />
      <Route
        path="/roles"
        element={
          <PrivateRoute
            isSignedIn={usuarioUn}
            type={["gestionUsuario", "roles"]}
          >
            <SideBarContainer main={<Roles />} role={usuarioRol} />
          </PrivateRoute>
        }
      />
      <Route
        path="/usuarios_roles"
        element={
          <PrivateRoute
            isSignedIn={usuarioUn}
            type={["gestionUsuario", "usuariosRoles"]}
          >
            <SideBarContainer main={<UsuariosRoles />} role={usuarioRol} />
          </PrivateRoute>
        }
      />
      <Route
        path="/tutorias/tutor"
        element={
          <PrivateRoute
            isSignedIn={usuarioUn}
            type={["tutorias", "gestionarTutor"]}
          >
            <SideBarContainer
              main={<ManageTutorP onGetUser={objectTutorias} />}
              role={usuarioRol}
            />
          </PrivateRoute>
        }
      />
      <Route
        path="/tutorias/tutorias"
        element={
          <PrivateRoute
            isSignedIn={usuarioUn}
            type={["tutorias", "gestionarTutorias"]}
          >
            <SideBarContainer
              main={<ManageTutorialP onGetUser={objectTutorias} />}
              role={usuarioRol}
            />
          </PrivateRoute>
        }
      />
      <Route
        path="/tutorias/ver"
        element={
          <PrivateRoute
            isSignedIn={usuarioUn}
            type={["tutorias", "verTutorias"]}
          >
            <SideBarContainer
              main={<SeeTutorialP onGetUser={objectTutorias} />}
              role={usuarioRol}
            />
          </PrivateRoute>
        }
      />
      <Route
        path="/observaciones/obs"
        element={
          <PrivateRoute isSignedIn={usuarioUn} type={["observaciones"]}>
            <SideBarContainer
              main={<ManageObsP onGetUser={objectTutorias} />}
              role={usuarioRol}
            />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default SaeRoutes;
