import Header from "@components/layout/Header/Header";
import Notes from "@components/notes/Notes";
import React, { useContext } from "react";
import AddNote from "@components/notes/AddNote/AddNote";
import EditNoteModal from "@components/notes/EditNoteModal";
import Loading from "@components/common/Loading/Loading";
import NotesContext from "@contexts/NotesContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastConfig from "utils/toastConfig";
import DeleteNoteModal from "@components/notes/DeleteNoteModal/DeleteNoteModal";

function App() {
  const { isLoading } = useContext(NotesContext);

  return (
    <div>
      <Header />
      {!isLoading ? (
        <>
          <AddNote />
          <Notes />
          <EditNoteModal />
          <DeleteNoteModal />
        </>
      ) : (
        <Loading />
      )}
      <ToastContainer {...toastConfig} />
    </div>
  );
}

export default App;
