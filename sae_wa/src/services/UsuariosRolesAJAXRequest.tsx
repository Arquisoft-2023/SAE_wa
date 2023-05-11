import { UsuariosRolesQueries } from "../queries/UsuariosRolesQueries";
import { AJAXRequest } from "../utils/AJAXRequest"
const URI = 'gestionUsuarios/usuarios';

export const UsuariosRolesAJAXRequest = {
    obtenerUsuariosRoles: async () => {
        const { data } = await AJAXRequest (URI,{
            query:
                UsuariosRolesQueries.UsuariosRolesObtencion,
        });
        return data.data.leerUsuariosRoles;
    },
    crearUsuarioRol: async (item) => {
        const { data } = await AJAXRequest (URI,{
            query:
                UsuariosRolesQueries.UsuariosRolesCreacion,
            variables: {
                rolABuscarId: item.rolABuscarId,
                usuarioUnABuscar: item.usuarioUnABuscar
            }
        });
        console.log(data);
        return data.data.asignarRolAUsuario;
    },
    eliminarUsuarioRol: async (item) => {
        const { data } = await AJAXRequest (URI,{
            query:
                UsuariosRolesQueries.UsuariosRolesEliminacion,
            variables: {
                usuarioUnAEliminar: item.usuarioUnAEliminar
            }
        });
        console.log(data);
        return data.data.eliminarUsuarioYRol;
    },
    modificarRol: async (item) => {
        const { data } = await AJAXRequest (URI,{
            query:
                UsuariosRolesQueries.UsuariosRolesActualizacion,
            variables: {
                rolNuevoId: item.rolNuevoId,
                usuarioUnABuscar: item.usuarioUnABuscar
            }
        });
        console.log(data);
        return data.data.modificarUsuarioYRol;
    }
}
 