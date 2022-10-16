import React from "react";
import SidebarLink from "@components/layout/SidebarLink";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <nav className={styles.container}>
      <SidebarLink to="/">Notes</SidebarLink>
      <SidebarLink to="/archive">Archive</SidebarLink>
    </nav>
  );
};

export default Sidebar;
