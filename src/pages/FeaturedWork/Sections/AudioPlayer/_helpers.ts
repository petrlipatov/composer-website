export const calcNextTrackIndex = (currentIndex, maxIndex) => {
  return currentIndex + 1 > maxIndex ? 0 : currentIndex + 1;
};

export const calcPrevTrackIndex = (currentIndex, maxIndex) => {
  return currentIndex - 1 < 0 ? maxIndex : currentIndex - 1;
};
