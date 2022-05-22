import React, { useState, useEffect, useLayoutEffect } from "react";
import Masonry from "react-masonry-css";
import { NOTE_WIDTH, NOTE_MARGIN } from "@constants/noteDimensions";
import useWindowSize from "@hooks/useWindowSize";
import styles from "./AnimateNotes.module.scss";
import calculateBoundingBoxes from "@utils/calculateBoundingBoxes";
import usePrevious from "@hooks/usePrevious";
import calculateBreakpoints from "@utils/calculateBreakpoints";

const AnimateNotes = ({ children }) => {
  const [columnCount, setColumnCount] = useState();
  const windowSize = useWindowSize();
  const [boundingBox, setBoundingBox] = useState({});
  const [prevBoundingBox, setPrevBoundingBox] = useState({});
  const prevChildren = usePrevious(children);

  useLayoutEffect(() => {
    setColumnCount(
      Math.floor(windowSize.width / (NOTE_WIDTH + NOTE_MARGIN * 2))
    );
  }, [windowSize]);

  useLayoutEffect(() => {
    const newBoundingBox = calculateBoundingBoxes(children);
    setBoundingBox(newBoundingBox);
    console.log(newBoundingBox);
  }, [children, windowSize]);

  useLayoutEffect(() => {
    const prevBoundingBox = calculateBoundingBoxes(prevChildren);
    setPrevBoundingBox(prevBoundingBox);
  }, [prevChildren, windowSize]);

  useEffect(() => {
    const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;
    if (!hasPrevBoundingBox) return;

    React.Children.forEach(children, (child) => {
      if (!prevBoundingBox[child.key]) return;

      const domNode = child.ref.current;
      const firstBox = prevBoundingBox[child.key];
      const lastBox = boundingBox[child.key];
      const changeInX = firstBox.left - lastBox.left;
      const changeInY = firstBox.top - lastBox.top;

      if (changeInX || changeInY) {
        requestAnimationFrame(() => {
          domNode.style.transform = `translate(${changeInX}px, ${changeInY}px)`;
          domNode.style.transition = "transform 0s";

          requestAnimationFrame(() => {
            domNode.style.transform = "";
            domNode.style.transition = "transform 500ms";
          });
        });
      }
    });
  }, [boundingBox, prevBoundingBox, children, windowSize]);

  return (
    <Masonry
      className={styles.notesGrid}
      breakpointCols={calculateBreakpoints()}
      style={{
        width: `${(NOTE_WIDTH + NOTE_MARGIN * 2) * columnCount}px`,
      }}
    >
      {children}
    </Masonry>
  );
};

export default AnimateNotes;
