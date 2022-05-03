import Header from "./components/layout/Header";
import Notes from "./components/notes/Notes";
import React, { useState } from "react";
import AddNote from "./components/layout/AddNote";
import Modal from "./components/notes/Modal";
import useGetNotes from "./hooks/useGetNotes";
import { ObjectId } from "bson";

function App() {
  const [notes, setNotes, isLoading] = useGetNotes();
  const [isModalShown, setIsModalShown] = useState(false);
  const [activeNote, setActiveNote] = useState();

  const addNote = (note) => {
    const _id = ObjectId().toString();
    const displayOrder =
      notes.length > 0
        ? notes.reduce((a, b) => (a.displayOrder > b.displayOrder ? a : b), 1)
            .displayOrder + 1
        : 1;
    const newNote = { _id, ...note, displayOrder };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((value) => {
      return value._id !== id;
    });
    setNotes(filteredNotes);
  };

  const changeNoteColor = (color, note) => {
    const filteredNotes = notes.filter((value) => {
      return value._id !== note._id;
    });
    note.color = color;
    setNotes([...filteredNotes, note]);
  };

  const showModal = (id) => {
    setIsModalShown(true);
    setActiveNote(id);
  };

  const closeModal = (note) => {
    setIsModalShown(false);
    const noteIndex = notes.findIndex((n) => n.id === note.id);
    const newNotes = notes;
    newNotes[noteIndex] = note;
    setNotes(newNotes);
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
              note={notes.find(({ id }) => id === activeNote)}
              onClose={closeModal}
            />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
