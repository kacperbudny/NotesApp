import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import SidebarItem from "@components/layout/SidebarItem";

const SidebarLink = ({ children, icon, to }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <SidebarItem isActive={isActive} icon={icon}>
          {children}
        </SidebarItem>
      )}
    </NavLink>
  );
};

SidebarLink.propTypes = {
  icon: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
};

export default SidebarLink;
