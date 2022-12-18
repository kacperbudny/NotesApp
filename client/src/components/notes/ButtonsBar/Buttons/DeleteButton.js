import React from "react";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import IconButton from "@components/common/IconButton";
import PropTypes from "prop-types";

const DeleteButton = ({ onDelete }) => {
  return <IconButton onClick={onDelete} icon={faTrashAlt} />;
};

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
