import React from "react";
import SidebarLink from "@components/layout/SidebarLink";
import styles from "./Sidebar.module.scss";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { useLayoutContext } from "@contexts/LayoutContext";

const Sidebar = () => {
  const { isSidebarOpen } = useLayoutContext();

  return (
    <nav className={`${styles.container} ${isSidebarOpen && styles.expanded}`}>
      <ul>
        <li>
          <SidebarLink icon={faNoteSticky} to="/">
            Notes
          </SidebarLink>
        </li>
        <li>
          <SidebarLink icon={faInbox} to="/archive">
            Archive
          </SidebarLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
