import authProvider from "./authProvider";
import BACKEND_ROUTES from "@constants/backendRoutes";
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

    if (errorResponse.data === "token-expired") {
      const token = await refreshToken();

      const retryRequest = new Request(request, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const retryResponse = await fetch(retryRequest);

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
  const tokenResponse = await fetch(BACKEND_ROUTES.refreshTokenRoute, {
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

  const { accessToken } = await tokenResponse.json();
  tokenProvider.setToken(accessToken);

  return accessToken;
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
