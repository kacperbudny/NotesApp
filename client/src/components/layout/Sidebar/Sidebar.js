import React from "react";
import SidebarLink from "@components/layout/SidebarLink";
import styles from "./Sidebar.module.scss";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";
import { faInbox, faTag, faPen } from "@fortawesome/free-solid-svg-icons";
import { useLayoutContext } from "@contexts/LayoutContext";
import { useNotesContext } from "@contexts/NotesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
              <SidebarLink icon={faTag} to={`/tag/${tag}`}>
                {tag}
              </SidebarLink>
            </li>
          ))}
        <li>
          <button onClick={openTagsModal}>
            <FontAwesomeIcon icon={faPen} size="lg" />
            Edit tags
          </button>
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
