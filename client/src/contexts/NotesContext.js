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

  //   1. weź order hoverowanej notatki
  // 2. przypisz go dragowanej notatce
  // 3. spróbuj zwiększyć order hoverowanej notatce o 1
  // 4. jeśli inna notatka ma taki sam order, też zwiększ go o 1
  // 5. powtarzaj, aż skończą się notatki lub aż następna notatka nie będzie miała takiego samego orderu

  //   wybierz notatkę której chcesz przypisać nowy order (przy pierwszym wykonaniu będzie to dragged note)
  // pobierz order na który chcesz zamienić (przy pierwszym wykonaniu będzie to hovered id, przy kolejnym - aktualne id + 1)
  // sprawdź, czy jakaś inna notatka ma taki sam order. jeśli tak, zapisz ją.
  // ustaw nowy order.
  // wykonuj, dopóki istnieje notatka, której order będzie do zmiany.
  const reorderNotes = (draggedNote, hoveredNote) => {
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes];
      const draggedNoteId = newNotes.findIndex(
        (n) => n._id === draggedNote._id
      );

      const isNewOrderHigher =
        hoveredNote.displayOrder > draggedNote.displayOrder;

      let newOrder = hoveredNote.displayOrder;
      let noteToChangeId = draggedNoteId;

      while (noteToChangeId >= 0) {
        const id = noteToChangeId;
        noteToChangeId = newNotes.findIndex((n) => n.displayOrder === newOrder);
        newNotes[id] = { ...newNotes[id], displayOrder: newOrder };
        if (isNewOrderHigher) {
          newOrder = newOrder - 1;
        } else {
          newOrder = newOrder + 1;
        }
      }

      console.log(prevNotes);
      console.log(newNotes);

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

//WERSJA KTÓRA DZIAŁA DLA WIĘKSZY ORDER => MNIEJSZY ORDER

// setNotes((prevNotes) => {
//   const hoveredOrder = hoveredNote.displayOrder;

//   const newNotes = [...prevNotes]
//     .filter((n) => n._id !== draggedNote._id)
//     .sort((a, b) => a.displayOrder - b.displayOrder);

//   let i = newNotes.findIndex((n) => n._id === hoveredNote._id);

//   do {
//     newNotes[i] = {
//       ...newNotes[i],
//       displayOrder: newNotes[i].displayOrder + 1,
//     };
//     i++;
//   } while (
//     newNotes[i] &&
//     newNotes[i].displayOrder === newNotes[i - 1].displayOrder
//   );

//   const newDraggedNote = { ...draggedNote, displayOrder: hoveredOrder };
//   const result = [...newNotes, newDraggedNote];

//   console.log(prevNotes);
//   console.log(result);

//   return result;
// });
