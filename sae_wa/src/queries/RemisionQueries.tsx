export const RemisionQueries = {

    //Queries

    remisionUsuarioUn: `
        query MyQuery ($usuarioUn: String!){
            obtenerRemisionesUnUsuario(usuarioUn: $usuarioUn) {
                idRemision
                fechaEnvioRemision
                tipoRemision
                usuarioUnDocente
                usuarioUnEstudiante
                programaCurricular
                justificacionSolicitud
                primeraEscuchaRealizada
                observacionPrimeraEscucha
                remisionEfectiva
            }
        }
    `,
    remisiones: `
        query MyQuery {
            obtenerRemisiones {
                idRemision
                idPrimeraEscucha
                fechaEnvioRemision
                tipoRemision
                usuarioUnDocente
                usuarioUnEstudiante
                programaCurricular
                justificacionSolicitud
                primeraEscuchaRealizada
                observacionPrimeraEscucha
                remisionEfectiva
            }
        }
    `,
    remisionesEfectivas: `
        query MyQuery {
            obtenerRemisionesEfectivas {
                idRemision
                fechaEnvioRemision
                tipoRemision
                usuarioUnDocente
                usuarioUnEstudiante
                programaCurricular
                justificacionSolicitud
                primeraEscuchaRealizada
                observacionPrimeraEscucha
                remisionEfectiva
            }
        }
    `,

    //Mutations

    crearRemision: `
        mutation MyMutation ($item: NuevaRemisionInput!){
            generarRemision (item: $item) {
                idRemision
                fechaEnvioRemision
            }
        }
    `,
    eliminarRemision: `
        mutation MyMutation ($id: Int!){
            eliminarRemision(id: $id)
        }
    `

}