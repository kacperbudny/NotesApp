import layoutProvider from "@services/layoutProvider";
import {
  createContext,
  createRef,
  useContext,
  useEffect,
  useState,
} from "react";

const LayoutContext = createContext();
const masonryRef = createRef();

export function LayoutProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    layoutProvider.getSidebarOpen()
  );

  const toggleSidebarOpen = () => {
    setIsSidebarOpen((prev) => !prev);

    if (masonryRef) {
      masonryRef.current.update();
    }
  };

  useEffect(() => {
    layoutProvider.setSidebarOpen(isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <LayoutContext.Provider
      value={{ isSidebarOpen, toggleSidebarOpen, masonryRef }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutContext() {
  return useContext(LayoutContext);
}

export default LayoutContext;
