import IconButton from "@components/common/IconButton/IconButton";
import React from "react";
import styles from "./PinIcon.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
import useNotes from "@hooks/useNotes";

const PinIcon = ({ isHovered, isAdding = false, note }) => {
  const { toggleNotePinned } = useNotes();

  const handleClick = (e) => {
    e.stopPropagation();
    toggleNotePinned(note);
  };

  return (
    <div
      style={{
        opacity: `${isAdding || isHovered ? "80%" : "0"}`,
      }}
      className={styles.container}
    >
      <IconButton onClick={handleClick} size={34}>
        <FontAwesomeIcon
          icon={note.pinned ? faSolidBookmark : faBookmark}
          size="lg"
        />
      </IconButton>
    </div>
  );
};

export default PinIcon;
