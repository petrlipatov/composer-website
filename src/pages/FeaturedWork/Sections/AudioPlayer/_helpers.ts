import { PLAYER_CONTROLS } from "../../../../utils/constants";

export const calcNextTrackIndex = (currentIndex, maxIndex) => {
  return currentIndex + 1 > maxIndex ? 0 : currentIndex + 1;
};

export const calcPrevTrackIndex = (currentIndex, maxIndex) => {
  return currentIndex - 1 < 0 ? maxIndex : currentIndex - 1;
};

export const getNextTrackIndex = (
  direction: PLAYER_CONTROLS,
  selectedTrackIndex: number,
  tracksMaxIndex: number
): number => {
  switch (direction) {
    case PLAYER_CONTROLS.next:
      return calcNextTrackIndex(selectedTrackIndex, tracksMaxIndex);
    case PLAYER_CONTROLS.prev:
      return calcPrevTrackIndex(selectedTrackIndex, tracksMaxIndex);
    default:
      return selectedTrackIndex; // на случай, если направление не задано
  }
};
