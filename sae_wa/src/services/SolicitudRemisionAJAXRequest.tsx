import { SolicitudRemisionQueries } from "../queries/SolicitudRemisionQueries"
import { AJAXRequest } from "../utils/AJAXRequest"

const URI = "remisiones/remisiones"

export const SolicitudRemisionAJAXRequest = {
    solicitudesRemision: async () => {
        const { data } = await AJAXRequest (URI,{
            query:
                SolicitudRemisionQueries.solicitudesRemision
        });
        return data.data.obtenerSolicitudesremision;
    },
    generarRemision: async (item) => {
        const { data } = await AJAXRequest (URI,{
            query:
                SolicitudRemisionQueries.generarSolicitud,
            variables: {
                item: item
            }
        });
        return data.data.generarSolicitud;
    },
    eliminarRemision: async (id) => {
        const { data } = await AJAXRequest (URI,{
            query:
                SolicitudRemisionQueries.eliminarSolicitud,
            variables: {
                id: id
            }
        });
        return data.data.generarSolicitud;
    },

}