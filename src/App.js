import Header from "./components/Header";
import Notes from "./components/Notes";
import React, { useState } from "react";
import AddNote from "./components/AddNote";
import Modal from "./components/Modal";

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      name: "My first note",
      text: "This is my very first note!",
    },
    {
      id: 2,
      name: "Another note",
      text:
        "Hey, look, I've just made another one. And I'm going to make it somewhat long to see what happens.",
    },
    {
      id: 3,
      name: "Shopping list",
      text: "Milk, bread, happiness",
    },
  ]);
  const [isModalShown, setIsModalShown] = useState(false);
  const [activeNote, setActiveNote] = useState();

  const addNote = (note) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newNote = { id, ...note };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((value) => {
      return value.id !== id;
    });
    setNotes(filteredNotes);
  };

  const showModal = (id) => {
    setIsModalShown(true);
    setActiveNote(id);
  };

  const closeModal = (note) => {
    setIsModalShown(false);
    const noteIndex = notes.findIndex((n) => n.id === note.id);
    let newNotes = notes;
    newNotes[noteIndex].text = note.text;
    setNotes(newNotes);
  };

  return (
    <div className="App">
      <Header />
      <AddNote onAdd={addNote} />
      <Notes notes={notes} onDelete={deleteNote} onEdit={showModal} />
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
