import Header from "./components/Header";
import Notes from "./components/Notes";
import React, { useState } from "react";
import AddNote from "./components/AddNote";

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
      text: "Hey, look, I've just made another one. And I'm going to make it somewhat long to see what happens.",
    },
    {
      id: 3,
      name: "Shopping list",
      text: "Milk, bread, happiness",
    },
  ]);

  const addNote = (note) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newNote = {id, ...note };
    setNotes([...notes, newNote]);
  }

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((value) => { return value.id !== id});
    setNotes(filteredNotes);
  }

  return (
    <div className="App">
      <Header />
      <AddNote onAdd={addNote}/>
      <Notes notes={notes} onDelete={deleteNote}/>
    </div>
  );
}

export default App;
