import backendRoutes from "@constants/backendRoutes";
import handleRequest from "@utils/handleRequest";
import authProvider from "./authProvider";

const requestGetNotes = async () => {
  return fetch(backendRoutes.notesRoute, {
    method: "GET",
    headers: { Authorization: authProvider.getAuthorizationHeader() },
  });
};

const requestSaveNote = async (newNote) => {
  return fetch(backendRoutes.notesRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authProvider.getAuthorizationHeader(),
    },
    body: JSON.stringify(newNote),
  });
};

const requestPatchNote = async (updatedNote) => {
  return fetch(
    `${backendRoutes.notesRoute}/${updatedNote._id}`,

    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: authProvider.getAuthorizationHeader(),
      },
      body: JSON.stringify(updatedNote),
    }
  );
};

const requestDestroyNote = async (id) => {
  return fetch(`${backendRoutes.notesRoute}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: authProvider.getAuthorizationHeader(),
    },
  });
};

export const getNotes = async () => {
  return handleRequest(requestGetNotes);
};

export const saveNote = async (newNote) => {
  return handleRequest(() => requestSaveNote(newNote));
};

export const patchNote = async (updatedNote) => {
  return handleRequest(() => requestPatchNote(updatedNote));
};

export const destroyNote = async (id) => {
  return handleRequest(() => requestDestroyNote(id));
};
