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
  fetch: async (route, config) => {
    return fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
  },
};

export default api;
