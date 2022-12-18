import { faInbox } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PropTypes from "prop-types";
import IconButton from "@components/common/IconButton";

const ArchiveButton = ({ onArchive }) => {
  return <IconButton onClick={onArchive} icon={faInbox} />;
};

ArchiveButton.propTypes = {
  onArchive: PropTypes.func.isRequired,
};

export default ArchiveButton;
