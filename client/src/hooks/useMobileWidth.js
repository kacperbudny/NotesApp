import { useEffect, useState } from "react";

const mobileWidthQuery = "(max-width: 850px)";

function useMobileWidth() {
  const getMatches = () => {
    if (typeof window !== "undefined") {
      return window.matchMedia(mobileWidthQuery).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(getMatches(mobileWidthQuery));

  useEffect(() => {
    function handleChange() {
      setMatches(getMatches(mobileWidthQuery));
    }

    const matchMedia = window.matchMedia(mobileWidthQuery);

    handleChange();

    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
  }, []);

  return matches;
}

export default useMobileWidth;
