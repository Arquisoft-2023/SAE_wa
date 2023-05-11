import { UsuarioQueries } from "../queries/UsuariosQueries";
import { AJAXRequest } from "../utils/AJAXRequest"
const URI = 'gestionUsuarios/usuarios';

export const UsuariosAJAXRequest = {
    obtenerUsuarios: async () => {
        const { data } = await AJAXRequest (URI,{
            query:
                UsuarioQueries.usuariosObtencion
        });
        return data.data.leerUsuarios;
    },
    crearUsuario: async (item) => {
        const { data } = await AJAXRequest (URI,{
            query:
                UsuarioQueries.usuariosCreacion,
            variables: {
                usuarioUn: item.usuarioUn,
                estado: item.estado,
                nombres: item.nombres,
                apellidos: item.apellidos,
                documento: item.documento,
                tipoDocumento: item.tipoDocumento
            }
        });
        return data.data.ingresarUsuario;
    },
    eliminarUsuario: async (item) => {
        const { data } = await AJAXRequest (URI,{
            query:
                UsuarioQueries.usuariosEliminacion,
            variables: {
                usuarioUnABuscar: item.usuarioUn
            }
        });
        return data.data.eliminarUsuario;
    },
    modificarUsuario: async (item) => {
        const { data } = await AJAXRequest (URI,{
            query:
                UsuarioQueries.usuariosModificar,
            variables: {
                usuarioUnABuscar: item.usuarioUn,
                estadoNuevo: item.estado,
                nombresNuevo: item.nombres,
                apellidosNuevo: item.apellidos,
                documentoNuevo: item.documento,
                tipoDocumentoNuevo: item.tipoDocumento
            }
        });
        return data.data.modificarUsuario;
    }
}

