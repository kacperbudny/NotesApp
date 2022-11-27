import React from "react";
import SidebarLink from "@components/layout/SidebarLink";
import styles from "./Sidebar.module.scss";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";
import { faInbox, faTag } from "@fortawesome/free-solid-svg-icons";
import { useLayoutContext } from "@contexts/LayoutContext";
import { useNotesContext } from "@contexts/NotesContext";

const Sidebar = () => {
  const { isSidebarOpen } = useLayoutContext();
  const { tags } = useNotesContext();

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
        {tags.length > 0 &&
          tags.map((tag) => (
            <li key={tag}>
              <SidebarLink icon={faTag} to={`/tag/${tag}`}>
                {tag}
              </SidebarLink>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
