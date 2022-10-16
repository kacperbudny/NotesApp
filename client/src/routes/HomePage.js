import Header from "@components/layout/Header";
import Notes from "@components/notes/Notes";
import React from "react";
import AddNote from "@components/notes/AddNote";
import EditNoteModal from "@components/notes/EditNoteModal";
import Loading from "@components/common/Loading";
import DeleteNoteModal from "@components/notes/DeleteNoteModal";
import useNotes from "@hooks/useNotes";
import Sidebar from "@components/layout/Sidebar";
import PageLayoutContainer from "@components/layout/PageLayoutContainer";
import MainSectionContainer from "@components/layout/MainSectionContainer";

function HomePage() {
  const { isLoading } = useNotes();

  return (
    <div>
      <Header />
      {!isLoading ? (
        <>
          <PageLayoutContainer>
            <Sidebar />
            <MainSectionContainer>
              <AddNote />
              <Notes />
            </MainSectionContainer>
          </PageLayoutContainer>
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
