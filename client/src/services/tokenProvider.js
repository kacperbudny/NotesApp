const TOKEN_STRING = "token";
const REFRESH_TOKEN_STRING = "refreshToken";

const tokenProvider = {
  getToken: () => {
    return localStorage.getItem(TOKEN_STRING) || null;
  },
  removeToken: () => {
    return localStorage.removeItem(TOKEN_STRING);
  },
  setToken: (token) => {
    return localStorage.setItem(TOKEN_STRING, token);
  },
  getRefreshToken: () => {
    return localStorage.getItem(REFRESH_TOKEN_STRING) || null;
  },
};

export default tokenProvider;
