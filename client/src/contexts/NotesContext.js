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
    let newNote;

    setNotes((prevNotes) => {
      const _id = ObjectId().toString();
      const displayOrder =
        prevNotes.length > 0
          ? prevNotes.reduce(
              (a, b) => (a.displayOrder > b.displayOrder ? a : b),
              1
            ).displayOrder + 1
          : 1;
      newNote = { _id, ...note, displayOrder };
      return [...prevNotes, newNote];
    });

    try {
      await toastifyRequest(notesProvider.add(newNote));
    } catch (error) {
      handleError(error);
    }
  };

  const updateNote = async (updatedNote) => {
    setNotes((prevNotes) => {
      const noteIndex = prevNotes.findIndex((n) => n._id === updatedNote._id);
      const newNotes = [...prevNotes];
      newNotes[noteIndex] = updatedNote;
      return newNotes;
    });

    try {
      await toastifyRequest(notesProvider.update(updatedNote));
    } catch (error) {
      handleError(error);
    }
  };

  const deleteNote = async (id) => {
    setNotes((prevNotes) => {
      const filteredNotes = prevNotes.filter((value) => {
        return value._id !== id;
      });
      return filteredNotes;
    });

    try {
      await toastifyRequest(notesProvider.delete(id));
    } catch (error) {
      handleError(error);
    }
  };

  const reorderNotes = async (draggedNote, hoveredNote) => {
    const notesToUpdate = [];

    setNotes((prevNotes) => {
      const newNotes = [...prevNotes];
      const isMovingNoteToHigherOrder =
        hoveredNote.displayOrder > draggedNote.displayOrder;

      let orderToApply = hoveredNote.displayOrder;
      let idOfNoteToChange = newNotes.findIndex(
        (n) => n._id === draggedNote._id
      );

      while (idOfNoteToChange >= 0) {
        const id = idOfNoteToChange;
        const order = orderToApply;

        idOfNoteToChange = newNotes.findIndex((n) => n.displayOrder === order);
        if (isMovingNoteToHigherOrder) {
          orderToApply = orderToApply - 1;
        } else {
          orderToApply = orderToApply + 1;
        }

        const updatedNote = { ...newNotes[id], displayOrder: order };
        newNotes[id] = updatedNote;
        notesToUpdate.push(updatedNote);
      }

      return newNotes;
    });

    try {
      await toastifyRequest(
        Promise.all(notesToUpdate.map((note) => notesProvider.update(note)))
      );
    } catch (error) {
      handleError(error);
    }
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

  const openEditingModal = (_id) => {
    setNoteToEdit(notes.find((note) => note._id === _id));
  };

  const closeEditingModal = () => {
    setNoteToEdit(null);
  };

  const openDeletingModal = (_id) => {
    setNoteToDelete(notes.find((note) => note._id === _id));
  };

  const closeDeletingModal = () => {
    setNoteToDelete(null);
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
        updateTags,
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
