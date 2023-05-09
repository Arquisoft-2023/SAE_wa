import { RemisionQueries } from "../queries/RemisionQueries"
import { AJAXRequest } from "../utils/AJAXRequest"

const URI = "remisiones/remisiones"

export const RemisionAJAXRequest = {
    remisionUsuarioUn: async (usuarioUn) => {
        const { data } = await AJAXRequest (URI,{
            query:
                RemisionQueries.remisionUsuarioUn,
            variables: {
                usuarioUn: usuarioUn
            }
        });
        return data.data.obtenerRemisionesUnUsuario;
    },
    remisiones: async () => {
        const { data } = await AJAXRequest (URI,{
            query:
                RemisionQueries.remisiones
        });
        return data.data.obtenerRemisiones
    },
    remisionesEfectivas : async () => {
        const { data } = await AJAXRequest (URI, {
            query:
                RemisionQueries.remisionesEfectivas
        });
        return data.data.obtenerRemisionesEfectivas
    },
    generarRemision : async (item) => {
        const { data } = await AJAXRequest (URI, {
            query:
                RemisionQueries.crearRemision,
            variables: {
                item: item
            }
        });
    }
}