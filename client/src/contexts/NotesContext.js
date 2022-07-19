import { createContext, useState } from "react";
import useGetNotes from "@hooks/useGetNotes";
import { ObjectId } from "bson";
import { destroyNote, patchNote, saveNote } from "@services/notesApi";
import toastifyRequest from "@utils/toastifyRequest";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes, isLoading] = useGetNotes();
  const [activeNote, setActiveNote] = useState(null);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [isDeletingModalOpen, setIsDeletingModalOpen] = useState(false);
  const [shouldReturnToEditing, setShouldReturnToEditing] = useState(false);

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
      await toastifyRequest(saveNote(newNote));
    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = async (updatedNote) => {
    const noteIndex = notes.findIndex((n) => n._id === updatedNote._id);
    const newNotes = [...notes];
    newNotes[noteIndex] = updatedNote;
    setNotes(newNotes);

    try {
      await toastifyRequest(patchNote(updatedNote));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    const filteredNotes = notes.filter((value) => {
      return value._id !== id;
    });
    setNotes(filteredNotes);

    try {
      await toastifyRequest(destroyNote(id));
    } catch (error) {
      console.error(error);
    }
  };

  const changeNoteColor = (color, note) => {
    note.color = color;
    updateNote(note);
  };

  const openEditingModal = (_id) => {
    setActiveNote(notes.find((note) => note._id === _id));
    setIsEditingModalOpen(true);
  };

  const closeEditingModal = (note) => {
    updateNote(note);
    setIsEditingModalOpen(false);
  };

  const openDeletingModal = (note) => {
    if (isEditingModalOpen) {
      setIsEditingModalOpen(false);
      setShouldReturnToEditing(true);
    }
    setActiveNote(note);
    setIsDeletingModalOpen(true);
  };

  const closeDeletingModal = () => {
    setIsDeletingModalOpen(false);
    setShouldReturnToEditing(false);
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
        activeNote,
        setActiveNote,
        isEditingModalOpen,
        setIsEditingModalOpen,
        openEditingModal,
        closeEditingModal,
        isDeletingModalOpen,
        setIsDeletingModalOpen,
        openDeletingModal,
        closeDeletingModal,
        shouldReturnToEditing,
        setShouldReturnToEditing,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export default NotesContext;
