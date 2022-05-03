import Header from "./components/layout/Header";
import Notes from "./components/notes/Notes";
import React, { useContext, useState } from "react";
import AddNote from "./components/layout/AddNote";
import Modal from "./components/notes/Modal";
import Loading from "./components/common/Loading";
import NotesContext from "./contexts/NotesContext";

function App() {
  const { notes, isLoading, updateNote, setCurrentlyEditedNote } =
    useContext(NotesContext);
  const [isModalShown, setIsModalShown] = useState(false);

  const showModal = (_id) => {
    setIsModalShown(true);
    setCurrentlyEditedNote(notes.find((note) => note._id === _id));
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
          <AddNote />
          <Notes onEdit={showModal} />
          {isModalShown && <Modal onClose={closeModal} />}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
