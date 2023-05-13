export const signinQueries = {
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
