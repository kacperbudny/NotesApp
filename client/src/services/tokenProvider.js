const TOKEN_STRING = "token";
const REFRESH_TOKEN_STRING = "refreshToken";

const tokenProvider = {
  getToken: () => {
    return localStorage.getItem(TOKEN_STRING) || null;
  },
  setToken: (token) => {
    return localStorage.setItem(TOKEN_STRING, token);
  },
  removeToken: () => {
    return localStorage.removeItem(TOKEN_STRING);
  },
  getRefreshToken: () => {
    return localStorage.getItem(REFRESH_TOKEN_STRING) || null;
  },
  setRefreshToken: (refreshToken) => {
    return localStorage.setItem(REFRESH_TOKEN_STRING, refreshToken);
  },
  removeRefreshToken: () => {
    return localStorage.removeItem(REFRESH_TOKEN_STRING);
  },
};

export default tokenProvider;
