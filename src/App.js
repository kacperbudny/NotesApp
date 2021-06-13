import Header from "./components/layout/Header";
import Notes from "./components/notes/Notes";
import React, { useState } from "react";
import AddNote from "./components/layout/AddNote";
import Modal from "./components/notes/Modal";
import colors from "./utils/colors";

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      name: "My first note",
      text: "This is my very first note!",
      displayOrder: 1,
      color: "white",
    },
    {
      id: 2,
      name: "Another note",
      text: "Hey, look, I've just made another one. And I'm going to make it somewhat long to see what happens.",
      displayOrder: 2,
      color: "white",
    },
    {
      id: 3,
      name: "Shopping list",
      text: "Milk, bread, happiness",
      displayOrder: 3,
      color: "white",
    },
    {
      id: 4,
      name: "Colorful boy",
      text: "Look mom, I'm green!",
      displayOrder: 4,
      color: colors.green,
    },
  ]);
  const [isModalShown, setIsModalShown] = useState(false);
  const [activeNote, setActiveNote] = useState();

  const addNote = (note) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const displayOrder =
      notes.length > 0
        ? notes.reduce((a, b) => (a.displayOrder > b.displayOrder ? a : b), 1)
            .displayOrder + 1
        : 1;
    const newNote = { id, ...note, displayOrder };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((value) => {
      return value.id !== id;
    });
    setNotes(filteredNotes);
  };

  const changeNoteColor = (color, note) => {
    const filteredNotes = notes.filter((value) => {
      return value.id !== note.id;
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
    </div>
  );
}

export default App;
