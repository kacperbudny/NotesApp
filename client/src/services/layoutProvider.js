const SIDEBAR_OPEN_KEY = "sidebar-open";

const layoutProvider = {
  getSidebarOpen: () => {
    const storedValue = JSON.parse(localStorage.getItem(SIDEBAR_OPEN_KEY));
    if (storedValue === null) {
      return true;
    }
    return storedValue;
  },
  setSidebarOpen: (isOpen) => {
    return localStorage.setItem(SIDEBAR_OPEN_KEY, JSON.stringify(isOpen));
  },
};

export default layoutProvider;
