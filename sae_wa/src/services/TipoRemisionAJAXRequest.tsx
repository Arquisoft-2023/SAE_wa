import { TipoRemisionQueries } from "../queries/TipoRemisionQueries"
import { AJAXRequest } from "../utils/AJAXRequest"

export const TipoRemisionAJAXRequest = {
    tiposRemision: async () => {
        const { data } = await AJAXRequest ({
            query:
                TipoRemisionQueries.tiposRemision
        });
        return data.data.obtenerTiposremision;
    },
    crearTipoRemision: async (item) => {
        const { data } = await AJAXRequest ({
            query:
                TipoRemisionQueries.crearTipoRemision,
            variables: {
                item: item
            }
        });
        return data.data.crearTipoRemision;
    }
}

