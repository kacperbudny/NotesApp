import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./SidebarLink.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutContext } from "@contexts/LayoutContext";

const SidebarLink = ({ children, icon, to }) => {
  const { isSidebarOpen } = useLayoutContext();

  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div className={`${styles.link} ${isActive && styles.activeLink}`}>
          <FontAwesomeIcon icon={icon} size="lg" className={styles.icon} />
          {isSidebarOpen && <span>{children}</span>}
        </div>
      )}
    </NavLink>
  );
};

SidebarLink.propTypes = {
  icon: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
};

export default SidebarLink;
