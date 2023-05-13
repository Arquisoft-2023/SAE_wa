export const UsuarioQueries = {
    usuariosObtencion:`query MyQuery {
        leerUsuarios {
          apellidos
          documento
          estado
          nombres
          tipoDocumento
          usuarioUn
        }
      }`,
      usuariosCreacion:`mutation MyMutation ($usuarioUn: String!, $estado: Boolean!, $nombres: String!, $apellidos: String!, $documento: String!, $tipoDocumento: Boolean!) {
        ingresarUsuario(
          item: {usuarioUn: $usuarioUn, estado: $estado, nombres: $nombres, apellidos: $apellidos, documento: $documento, tipoDocumento: $tipoDocumento}
        ) {
          apellidos
          documento
          estado
          nombres
          tipoDocumento
          usuarioUn
        }
      }`,
      usuariosEliminacion:`mutation MyMutation ($usuarioUnABuscar: String!) {
        eliminarUsuario(usuarioUnABuscar: $usuarioUnABuscar) {
          apellidos
          documento
          estado
          nombres
          tipoDocumento
          usuarioUn
        }
      }`,
      usuariosModificar:`mutation MyMutation ($usuarioUnABuscar: String!, $estadoNuevo: Boolean!, $nombresNuevo: String!, $apellidosNuevo: String!, $documentoNuevo: String!, $tipoDocumentoNuevo: Boolean!) {
        modificarDatosUsuario(
          item: {usuarioUn: $usuarioUnABuscar, estado: $estadoNuevo, nombres: $nombresNuevo, apellidos: $apellidosNuevo, documento: $documentoNuevo, tipoDocumento: $tipoDocumentoNuevo}
        ) {
          apellidos
          documento
          estado
          nombres
          tipoDocumento
          usuarioUn
        }
      }`,
}