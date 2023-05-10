import { acompanyamiento } from '../../types/tutorial/Acompanyamiento.interface'
import { obsQuery, obsMutation } from "../../queries/tutorial/ObsQueries"
import { AJAXRequest } from "../../utils/AJAXRequest"

const URI = "tutorias/"

export const ObsService = {
    // Query
    GetObsEstudentService: async (item: string) => {
        const response = await AJAXRequest (
            URI+"acompanyamiento"
            ,{
            query: 
                obsQuery.obtenerAcompanyamientoEstudiante,
            variables: {
                usuarioUnEstudiante : item,
            }
        }).catch((error: any) => {
            console.log(error);
        });
        return response;
    },
    GetObsTutorService: async (item: string) => {
        const response = await AJAXRequest (
            URI+"acompanyamiento"
            ,{
            query: 
                obsQuery.obtenerAcompanyamientoTutor,
            variables: {
                usuarioUnTutor : item,
            }
        }).catch((error: any) => {
            console.log(error);
        });
        return response;
    },
    // Mutation
    CreateObsService: async (item: acompanyamiento) => {
        const response = await AJAXRequest (
            URI+"observacion"
            ,{
            query: 
                obsMutation.createObs,
            variables: {
                item : item,
            }
        }).catch((error: any) => {
            console.log(error);
        });
        return response;
    },
}