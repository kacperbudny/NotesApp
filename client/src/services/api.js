import authProvider from "./authProvider";
import backendRoutes from "@constants/backendRoutes";
import tokenProvider from "./tokenProvider";
import { RefreshTokenError } from "@utils/errors";

const handleRequest = async (request) => {
  try {
    const response = await fetch(request);

    if (response.ok) {
      return response;
    }

    const errorResponse = await response.json();
    const errorMessage = errorResponse.message;

    if (
      request.url !== backendRoutes.loginRoute &&
      response.status === 401 &&
      errorMessage === "Access Token was expired."
    ) {
      refreshToken();

      const retryResponse = await fetch(request);

      if (retryResponse.ok) {
        return retryResponse;
      }
    }

    throw new Error(errorMessage);
  } catch (error) {
    throw error;
  }
};

const refreshToken = async () => {
  const tokenResponse = await fetch(backendRoutes.refreshTokenRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: tokenProvider.getRefreshToken(),
    }),
  });

  if (!tokenResponse.ok) {
    tokenProvider.removeToken();
    throw new RefreshTokenError("Failed to refresh token.");
  }

  const { accessToken } = tokenResponse.json();
  tokenProvider.setToken(accessToken);
};

const api = {
  makeRequest: async (route, method, body) => {
    const request = new Request(route, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: authProvider.getAuthorizationHeader(),
      },
      body: JSON.stringify(body),
    });

    return handleRequest(request);
  },
};

export default api;
