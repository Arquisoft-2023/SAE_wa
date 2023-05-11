export const PrimeraEscuchaQueries = {

    //queries

    primeraEscucha: `
        query MyQuery {
                obtenerPrimerasescuchas {
                    idPrimeraEscucha
                    fechaPrimeraEscucha
                    observacion
                    realizada
            }
        }
    `,

    //mutations

    editarPrimeraEscucha: `
        mutation MyMutation ($id: Int!, $item: PrimeraEscuchaInput!){
            modificarPrimeraEscucha(id: $id, item: $item)
        }
    `
}
