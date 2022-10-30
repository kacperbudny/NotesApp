import { createContext, createRef, useContext, useState } from "react";

const LayoutContext = createContext();
const masonryRef = createRef();

export function LayoutProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebarOpen = () => {
    setIsSidebarOpen((prev) => !prev);

    if (masonryRef) {
      masonryRef.current.update();
    }
  };

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
