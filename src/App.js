import Header from "./components/Header";
import Notes from "./components/Notes";
import React, { useState } from "react";

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

  return (
    <div className="App">
      <Header />
      <Notes notes={notes} />
    </div>
  );
}

export default App;
