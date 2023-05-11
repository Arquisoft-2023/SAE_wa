import { RolesQueries } from "../queries/RolesQueries";
import { AJAXRequest } from "../utils/AJAXRequest"
const URI = 'gestionUsuarios/usuarios';

export const RolesAJAXRequest = {
    obtenerRoles: async () => {
        const { data } = await AJAXRequest (URI,{
            query:
                RolesQueries.rolesObtencion
        });
        return data.data.leerRoles;
    },
    crearRol: async (item) => {
        const { data } = await AJAXRequest (URI,{
            query:
                RolesQueries.rolesCreacion,
            variables: {
                item: item
            }
        });
        console.log(data);
        return data.data.ingresarRol;
    },
    eliminarRol: async (item) => {
        const { data } = await AJAXRequest (URI,{
            query:
                RolesQueries.rolesEliminacion,
            variables: {
                rolABuscarId: item
            }
        });
        console.log(data);
        return data.data.eliminarRol;
    },
    modificarRol: async (item) => {
        const { data } = await AJAXRequest (URI,{
            query:
                RolesQueries.rolesActualizacion,
            variables: {
                rolABuscarId: item.rolABuscarId,
                rolNuevo: item.rolNuevo
            }
        });
        console.log(data);
        return data.data.modificarRol;
    }
}
 
