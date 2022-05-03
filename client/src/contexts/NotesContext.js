import { createContext, useState } from "react";
import useGetNotes from "../hooks/useGetNotes";
import { ObjectId } from "bson";
import backendRoutes from "../utils/constants/backend-routes";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes, isLoading] = useGetNotes();
  const [currentlyEditedNote, setCurrentlyEditedNote] = useState(null);

  const addNote = async (note) => {
    const _id = ObjectId().toString();
    const displayOrder =
      notes.length > 0
        ? notes.reduce((a, b) => (a.displayOrder > b.displayOrder ? a : b), 1)
            .displayOrder + 1
        : 1;
    const newNote = { _id, ...note, displayOrder };
    try {
      const response = await fetch(
        new URL(backendRoutes.notesRoute, backendRoutes.devUrl),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        }
      );
      if (response.ok) {
        setNotes([...notes, newNote]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    const filteredNotes = notes.filter((value) => {
      return value._id !== id;
    });

    try {
      const response = await fetch(
        new URL(`${backendRoutes.notesRoute}/${id}`, backendRoutes.devUrl),
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setNotes(filteredNotes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeNoteColor = (color, note) => {
    note.color = color;
    updateNote(note);
  };

  const updateNote = async (updatedNote) => {
    const noteIndex = notes.findIndex((n) => n._id === updatedNote._id);
    const newNotes = [...notes];
    newNotes[noteIndex] = updatedNote;

    try {
      const response = await fetch(
        new URL(
          `${backendRoutes.notesRoute}/${updatedNote._id}`,
          backendRoutes.devUrl
        ),
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedNote),
        }
      );
      if (response.ok) {
        setNotes(newNotes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        isLoading,
        addNote,
        deleteNote,
        changeNoteColor,
        updateNote,
        currentlyEditedNote,
        setCurrentlyEditedNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export default NotesContext;
