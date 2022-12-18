import { faTag } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PropTypes from "prop-types";
import TaggingBox from "@components/notes/TaggingBox";
import IconButtonWithFloatingBox from "@components/common/IconButtonWithFloatingBox";

const TagButton = ({
  isTaggingBoxOpen,
  setIsTaggingBoxOpen,
  onAddTag,
  onRemoveTag,
  tags,
}) => {
  return (
    <IconButtonWithFloatingBox
      isOpen={isTaggingBoxOpen}
      setIsOpen={setIsTaggingBoxOpen}
      icon={faTag}
    >
      <TaggingBox
        setIsOpen={setIsTaggingBoxOpen}
        noteTags={tags}
        onAddTag={onAddTag}
        onRemoveTag={onRemoveTag}
      />
    </IconButtonWithFloatingBox>
  );
};

TagButton.propTypes = {
  isTaggingBoxOpen: PropTypes.bool.isRequired,
  setIsTaggingBoxOpen: PropTypes.func.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagButton;
