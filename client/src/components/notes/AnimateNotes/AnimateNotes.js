import React, { useState, useEffect, useLayoutEffect } from "react";
import Masonry from "react-masonry-css";
import { NOTE_WIDTH, NOTE_MARGIN } from "@constants/noteDimensions";
import useWindowSize from "@hooks/useWindowSize";
import styles from "../Notes/Notes.module.scss";
import calculateBoundingBoxes from "@utils/calculateBoundingBoxes";
import usePrevious from "@hooks/usePrevious";

const AnimateNotes = ({ children }) => {
  const [columnCount, setColumnCount] = useState();
  const windowSize = useWindowSize();

  const [boundingBox, setBoundingBox] = useState({});
  const [prevBoundingBox, setPrevBoundingBox] = useState({});
  const prevChildren = usePrevious(children);

  useEffect(() => {
    setColumnCount(
      Math.floor(windowSize.width / (NOTE_WIDTH + NOTE_MARGIN * 2))
    );
  }, [windowSize]);

  useLayoutEffect(() => {
    console.log(columnCount);
    const newBoundingBox = calculateBoundingBoxes(children);
    setBoundingBox(newBoundingBox);
  }, [children, columnCount]);

  useLayoutEffect(() => {
    const prevBoundingBox = calculateBoundingBoxes(prevChildren);
    setPrevBoundingBox(prevBoundingBox);
  }, [prevChildren, columnCount]);

  useEffect(() => {
    const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;

    if (hasPrevBoundingBox) {
      React.Children.forEach(children, (child) => {
        if (!prevBoundingBox[child.key]) return;
        const domNode = child.ref.current;
        const firstBox = prevBoundingBox[child.key];
        const lastBox = boundingBox[child.key];
        const changeInX = firstBox.left - lastBox.left;

        if (changeInX) {
          requestAnimationFrame(() => {
            domNode.style.transform = `translateX(${changeInX}px)`;
            domNode.style.transition = "transform 0s";

            requestAnimationFrame(() => {
              domNode.style.transform = "";
              domNode.style.transition = "transform 500ms";
            });
          });
        }
      });
    }
  }, [boundingBox, prevBoundingBox, children]);

  return (
    <Masonry
      className={styles.notesGrid}
      breakpointCols={columnCount}
      style={{
        width: `${(NOTE_WIDTH + NOTE_MARGIN * 2) * columnCount}px`,
      }}
    >
      {children}
    </Masonry>
  );
};

export default AnimateNotes;
