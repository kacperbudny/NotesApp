import BACKEND_ROUTES from "@constants/backendRoutes";
import tokenProvider from "./tokenProvider";
import api from "./api";

const authProvider = {
  signUp: async (newUser) => {
    const response = await api.makeRequest(
      BACKEND_ROUTES.registerRoute,
      "POST",
      newUser
    );
    const { token, user, refreshToken } = await response.json();
    tokenProvider.setToken(token);
    tokenProvider.setRefreshToken(refreshToken);
    return { user, token };
  },
  signIn: async (credentials) => {
    const response = await api.makeRequest(
      BACKEND_ROUTES.loginRoute,
      "POST",
      credentials
    );
    const { token, user, refreshToken } = await response.json();
    tokenProvider.setToken(token);
    tokenProvider.setRefreshToken(refreshToken);
    return { user, token };
  },
  signOut: async () => {
    await api.makeRequest(BACKEND_ROUTES.logoutRoute, "DELETE", {
      refreshToken: tokenProvider.getRefreshToken(),
    });
    tokenProvider.removeToken();
    tokenProvider.removeRefreshToken();
  },
  getAuthorizationHeader: () => {
    if (!tokenProvider.getToken()) return null;
    return `Bearer ${tokenProvider.getToken()}`;
  },
};

export default authProvider;
