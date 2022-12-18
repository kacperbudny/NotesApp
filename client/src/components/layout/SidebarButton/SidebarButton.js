import React from "react";
import styles from "./SidebarButton.module.scss";
import PropTypes from "prop-types";
import SidebarItem from "@components/layout/SidebarItem";

const SidebarButton = ({ icon, onClick }) => {
  return (
    <button onClick={onClick} className={styles.buttonNoStyle}>
      <SidebarItem icon={icon}>Edit tags</SidebarItem>
    </button>
  );
};

SidebarButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
};

export default SidebarButton;
