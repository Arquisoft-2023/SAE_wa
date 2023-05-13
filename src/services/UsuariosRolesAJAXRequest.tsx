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
                usuarioUnAEliminar: item
            }
        });
        console.log(data);
        return data.data.eliminarUsuarioYRol;
    },
    modificarUsuarioRol: async (item1, item2) => {
        const { data } = await AJAXRequest (URI,{
            query:
                UsuariosRolesQueries.UsuariosRolesActualizacion,
            variables: {
                rolNuevoId: item1,
                usuarioUnABuscar: item2
            }
        });
        console.log(data);
        return data.data.modificarUsuarioYRol;
    }
}
 