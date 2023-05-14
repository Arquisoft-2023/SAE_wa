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
    `,

    editarTipoRemision: `
        mutation MyMutation ($id: Int!, $item: TipoRemisionInput!){
            editarTipoRemision(id: $id, item: $item)
        }
    `,

    eliminarTipoRemision: `
        mutation MyMutation ($id: Int!){
            eliminarTipoRemision(id: $id)
        }
    `
}
