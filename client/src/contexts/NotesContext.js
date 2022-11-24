import { createContext, useContext, useState } from "react";
import useGetNotes from "@hooks/useGetNotes";
import { ObjectId } from "bson";
import notesProvider from "@services/notesProvider";
import toastifyRequest from "@utils/toastifyRequest";
import useHandleError from "@hooks/useHandleError";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes, isLoading] = useGetNotes();
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const handleError = useHandleError();

  const addNote = async (note) => {
    const _id = ObjectId().toString();
    const displayOrder =
      notes.length > 0
        ? notes.reduce((a, b) => (a.displayOrder > b.displayOrder ? a : b), 1)
            .displayOrder + 1
        : 1;
    const newNote = { _id, ...note, displayOrder };
    setNotes([...notes, newNote]);

    try {
      await toastifyRequest(notesProvider.add(newNote));
    } catch (error) {
      handleError(error);
    }
  };

  const updateNote = async (updatedNote) => {
    const noteIndex = notes.findIndex((n) => n._id === updatedNote._id);
    const newNotes = [...notes];
    newNotes[noteIndex] = updatedNote;
    setNotes(newNotes);

    try {
      await toastifyRequest(notesProvider.update(updatedNote));
    } catch (error) {
      handleError(error);
    }
  };

  const deleteNote = async (id) => {
    const filteredNotes = notes.filter((value) => {
      return value._id !== id;
    });
    setNotes(filteredNotes);

    try {
      await toastifyRequest(notesProvider.delete(id));
    } catch (error) {
      handleError(error);
    }
  };

  const openEditingModal = (_id) => {
    setNoteToEdit(notes.find((note) => note._id === _id));
  };

  const closeEditingModal = () => {
    setNoteToEdit(null);
  };

  const openDeletingModal = (note) => {
    setNoteToDelete(note);
  };

  const closeDeletingModal = () => {
    setNoteToDelete(null);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        isLoading,
        addNote,
        deleteNote,
        updateNote,
        noteToEdit,
        noteToDelete,
        openEditingModal,
        closeEditingModal,
        openDeletingModal,
        closeDeletingModal,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotesContext() {
  return useContext(NotesContext);
}

export default NotesContext;
