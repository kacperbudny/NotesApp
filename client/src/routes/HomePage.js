import Header from "@components/layout/Header";
import Notes from "@components/notes/Notes";
import React, { useEffect } from "react";
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
import HOME_PAGE_DISPLAY_MODES from "@utils/constants/homePageDisplayModes";
import TagsModal from "@components/notes/TagsModal/TagsModal";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FRONTEND_ROUTES from "@utils/constants/frontendRoutes";

function HomePage({ displayAs = HOME_PAGE_DISPLAY_MODES.home }) {
  const { isLoading, tags } = useNotesContext();
  const { tag: tagFromParams } = useParams();
  const navigate = useNavigate();

  const shouldDisplayAddNote =
    displayAs !== HOME_PAGE_DISPLAY_MODES.archive &&
    displayAs !== HOME_PAGE_DISPLAY_MODES.search;

  useEffect(() => {
    if (!tagFromParams) {
      return;
    }

    const isTagRouteExisting = tags.includes(tagFromParams);

    if (!isLoading && !isTagRouteExisting) {
      navigate(FRONTEND_ROUTES.homePage);
      toast.warn(`Tag '${tagFromParams}' doesn't exist.`);
    }
  }, [isLoading, tags, tagFromParams, navigate]);

  return (
    <>
      <FullHeightContainer>
        <Header displayAs={displayAs} />
        <PageLayoutContainer>
          <Sidebar />
          <MainSectionContainer>
            {!isLoading ? (
              <>
                {shouldDisplayAddNote && <AddNote />}
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
  displayAs: PropTypes.oneOf(Object.values(HOME_PAGE_DISPLAY_MODES)),
};

export default HomePage;
