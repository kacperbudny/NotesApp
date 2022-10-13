import backendRoutes from "@constants/backendRoutes";
import api from "./api";

export const getNotes = async () => {
  return await api.makeRequest(backendRoutes.notesRoute, "GET");
};

export const saveNote = async (newNote) => {
  return await api.makeRequest(backendRoutes.notesRoute, "POST", newNote);
};

export const patchNote = async (updatedNote) => {
  return await api.makeRequest(
    `${backendRoutes.notesRoute}/${updatedNote._id}`,
    "PATCH",
    updatedNote
  );
};

export const destroyNote = async (id) => {
  return await api.makeRequest(`${backendRoutes.notesRoute}/${id}`, "DELETE");
};
