import { acompanyamiento } from "../../types/tutorial/Acompanyamiento.interface";
import { AJAXRequest } from "../../utils/AJAXRequest";

import {
  acompanyamientoQuery,
  acompanyamientoMutation
} from "../../queries/tutorial/AcompanyamientoQueries";

const URI = "tutorias/acompanyamiento";

export const acompanyamientoService = {
  // Query
  GetTutorService: async (item: String) => {
    const response = await AJAXRequest(URI, {
      query: acompanyamientoQuery.obtenerTutor,
      variables: {
        usuarioUnEstudiante: item
      }
    }).catch((error: any) => {
      console.log(error);
    });
    return response;
  },
  ListAcompanyamientoService: async () => {
    const response = await AJAXRequest(URI, {
      query: acompanyamientoQuery.obtenerAcompanyamiento
    }).catch((error: any) => {
      console.log(error);
    });
    return response;
  },
  ListAcompanyamientoShortService: async () => {
    const response = await AJAXRequest(URI, {
      query: acompanyamientoQuery.obtenerAcompanyamientoShort
    }).catch((error: any) => {
      console.log(error);
    });
    return response;
  },

  // Mutation
  assingTutorService: async (item: acompanyamiento) => {
    const response = await AJAXRequest(URI, {
      query: acompanyamientoMutation.assingTutor,
      variables: {
        usuarioUnEstudiante: item.usuarioUnEstudiante,
        usuarioUnTutor: item.usuarioUnTutor
      }
    }).catch((error: any) => {
      console.log(error);
    });
    return response;
  },
  UpdateTutorService: async (item: acompanyamiento) => {
    const response = await AJAXRequest(URI, {
      query: acompanyamientoMutation.actualizarTutor,
      variables: {
        usuarioUnEstudiante: item.usuarioUnEstudiante,
        usuarioUnTutor: item.usuarioUnTutor
      }
    }).catch((error: any) => {
      console.log(error);
    });
    return response;
  }
};
