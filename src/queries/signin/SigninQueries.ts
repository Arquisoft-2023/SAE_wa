export const SigninQueries = {
  signin: `
    mutation ($usuarioUnSearch: String!, $usuarioPassword: String!, $usuarioTokenType: String!) {
        signin(password: $usuarioPassword, tokentype: $usuarioTokenType, usuarioUn: $usuarioUnSearch) {
            ldapRes
            token
            usuarioUn
        }
    }
    `,
  logout: `
    mutation ($usuarioUnSearch: String!) {
        signout(usuarioUn: $usuarioUnSearch) {
            token
            usuario
        }
    }
    `
};
