import backendRoutes from "@constants/backendRoutes";
import api from "./api";

const notesProvider = {
  get: async () => {
    return await api.makeRequest(backendRoutes.notesRoute, "GET");
  },
  add: async (newNote) => {
    return await api.makeRequest(backendRoutes.notesRoute, "POST", newNote);
  },
  update: async (updatedNote) => {
    return await api.makeRequest(
      `${backendRoutes.notesRoute}/${updatedNote._id}`,
      "PATCH",
      updatedNote
    );
  },
  delete: async (id) => {
    return await api.makeRequest(`${backendRoutes.notesRoute}/${id}`, "DELETE");
  },
};

export default notesProvider;
