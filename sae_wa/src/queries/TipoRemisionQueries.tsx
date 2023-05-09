export const TipoRemisionQueries = {

    //Queries

    tiposRemision: `
        query MyQuery {
            obtenerTiposremision {
                idTipoRemision
                tipoRemision
            }
        }
    `,

    //Mutations

    crearTipoRemision: `
        mutation MyMutation ($item: TipoRemisionInput!) {
            crearTipoRemision(item: $item ){
                idTipoRemision
                tipoRemision
            }
        }   
    `
}
