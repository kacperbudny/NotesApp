import Header from "./components/layout/Header";
import Notes from "./components/notes/Notes";
import React, { useState } from "react";
import AddNote from "./components/layout/AddNote";
import Modal from "./components/notes/Modal";
import useGetNotes from "./hooks/useGetNotes";
import { ObjectId } from "bson";
import Loading from "./components/common/Loading";
import backendRoutes from "./utils/constants/backend-routes";

function App() {
  const [notes, setNotes, isLoading] = useGetNotes();
  const [isModalShown, setIsModalShown] = useState(false);
  const [activeNote, setActiveNote] = useState();

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

  const showModal = (_id) => {
    setIsModalShown(true);
    setActiveNote(_id);
  };

  const closeModal = (note) => {
    setIsModalShown(false);
    updateNote(note);
  };

  return (
    <div className="App">
      <Header />
      {!isLoading ? (
        <>
          <AddNote onAdd={addNote} />
          <Notes
            notes={notes}
            onDelete={deleteNote}
            onEdit={showModal}
            changeNoteColor={changeNoteColor}
          />
          {isModalShown && (
            <Modal
              note={notes.find(({ _id }) => _id === activeNote)}
              onClose={closeModal}
            />
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
