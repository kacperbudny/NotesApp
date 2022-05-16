import { NOTE_WIDTH, NOTE_MARGIN } from "@constants/noteDimensions";

function calculateBreakpoints() {
  let breakpointCols = {};
  for (let i = 0; i < 10; i++) {
    breakpointCols[(NOTE_WIDTH + NOTE_MARGIN * 2) * (i + 1) - 1] = i;
  }
  return breakpointCols;
}

export default calculateBreakpoints;
