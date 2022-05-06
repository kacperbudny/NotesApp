import backendRoutes from "@constants/backendRoutes";

const handleNotesRequest = async (requestFunction) => {
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

const requestGetNotes = async () => {
  return fetch(backendRoutes.notesRoute);
};

const requestSaveNote = async (newNote) => {
  return fetch(backendRoutes.notesRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
      },
      body: JSON.stringify(updatedNote),
    }
  );
};

const requestDestroyNote = async (id) => {
  return fetch(`${backendRoutes.notesRoute}/${id}`, {
    method: "DELETE",
  });
};

export const getNotes = async () => {
  return handleNotesRequest(requestGetNotes);
};

export const saveNote = async (newNote) => {
  return handleNotesRequest(() => requestSaveNote(newNote));
};

export const patchNote = async (updatedNote) => {
  return handleNotesRequest(() => requestPatchNote(updatedNote));
};

export const destroyNote = async (id) => {
  return handleNotesRequest(() => requestDestroyNote(id));
};
