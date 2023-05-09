import { PrimeraEscuchaQueries } from "../queries/PrimeraEscuchaQueries"
import { AJAXRequest } from "../utils/AJAXRequest"

const URI = "remisiones/remisiones"

export const PrimeraEscuchaAJAXRequest = {
    primerasEscuchas: async () => {
        const { data } = await AJAXRequest (URI,{
            query:
                PrimeraEscuchaQueries.primeraEscucha
        });
        return data.data.obtenerPrimerasescuchas
    }
}