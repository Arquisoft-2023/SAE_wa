export const tutorialQuery  = { 
    obtenerAcompanyamientoEstudiante: `
        query ($usuarioUnEstudiante: String!) {
            obtenerAcompanyamientoEstudiante(usuarioUnEstudiante: $usuarioUnEstudiante) {
                esTutor
                usuarioUnTutor
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
    obtenerAcompanyamientoTutor: `
        query ($usuarioUnTutor: String!){
            obtenerAcompanyamientoTutor(usuarioUnTutor: $usuarioUnTutor) {
            esTutor
            usuarioUnEstudiante
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

export const tutorialMutation  = {
    
}