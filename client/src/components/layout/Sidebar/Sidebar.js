import React from "react";
import SidebarLink from "@components/layout/SidebarLink";
import styles from "./Sidebar.module.scss";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";
import { faInbox, faTag, faPen } from "@fortawesome/free-solid-svg-icons";
import { useLayoutContext } from "@contexts/LayoutContext";
import { useNotesContext } from "@contexts/NotesContext";
import SidebarButton from "@components/layout/SidebarButton";

const Sidebar = () => {
  const { isSidebarOpen, setIsTagsModalOpen } = useLayoutContext();
  const { tags } = useNotesContext();

  const openTagsModal = () => {
    setIsTagsModalOpen(true);
  };

  return (
    <nav className={`${styles.container} ${isSidebarOpen && styles.expanded}`}>
      <ul>
        <li>
          <SidebarLink icon={faNoteSticky} to="/">
            Notes
          </SidebarLink>
        </li>
        {tags.length > 0 &&
          tags.map((tag) => (
            <li key={tag}>
              <SidebarLink icon={faTag} to={`/tag/${encodeURIComponent(tag)}`}>
                {tag}
              </SidebarLink>
            </li>
          ))}
        <li>
          <SidebarButton onClick={openTagsModal} icon={faPen}>
            Edit tags
          </SidebarButton>
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
