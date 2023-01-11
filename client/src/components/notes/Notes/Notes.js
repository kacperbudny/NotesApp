import React from "react";
import styles from "./Notes.module.scss";
import { useNotesContext } from "@contexts/NotesContext";
import PropTypes from "prop-types";
import homePageDisplayModes from "@utils/constants/homePageDisplayModes";
import { useLayoutContext } from "@contexts/LayoutContext";
import NotesGroup from "@components/notes/NotesGroup";
import { useParams, useSearchParams } from "react-router-dom";

const filterNotes = (displayAs, payload) => {
  return (note) => {
    switch (displayAs) {
      case homePageDisplayModes.home:
        return !note.archived;
      case homePageDisplayModes.archive:
        return note.archived;
      case homePageDisplayModes.tags:
        return note.tags.includes(payload.tag);
      case homePageDisplayModes.search:
        return (
          note.name.includes(payload.searchQuery) ||
          note.content.includes(payload.searchQuery) ||
          note.tags.some((tag) => tag.includes(payload.searchQuery))
        );
      default:
        return true;
    }
  };
};

const Notes = ({ displayAs }) => {
  const [searchParams] = useSearchParams();
  const { tag } = useParams();

  const { notes } = useNotesContext();
  const { masonryRefs } = useLayoutContext();

  const searchQuery = searchParams.get("q") || "";

  const filteredNotes = notes.filter(
    filterNotes(displayAs, { tag, searchQuery })
  );

  const pinnedNotes = filteredNotes.filter((note) => note.pinned);
  const archivedNotes = filteredNotes.filter((note) => note.archived);
  const otherNotes = filteredNotes.filter(
    (note) => !note.pinned && !note.archived
  );

  const displayOtherLabel = pinnedNotes.length > 0 || archivedNotes.length > 0;
  const displayArchivedLabel = displayAs !== homePageDisplayModes.archive;

  const areThereAnyNotes = filteredNotes.length > 0;
  const isOnSearchRoute = displayAs === homePageDisplayModes.search;
  const isSearchQueryEmpty = searchQuery.length === 0;

  const shouldDisplaySearchPrompt = isOnSearchRoute && isSearchQueryEmpty;
  const shouldDisplayNotes = areThereAnyNotes && !shouldDisplaySearchPrompt;

  const noNotesMessage = shouldDisplaySearchPrompt
    ? "Start typing to search."
    : isOnSearchRoute
    ? "No search results."
    : "There are no notes. Maybe it's time to add some?";

  return (
    <div className={styles.notesContainer}>
      {shouldDisplayNotes ? (
        <>
          {pinnedNotes.length > 0 && (
            <NotesGroup
              label="Pinned"
              notes={pinnedNotes}
              masonryRef={masonryRefs.pinned}
              displayAs={displayAs}
            />
          )}
          {otherNotes.length > 0 && (
            <NotesGroup
              label="Other"
              notes={otherNotes}
              displayLabel={displayOtherLabel}
              masonryRef={masonryRefs.other}
              displayAs={displayAs}
            />
          )}
          {archivedNotes.length > 0 && (
            <NotesGroup
              label="Archived"
              notes={archivedNotes}
              displayLabel={displayArchivedLabel}
              masonryRef={masonryRefs.archived}
              displayAs={displayAs}
            />
          )}
        </>
      ) : (
        <p className={styles.noNotes}>{noNotesMessage}</p>
      )}
    </div>
  );
};

Notes.propTypes = {
  displayAs: PropTypes.oneOf(Object.values(homePageDisplayModes)).isRequired,
};

export default Notes;
