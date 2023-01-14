import BACKEND_ROUTES from "@constants/backendRoutes";
import api from "./api";

const notesProvider = {
  get: async () => {
    return await api.makeRequest(BACKEND_ROUTES.notesRoute, "GET");
  },
  add: async (newNote) => {
    return await api.makeRequest(BACKEND_ROUTES.notesRoute, "POST", newNote);
  },
  update: async (updatedNote) => {
    return await api.makeRequest(
      `${BACKEND_ROUTES.notesRoute}/${updatedNote._id}`,
      "PATCH",
      updatedNote
    );
  },
  delete: async (id) => {
    return await api.makeRequest(
      `${BACKEND_ROUTES.notesRoute}/${id}`,
      "DELETE"
    );
  },
};

export default notesProvider;
