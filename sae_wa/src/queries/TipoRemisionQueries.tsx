export const TipoRemisionQueries = {
    tiposRemision: `
        query MyQuery {
            obtenerTiposremision {
                idTipoRemision
                tipoRemision
            }
        }
    `,
    crearTipoRemision: `
        mutation MyMutation ($item: TipoRemisionInput!) {
            crearTipoRemision(item: $item ){
                idTipoRemision
                tipoRemision
            }
        }   
    `
}
