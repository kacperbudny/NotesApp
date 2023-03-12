import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PropTypes from "prop-types";
import IconButton from "@components/common/IconButton";

const ChecklistButton = ({ onChecklist }) => {
  return <IconButton onClick={onChecklist} icon={faListCheck} />;
};

ChecklistButton.propTypes = {
  onChecklist: PropTypes.func.isRequired,
};

export default ChecklistButton;
