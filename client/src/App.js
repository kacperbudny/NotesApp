import Header from "@components/layout/Header/Header";
import Notes from "@components/notes/Notes";
import React, { useContext } from "react";
import AddNote from "@components/notes/AddNote/AddNote";
import EditNoteModal from "@components/notes/EditNoteModal";
import Loading from "@components/common/Loading/Loading";
import NotesContext from "@contexts/NotesContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        </>
      ) : (
        <Loading />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
