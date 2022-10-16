import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarLink = ({ children, icon, to }) => {
  return (
    <NavLink to={to}>
      <FontAwesomeIcon icon={faNoteSticky} /> {children}
    </NavLink>
  );
};

SidebarLink.propTypes = {
  icon: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default SidebarLink;
