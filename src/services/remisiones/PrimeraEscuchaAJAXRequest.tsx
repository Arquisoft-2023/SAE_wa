import { PrimeraEscuchaQueries } from "../../queries/remisiones/PrimeraEscuchaQueries"
import { AJAXRequest } from "../../utils/AJAXRequest"

const URI = "remisiones/remisiones"

export const PrimeraEscuchaAJAXRequest = {
    primerasEscuchas: async () => {
        const { data } = await AJAXRequest (URI,{
            query:
                PrimeraEscuchaQueries.primeraEscucha
        });
        return data.data.obtenerPrimerasescuchas
    },
    editarPrimeraEscucha: async (id,item) => {
        const { data } = await AJAXRequest (URI,{
            query:
                PrimeraEscuchaQueries.editarPrimeraEscucha,
            variables: {
                id: id,
                item: item
            }
        });
        return data.data.modificarPrimeraEscucha;
    },
}