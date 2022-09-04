const TOKEN_STRING = "token";

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
};

export default tokenProvider;
