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
    `mutation MyMutation ($rolABuscarId: String!)){
      eliminarRol(rolABuscar: $rolABuscarId) {
        rol
        rolId
      }
    }`,
  rolesActualizacion:
    `mutation MyMutation ($rolABuscarId: String!, $rolNuevo: String!)){
      modificarNombreRol(rolABuscar: $rolAbuscarId, rolNuevo: $rolNuevo) {
        rol
        rolId
      }
    }`,
};
