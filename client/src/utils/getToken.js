const getToken = () => {
  return localStorage.getItem("token") || null;
};

export default getToken;
