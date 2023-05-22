export const SigninQueries = {
  signin: `
    mutation ($usuarioUnSearch: String!) {
        signin(item: {usuarioUn: $usuarioUnSearch}) {
            usuarioUn
            token
            estado
        }
    }
    `
};
