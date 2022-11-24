const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";

const tokenProvider = {
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY) || null;
  },
  setToken: (token) => {
    return localStorage.setItem(TOKEN_KEY, token);
  },
  removeToken: () => {
    return localStorage.removeItem(TOKEN_KEY);
  },
  getRefreshToken: () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY) || null;
  },
  setRefreshToken: (refreshToken) => {
    return localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  removeRefreshToken: () => {
    return localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

export default tokenProvider;
