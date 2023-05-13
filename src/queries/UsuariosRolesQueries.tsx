export const UsuariosRolesQueries = {
  UsuariosRolesObtencion: `
  query MyQuery {
    leerUsuariosRoles {
      rolId
      usuarioUn
    }
  }
    `,
  UsuariosRolesCreacion: `mutation MyMutation ($rolABuscarId: String!, $usuarioUnABuscar: String!) {
    asignarRolAUsuario(rolABuscar: $rolABuscarId, usuarioUnABuscar: $usuarioUnABuscar) {
      rolId
      usuarioUn
    }
  }`,
  UsuariosRolesEliminacion: `mutation MyMutation ($usuarioUnAEliminar: String!){
    eliminarUsuarioYRol(usuarioUnABuscar: $usuarioUnAEliminar)
  }`,
  UsuariosRolesActualizacion: `mutation MyMutation ($rolNuevoId: String!, $usuarioUnABuscar: String!) {
    modificarUsuarioYRol(rolNuevo: $rolNuevoId, usuarioUn: $usuarioUnABuscar)
  }`,
};
