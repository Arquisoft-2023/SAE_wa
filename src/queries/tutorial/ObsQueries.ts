export const obsQuery  = {
    obtenerAcompanyamientoEstudiante: `
        query  ($usuarioUnEstudiante: String!) {
            obtenerAcompanyamientoEstudiante(usuarioUnEstudiante: $usuarioUnEstudiante") {
            esTutor
            usuarioUnTutor
            listaObservacion {
                    fecha
                    descripcion
                    Id
                }
            }
        }
    `,
    obtenerAcompanyamientoTutor: `
        query ($usuarioUnTutor: String!) {
            obtenerAcompanyamientoTutor(usuarioUnTutor: $usuarioUnTutor) {
            esTutor
            usuarioUnEstudiante
            listaObservacion {
                    Id
                    descripcion
                    fecha
                }
            }
        }
    `,
}

export const obsMutation  = {
    
}