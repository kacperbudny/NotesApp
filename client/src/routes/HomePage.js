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
import PropTypes from "prop-types";

function HomePage({ displayAs = "Home" }) {
  const { isLoading } = useNotes();

  return (
    <div>
      <Header />
      <PageLayoutContainer>
        <Sidebar />
        <MainSectionContainer>
          {!isLoading ? (
            <>
              {displayAs === "Home" && <AddNote />}
              <Notes displayAs={displayAs} />
              <EditNoteModal />
              <DeleteNoteModal />
            </>
          ) : (
            <Loading />
          )}
        </MainSectionContainer>
      </PageLayoutContainer>
    </div>
  );
}

HomePage.propTypes = {
  displayAs: PropTypes.oneOf(["Home", "Archive"]),
};

export default HomePage;
