import { SigninQueries } from "../../queries/signin/SigninQueries";
import { AJAXRequest } from "../../utils/AJAXRequest";

const URI = "auth/signin";

export const SigninAJAXRequest = {
  verificarAuth: async (usuarioField) => {
    console.log(usuarioField);
    const { data } = await AJAXRequest(URI, {
      query: SigninQueries.signin,
      variables: {
        usuarioUnSearch: usuarioField
      }
    });
    return data.data.signin;
  }
};
