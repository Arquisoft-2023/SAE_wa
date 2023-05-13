import { TipoRemisionQueries } from "../queries/TipoRemisionQueries"
import { AJAXRequest } from "../utils/AJAXRequest"

const URI = "remisiones/remisiones"

export const TipoRemisionAJAXRequest = {
    tiposRemision: async () => {
        const { data } = await AJAXRequest (URI,{
            query:
                TipoRemisionQueries.tiposRemision,
        });
        console.log(data.data.obtenerTiposremision);
        return data.data.obtenerTiposremision;
    },
    crearTipoRemision: async (item) => {
        const { data } = await AJAXRequest (URI,{
            query:
                TipoRemisionQueries.crearTipoRemision,
            variables: {
                item: item
            }
        });
        return data.data.crearTipoRemision;
    }
}

