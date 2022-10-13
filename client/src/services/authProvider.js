import backendRoutes from "@constants/backendRoutes";
import tokenProvider from "./tokenProvider";
import api from "./api";

const authProvider = {
  signUp: async (newUser) => {
    const response = await api.makeRequest(
      backendRoutes.registerRoute,
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
      backendRoutes.loginRoute,
      "POST",
      credentials
    );
    const { token, user, refreshToken } = await response.json();
    tokenProvider.setToken(token);
    tokenProvider.setRefreshToken(refreshToken);
    return { user, token };
  },
  signOut: async () => {
    await api.makeRequest(backendRoutes.logoutRoute, "DELETE", {
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
