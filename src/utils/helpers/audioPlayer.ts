export const playPauseCallback = (audioPlayer, isAudioPlaying) => {
  if (isAudioPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer.play();
  }
};

export const watchVideoCallback = (
  audioPlayer,
  currentAudioData,
  setIsPlayerOpened,
  setVideoID,
  setIsVideoPopupOpened
) => {
  setIsPlayerOpened(false);
  setVideoID(currentAudioData?.videoSrc);
  audioPlayer.pause();
  audioPlayer.src = "";
  setIsVideoPopupOpened(true);
};
