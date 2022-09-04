import handleRequest from "@utils/handleRequest";
import backendRoutes from "@constants/backendRoutes";
import tokenProvider from "./tokenProvider";

const requestSignUp = async (newUser) => {
  return fetch(backendRoutes.registerRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
};

const requestSignIn = async (credentials) => {
  return fetch(backendRoutes.loginRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};

const requestMe = async () => {
  return fetch(backendRoutes.meRoute, {
    method: "GET",
    headers: {
      Authorization: authProvider.getAuthorizationHeader(),
    },
  });
};

const authProvider = {
  signUp: async (newUser) => {
    const response = await handleRequest(() => requestSignUp(newUser));
    const { token, user } = await response.json();
    tokenProvider.setToken(token);
    return user;
  },
  signIn: async (credentials) => {
    const response = await handleRequest(() => requestSignIn(credentials));
    const { token, user } = await response.json();
    tokenProvider.setToken(token);
    return user;
  },
  signOut: () => {
    return tokenProvider.removeToken();
  },
  me: async () => {
    const response = await handleRequest(() => requestMe());
    const { user } = await response.json();
    return user;
  },
  getAuthorizationHeader: () => {
    return `Bearer ${tokenProvider.getToken()}`;
  },
};

export default authProvider;
