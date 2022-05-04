import Header from "@components/layout/Header/Header";
import Notes from "@components/notes/Notes";
import React, { useContext } from "react";
import AddNote from "@components/notes/AddNote/AddNote";
import EditNoteModal from "@components/notes/EditNoteModal";
import Loading from "@components/common/Loading/Loading";
import NotesContext from "@contexts/NotesContext";

function App() {
  const { isLoading } = useContext(NotesContext);

  return (
    <div className="App">
      <Header />
      {!isLoading ? (
        <>
          <AddNote />
          <Notes />
          <EditNoteModal />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
