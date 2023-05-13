export const RolesQueries = {
  rolesObtencion: `
    query MyQuery {
        leerRoles {
          rol
          rolId
        }
      }
    `,
  rolesCreacion: `mutation MyMutation ($item: String!) {
        ingresarRol(rol: $item) {
          rol
          rolId
        }
      }`,
  rolesEliminacion:
    `mutation MyMutation ($rolABuscarId: String!){
      eliminarRol(rolABuscar: $rolABuscarId) {
        rolId
        rol
      }
    }
    `,
  rolesActualizacion:
    `mutation MyMutation ($rolABuscarId: String!, $rolNuevo: String!){
      modificarNombreRol(rolABuscar: $rolABuscarId, rolNuevo: $rolNuevo) {
        rol
        rolId
      }
    }`,
};
