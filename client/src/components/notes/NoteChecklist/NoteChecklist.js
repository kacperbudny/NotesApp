import React from "react";
import PropTypes from "prop-types";

const NoteChecklist = ({ checklistItems }) => {
  return (
    <ul>
      {checklistItems.map((item) => (
        <li key={item.id}>
          {item.content} - {item.isChecked.toString()}
        </li>
      ))}
    </ul>
  );
};

NoteChecklist.propTypes = {
  checklistItems: PropTypes.arrayOf(PropTypes.object),
};

export default NoteChecklist;
