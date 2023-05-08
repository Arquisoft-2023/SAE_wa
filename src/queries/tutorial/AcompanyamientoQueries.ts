// import { acompanyamiento } from '../types/tutorial/Acompanyamiento.interface'

export const acompanyamientoQuery  = {
    obtenerTutor: `
        query ($usuarioUnEstudiante: String!) {
            obtenerTutor(usuarioUnEstudiante: $usuarioUnEstudiante)
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
        mutation ($usuarioUnEstudiante: String!, $usuarioUnTutor: String!) {
            asignarTutor(item: {usuarioUnEstudiante: $usuarioUnEstudiante, usuarioUnTutor: $usuarioUnTutor}) {
                usuarioUnEstudiante
                usuarioUnTutor
                }
        }
    `,
    actualizarTutor: `
        mutation ($usuarioUnEstudiante: String!, $usuarioUnTutor: String!) {
            actualizarTutor(item: {usuarioUnEstudiante: $usuarioUnEstudiante, usuarioUnTutor: $usuarioUnTutor})
        }
    `,   
}