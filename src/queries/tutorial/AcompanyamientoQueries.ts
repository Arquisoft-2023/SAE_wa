// import { acompanyamiento } from '../types/tutorial/Acompanyamiento.interface'

export const acompanyamientoQuery  = {
    obtenerTutor: `
        query ($usuario_un_estudiante: String!) {
            obtenerTutor(usuarioUnEstudiante: $usuario_un_estudiante)
        }
    `,
    obtenerAcompanyamiento: `
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
    `,
    obtenerAcompanyamientoShort: `
        query {
            obtenerAcompanyamiento {
                usuarioUnTutor
                esTutor
                usuarioUnEstudiante
            }
        }
    `,
}

export const acompanyamientoMutation  = {
    assingTutor: `
        mutation ($usuario_un_estudiante: String!, $usuario_un_tutor: String!) {
            asignarTutor(item: {usuarioUnEstudiante: $usuario_un_estudiante, usuarioUnTutor: $usuario_un_tutor}) {
                usuarioUnEstudiante
                usuarioUnTutor
                }
        }
    `,
    actualizarTutor: `
        mutation ($usuario_un_estudiante: String!, $usuario_un_tutor: String!) {
            actualizarTutor(item: {usuarioUnEstudiante: $usuario_un_estudiante, usuarioUnTutor: $usuario_un_tutor})
        }
    `,   
}