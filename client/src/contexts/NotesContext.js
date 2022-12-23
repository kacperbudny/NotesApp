import { createContext, useContext, useState } from "react";
import useGetNotes from "@hooks/useGetNotes";
import { ObjectId } from "bson";
import notesProvider from "@services/notesProvider";
import toastifyRequest from "@utils/toastifyRequest";
import useHandleError from "@hooks/useHandleError";

const NotesContext = createContext({
  notes: [],
  tags: [],
  isLoading: true,
  addNote: () => {},
  deleteNote: () => {},
  updateNote: () => {},
  reorderNotes: () => {},
  noteToEdit: {},
  noteToDelete: {},
  openEditingModal: () => {},
  closeEditingModal: () => {},
  openDeletingModal: () => {},
  closeDeletingModal: () => {},
  updateTags: () => {},
});

export function NotesProvider({ children }) {
  const { notes, setNotes, isLoading } = useGetNotes();
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const tags = Array.from(new Set(notes.map((note) => note.tags).flat()));

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

  const reorderNotes = (draggedNote, hoveredNote) => {
    setNotes((prevNotes) => {
      const hoveredOrder = hoveredNote.displayOrder;

      const notesWithHigherDisplayOrder = prevNotes.filter(
        (note) => note.displayOrder >= hoveredOrder
      );
      const notesWithLowerDisplayOrder = prevNotes.filter(
        (note) => note.displayOrder < hoveredOrder
      );

      const notesWithNewDisplayOrder = notesWithHigherDisplayOrder.map(
        (note) => ({ ...note, displayOrder: note.displayOrder + 1 })
      );

      const newNotesExcludingDraggedNote = [
        ...notesWithLowerDisplayOrder,
        ...notesWithNewDisplayOrder,
      ].filter((note) => note._id !== draggedNote._id);

      const newDraggedNote = { ...draggedNote, displayOrder: hoveredOrder };
      const newNotes = [...newNotesExcludingDraggedNote, newDraggedNote];

      // console.log(prevNotes);
      // console.log(newNotes);

      return newNotes;
    });
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

  const updateTags = async (oldTag, newTag) => {
    const notesToUpdate = [];

    setNotes((prev) =>
      prev.map((note) => {
        const willTagsUpdate = note.tags.includes(oldTag);

        if (!willTagsUpdate) {
          return note;
        }

        const updatedTags =
          newTag !== null
            ? note.tags.map((tag) => (tag === oldTag ? newTag : tag))
            : note.tags.filter((tag) => tag !== oldTag);
        const updatedNote = { ...note, tags: updatedTags };

        notesToUpdate.push(updatedNote);

        return updatedNote;
      })
    );

    try {
      await toastifyRequest(
        Promise.all(notesToUpdate.map((note) => notesProvider.update(note)))
      );
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        tags,
        isLoading,
        addNote,
        deleteNote,
        updateNote,
        reorderNotes,
        noteToEdit,
        noteToDelete,
        openEditingModal,
        closeEditingModal,
        openDeletingModal,
        closeDeletingModal,
        updateTags,
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
