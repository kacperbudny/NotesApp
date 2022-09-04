import authProvider from "./authProvider";

const handleRequest = async (requestFunction) => {
  try {
    const response = await requestFunction();
    if (response.ok) {
      return response;
    }
    throw new Error();
  } catch (error) {
    throw error;
  }
};

const api = {
  makeRequest: async (route, method, body) => {
    return handleRequest(() =>
      fetch(route, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: authProvider.getAuthorizationHeader(),
        },
        body: JSON.stringify(body),
      })
    );
  },
};

export default api;
