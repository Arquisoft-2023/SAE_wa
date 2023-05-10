import { acompanyamiento } from '../../types/tutorial/Acompanyamiento.interface'
import { tutorialQuery, tutorialMutation } from "../../queries/tutorial/TutorialQueries"
import { AJAXRequest } from "../../utils/AJAXRequest"

const URI = "tutorias/"

export const TutorialService = {
    // Query
    GetTutorialEstudentService: async (item: string) => {
        const response = await AJAXRequest (
            URI+"acompanyamiento"
            ,{
            query: 
                tutorialQuery.obtenerAcompanyamientoEstudiante,
            variables: {
                usuarioUnEstudiante : item,
            }
        }).catch((error: any) => {
            console.log(error);
        });
        return response;
    },
    GetTutorialTutorService: async (item: string) => {
        const response = await AJAXRequest (
            URI+"acompanyamiento"
            ,{
            query: 
                tutorialQuery.obtenerAcompanyamientoTutor,
            variables: {
                usuarioUnTutor : item,
            }
        }).catch((error: any) => {
            console.log(error);
        });
        return response;
    },
    // Mutation
    CreateTutorialService: async (item: acompanyamiento) => {
        const response = await AJAXRequest (
            URI+"tutoria"
            ,{
            query: 
                tutorialMutation.createTutorial,
            variables: {
                item : item,
            }
        }).catch((error: any) => {
            console.log(error);
        });
        return response;
    },
    ModTutorialService: async (item: acompanyamiento) => {
        const response = await AJAXRequest (
            URI+"tutoria"
            ,{
            query: 
                tutorialMutation.ModTutorial,
            variables: {
                item : item,
            }
        }).catch((error: any) => {
            console.log(error);
        });
        return response;
    }
}