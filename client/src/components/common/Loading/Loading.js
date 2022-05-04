import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
  return (
    <div className="loading-container">
      <FontAwesomeIcon
        icon={faCircleNotch}
        className="loading-icon"
        spin
        size="5x"
      />
    </div>
  );
};

export default Loading;
