import Header from "@components/layout/Header/Header";
import Notes from "@components/notes/Notes";
import React from "react";
import AddNote from "@components/notes/AddNote/AddNote";
import EditNoteModal from "@components/notes/EditNoteModal";
import Loading from "@components/common/Loading/Loading";
import "react-toastify/dist/ReactToastify.css";
import DeleteNoteModal from "@components/notes/DeleteNoteModal/DeleteNoteModal";
import useNotes from "@hooks/useNotes";

function HomePage() {
  const { isLoading } = useNotes();

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
    </div>
  );
}

export default HomePage;
