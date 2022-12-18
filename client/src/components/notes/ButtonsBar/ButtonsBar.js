import React from "react";
import styles from "./ButtonsBar.module.scss";
import PropTypes from "prop-types";
import {
  ArchiveButton,
  DeleteButton,
  PaletteButton,
  TagButton,
} from "@components/notes/ButtonsBar/Buttons";

const ButtonsBar = ({ isVisible, children }) => {
  return (
    <div className={`${styles.buttonsBar} ${isVisible && styles.visible}`}>
      {children}
    </div>
  );
};

ButtonsBar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

ButtonsBar.ArchiveButton = ArchiveButton;
ButtonsBar.DeleteButton = DeleteButton;
ButtonsBar.PaletteButton = PaletteButton;
ButtonsBar.TagButton = TagButton;

export default ButtonsBar;
