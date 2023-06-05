import { ConsumoQueries } from "../../queries/tutorial/ConsumoQueries";
import { AJAXRequest } from "../../utils/AJAXRequest";

const URI = "interface/consume/1C";

export const ConsumoAJAXRequest = {
  lugares: async () => {
    const { data } = await AJAXRequest(URI, {
      query: ConsumoQueries.lugares
    });
    return data.data.obtenerLugares1c;
  }
};
