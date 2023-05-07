import { acompanyamientoQuery, acompanyamientoMutation } from "../../queries/tutorial/AcompanyamientoQueries"
import { acompanyamiento } from '../../types/tutorial/Acompanyamiento.interface'
import { AJAXRequest } from "../../utils/AJAXRequest"

const URI = "tutorias/acompanyamiento"

export const acompanyamientoService = {
    // Query
    GetTutorService: async (item: acompanyamiento) => {
        const { data } = await AJAXRequest (
            URI
            ,{
            query: 
                acompanyamientoQuery.obtenerTutor,
            variables: {
                usuario_un_estudiante : item.usuario_un_estudiante,
            }
        }).catch((error: any) => {
            console.log(error);
        });
        return data.data.obtenerTutor;
    },
    ListAcompanyamientoService: async () => {
        const { data } = await AJAXRequest (
            URI
            ,{
            query: 
                acompanyamientoQuery.obtenerAcompanyamiento,
        }).catch((error: any) => {
            console.log(error);
        });
        return data.data.obtenerAcompanyamiento;
    },
    ListAcompanyamientoShortService: async () => {
        const { data } = await AJAXRequest (
            URI
            ,{
            query: 
                acompanyamientoQuery.obtenerAcompanyamientoShort,
        }).catch((error: any) => {
            console.log(error);
        });
        return data.data.obtenerAcompanyamiento;
    },

    // Mutation
    assingTutorService: async (item: acompanyamiento) => {
        const { data } = await AJAXRequest (
            URI
            ,{
            query: 
                acompanyamientoMutation.assingTutor,
            variables: {
                usuario_un_estudiante : item.usuario_un_estudiante,
                usuario_un_tutor : item.usuario_un_tutor
            }
        }).catch((error: any) => {
            console.log(error);
        });
        return data.data.asignarTutor;
    },
    UpdateTutorService: async (item: acompanyamiento) => {
        const { data } = await AJAXRequest (
            URI
            ,{
            query: 
                acompanyamientoMutation.actualizarTutor,
            variables: {
                usuario_un_estudiante : item.usuario_un_estudiante,
                usuario_un_tutor : item.usuario_un_tutor
            }
        }).catch((error: any) => {
            console.log(error);
        });
        return data.data.actualizarTutor;
    },
} 