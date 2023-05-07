export const RemisionQueries = {
    remisionUsuarioUn: `
        query MyQuery ($usuarioUn: String!){
            obtenerRemisionesUnUsuario(usuarioUn: $usuarioUn) {
                idRemision
                idSolicitudRemision
                idPrimeraEscucha
                tipoRemision
                usuarioUnDocente
                usuarioUnEstudiante
                programaCurricular
            }
        }
    `,
}