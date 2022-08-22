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

export default handleRequest;
