import { RemisionQueries } from "../queries/RemisionQueries"
import { AJAXRequest } from "../utils/AJAXRequest"

export const RemisionAJAXRequest = {
    remisionUsuarioUn: async (usuarioUn) => {
        const { data } = await AJAXRequest ({
            query:
                RemisionQueries.remisionUsuarioUn,
            variables: {
                usuarioUn: usuarioUn
            }
        });
        return data.data.obtenerRemisionesUnUsuario;
    },
}