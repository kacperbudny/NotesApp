import React from "react";
import styles from "./SidebarItem.module.scss";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutContext } from "@contexts/LayoutContext";

const SidebarItem = ({ isActive = false, icon, children }) => {
  const { isSidebarOpen } = useLayoutContext();

  return (
    <div className={`${styles.link} ${isActive && styles.activeLink}`}>
      <FontAwesomeIcon icon={icon} size="lg" className={styles.icon} />
      {isSidebarOpen && <span>{children}</span>}
    </div>
  );
};

SidebarItem.propTypes = {
  isActive: PropTypes.bool,
  icon: PropTypes.object.isRequired,
};

export default SidebarItem;
