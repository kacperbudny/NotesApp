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
  refreshMasonry: () => {},
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
    refreshMasonry(250);
  };

  const refreshMasonry = (delayInMs) => {
    Object.values(masonryRefs).forEach((ref) => {
      if (ref.current) {
        setTimeout(() => ref.current.update(), delayInMs);
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
        refreshMasonry,
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
