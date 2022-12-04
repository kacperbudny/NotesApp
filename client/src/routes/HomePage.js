import Header from "@components/layout/Header";
import Notes from "@components/notes/Notes";
import React from "react";
import AddNote from "@components/notes/AddNote";
import EditNoteModal from "@components/notes/EditNoteModal";
import Loading from "@components/common/Loading";
import DeleteNoteModal from "@components/notes/DeleteNoteModal";
import { useNotesContext } from "@contexts/NotesContext";
import Sidebar from "@components/layout/Sidebar";
import PageLayoutContainer from "@components/layout/PageLayoutContainer";
import MainSectionContainer from "@components/layout/MainSectionContainer";
import PropTypes from "prop-types";
import FullHeightContainer from "@components/layout/FullHeightContainer";
import homePageDisplayModes from "@utils/constants/homePageDisplayModes";
import TagsModal from "@components/notes/TagsModal/TagsModal";

function HomePage({ displayAs = homePageDisplayModes.home }) {
  const { isLoading } = useNotesContext();

  return (
    <>
      <FullHeightContainer>
        <Header displayAs={displayAs} />
        <PageLayoutContainer>
          <Sidebar />
          <MainSectionContainer>
            {!isLoading ? (
              <>
                {displayAs === homePageDisplayModes.home && <AddNote />}
                <Notes displayAs={displayAs} />
              </>
            ) : (
              <Loading />
            )}
          </MainSectionContainer>
        </PageLayoutContainer>
      </FullHeightContainer>
      <EditNoteModal />
      <DeleteNoteModal />
      <TagsModal />
    </>
  );
}

HomePage.propTypes = {
  displayAs: PropTypes.oneOf(Object.values(homePageDisplayModes)),
};

export default HomePage;
