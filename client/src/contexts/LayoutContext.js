import layoutProvider from "@services/layoutProvider";
import {
  createContext,
  createRef,
  useContext,
  useEffect,
  useState,
} from "react";

const LayoutContext = createContext({
  isSidebarOpen: false,
  toggleSidebarOpen: () => {},
  isTagsModalOpen: false,
  setIsTagsModalOpen: () => {},
  masonryRefs: {},
});

const masonryRefs = {
  archived: createRef(),
  other: createRef(),
  pinned: createRef(),
};

export function LayoutProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    layoutProvider.getSidebarOpen()
  );
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);

  const toggleSidebarOpen = () => {
    setIsSidebarOpen((prev) => !prev);

    Object.values(masonryRefs).forEach((ref) => {
      if (ref.current) {
        setTimeout(() => ref.current.update(), 250);
      }
    });
  };

  useEffect(() => {
    layoutProvider.setSidebarOpen(isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebarOpen,
        isTagsModalOpen,
        setIsTagsModalOpen,
        masonryRefs,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutContext() {
  return useContext(LayoutContext);
}

export default LayoutContext;
