export const PlayPauseCallback = (audioPlayer, isAudioPlaying) => {
  if (isAudioPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer.play();
  }
};

export const VideoCalback = (
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
