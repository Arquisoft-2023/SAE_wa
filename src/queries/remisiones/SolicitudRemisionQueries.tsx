export const SolicitudRemisionQueries = {

    //Queries

    solicitudesRemision:`
        query MyQuery {
            obtenerSolicitudesremision {
                idSolicitudRemision
                fechaSolicitudRemision
                tipoRemision
                usuarioUnDocente
                usuarioUnEstudiante
                programaCurricular
                justificacion
                estado
            }
        }
    `,

    //Mutations

    generarSolicitud:`
        mutation MyMutation ($item: NuevaSolicitudRemisionInput!){
            generarSolicitud (item: $item) {
                estado
                fechaSolicitudRemision
                idSolicitudRemision
                programaCurricular
                justificacion
                tipoRemision {
                    idTipoRemision
                    tipoRemision
                }
                usuarioUnDocente
                usuarioUnEstudiante
            }
        }
    `,
    eliminarSolicitud:`
        mutation MyMutation ($id: Int!){
            eliminarSolicitud(id: $id)
        }
    `,
    editarSolicitud:`
        mutation MyMutation ($id: Int!, $item: EditSolicitudRemision!){
            editarSolicitud(id: $id, item: $item)
        }
    `
}