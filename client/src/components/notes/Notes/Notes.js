import React from "react";
import styles from "./Notes.module.scss";
import { useNotesContext } from "@contexts/NotesContext";
import { useLayoutContext } from "@contexts/LayoutContext";
import NotesGroup from "@components/notes/NotesGroup";
import { useParams, useSearchParams } from "react-router-dom";
import usePath from "@hooks/usePath";
import FRONTEND_ROUTES from "@utils/constants/frontendRoutes";

const filterNotes = (path, payload) => {
  return (note) => {
    switch (path) {
      case FRONTEND_ROUTES.homePage:
        return !note.archived;
      case FRONTEND_ROUTES.archive:
        return note.archived;
      case FRONTEND_ROUTES.tag:
        return note.tags.includes(payload.tag);
      case FRONTEND_ROUTES.search:
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

const Notes = () => {
  const [searchParams] = useSearchParams();
  const { tag } = useParams();
  const path = usePath();
  const { notes } = useNotesContext();
  const { masonryRefs } = useLayoutContext();

  const searchQuery = searchParams.get("q") || "";

  const filteredNotes = notes.filter(filterNotes(path, { tag, searchQuery }));

  const pinnedNotes = filteredNotes.filter((note) => note.pinned);
  const archivedNotes = filteredNotes.filter((note) => note.archived);
  const otherNotes = filteredNotes.filter(
    (note) => !note.pinned && !note.archived
  );

  const displayOtherLabel = pinnedNotes.length > 0 || archivedNotes.length > 0;
  const displayArchivedLabel = path !== FRONTEND_ROUTES.archive;

  const areThereAnyNotes = filteredNotes.length > 0;
  const isOnSearchRoute = path === FRONTEND_ROUTES.search;
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
            />
          )}
          {otherNotes.length > 0 && (
            <NotesGroup
              label="Other"
              notes={otherNotes}
              displayLabel={displayOtherLabel}
              masonryRef={masonryRefs.other}
            />
          )}
          {archivedNotes.length > 0 && (
            <NotesGroup
              label="Archived"
              notes={archivedNotes}
              displayLabel={displayArchivedLabel}
              masonryRef={masonryRefs.archived}
            />
          )}
        </>
      ) : (
        <p className={styles.noNotes}>{noNotesMessage}</p>
      )}
    </div>
  );
};

export default Notes;
