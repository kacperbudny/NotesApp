import React from "react";
import { XBlock, XMasonry } from "react-xmasonry";
import Note from "@components/notes/Note";
import PropTypes from "prop-types";
import styles from "./NotesGroup.module.scss";
import HOME_PAGE_DISPLAY_MODES from "@utils/constants/homePageDisplayModes";

const NotesGroup = ({
  label,
  notes,
  displayLabel = true,
  masonryRef,
  displayAs,
}) => {
  return (
    <div className={styles.container}>
      {displayLabel && <h5 className={styles.label}>{label}</h5>}
      <XMasonry targetBlockWidth={300} center={false} ref={masonryRef}>
        {[...notes]
          .sort((a, b) => b.displayOrder - a.displayOrder)
          .map((note) => (
            <XBlock key={`${note._id}-${note.displayOrder}`} width={1}>
              <Note note={note} displayAs={displayAs} />
            </XBlock>
          ))}
      </XMasonry>
    </div>
  );
};

NotesGroup.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  displayLabel: PropTypes.bool,
  masonryRef: PropTypes.object.isRequired,
  displayAs: PropTypes.oneOf(Object.values(HOME_PAGE_DISPLAY_MODES)).isRequired,
};

export default NotesGroup;
