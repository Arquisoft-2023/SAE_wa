import config from '../env'
import Axios from 'axios'

import { acompanyamiento } from './types/tutorial/Acompanyamiento.interface'

const PORT = config['REACT_APP_API_PORT']
const URI = config['REACT_APP_API_URL']
const API_URL = `${URI}:${PORT}/tutorias`

class tutorialService{
    assingTutorService = async (item: acompanyamiento): Promise<any> =>{
        const mutation = {
            headers: {
                contentType: "application/json"
            },
            query:  
            `
            mutation {
                asignarTutor(item: {usuarioUnEstudiante: "${item.usuario_un_estudiante}", usuarioUnTutor: "${item.usuario_un_tutor}"}) {
                  usuarioUnEstudiante
                  usuarioUnTutor
                }
              }
            `
        }    
        const response = await Axios.post(`${API_URL}/acompanyamiento`, mutation ).then((response) => { return (response.data.data.asignarTutor) }).catch((error) => {
            console.log(error);
          });
        
        return response;
    };

    UpdateTutorService = async (item: acompanyamiento): Promise<any> =>{
      const mutation = {
          headers: {
              contentType: "application/json"
          },
          query:  
          `
          mutation {
            actualizarTutor(item: {usuarioUnEstudiante: "${item.usuario_un_estudiante}", usuarioUnTutor: "${item.usuario_un_tutor}"})
          }
          `
      }    
      const response = await Axios.post(`${API_URL}/acompanyamiento`, mutation ).then((response) => { return (response.data.data.actualizarTutor) }).catch((error) => {
          console.log(error);
        });
      
      return response;
  };

  ListTutorialService = async (): Promise<any> =>{
      const query = {
          headers: {
              contentType: "application/json"
          },
          query:  
          `
          query {
            obtenerAcompanyamiento {
              usuarioUnEstudiante
              usuarioUnTutor
              esTutor
              Id
              listaObservacion {
                Id
                descripcion
                fecha
              }
              listaTutoria {
                Id
                acuerdo
                estado
                fecha
                lugar
                objetivo
                observacionesEstudiante
                observacionesTutor
              }
            }
          }
          `
      }    
      const response = await Axios.post(`${API_URL}/acompanyamiento`, query ).then((response) => { return (response.data.data.obtenerAcompanyamiento) }).catch((error) => {
          console.log(error);
        });
      
      return response;
  };

  ListTutorialShortService= async (): Promise<any> =>{
    const query = {
        headers: {
            contentType: "application/json"
        },
        query:  
        `
        query {
          obtenerAcompanyamiento {
            usuarioUnTutor
            esTutor
            usuarioUnEstudiante
          }
        }
        `
    }    
    const response = await Axios.post(`${API_URL}/acompanyamiento`, query ).then((response) => { return (response.data.data.obtenerAcompanyamiento) }).catch((error) => {
        console.log(error);
      });
    
    return response;
};

}

export default new tutorialService();