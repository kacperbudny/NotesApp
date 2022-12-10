import React, { useState } from "react";
import PropTypes from "prop-types";
import useHover from "@hooks/useHover";

const TagEditItem = ({ tag }) => {
  const [inputValue, setInputValue] = useState(tag);
  const [hoverRef, isHovered] = useHover();

  const handleChange = (e) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <div key={tag} ref={hoverRef}>
      <button>D</button>{" "}
      <input type="text" value={inputValue} onChange={handleChange} />{" "}
      <button>E</button>
    </div>
  );
};

TagEditItem.propTypes = {
  tag: PropTypes.string,
};

export default TagEditItem;
