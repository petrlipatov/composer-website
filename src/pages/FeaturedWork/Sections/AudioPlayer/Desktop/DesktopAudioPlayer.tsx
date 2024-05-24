import { useContext, useEffect, useState } from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import ControlButtons from "../../../../../components/AudioPlayer/Shared/ControlButtons/ControlButtons";
import Title from "../../../../../components/AudioPlayer/Simple/Title/Title";
import Artwork from "../../../../../components/AudioPlayer/Simple/Artwork/Artwork";
import CloseButton from "../../../../../components/AudioPlayer/Simple/CloseButton/CloseButton";
import VideoButton from "../../../../../components/AudioPlayer/Simple/VideoButton/VideoButton";

import { FeaturedWorkContext } from "../../../FeaturedWork";

import { FIRST_TRACK_INDEX } from "../../../../../utils/constants";

import s from "./DesktopAudioPlayer.module.css";

const DesktopAudioPlayer = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const {
    audioPlayerRef,
    currentProject,
    selectedTrackIndex,
    setIsPlayerOpened,
    setVideoID,
    setIsVideoPopupOpened,
    setSelectedProjectIndex,
    setSelectedTrackIndex,
  } = useContext(FeaturedWorkContext);

  const audioPlayer = audioPlayerRef.current;

  useEffect(
    function setListenersOnPlayerStates() {
      const onPlayingHandler = () => setIsAudioPlaying(true);
      const onPauseHandler = () => setIsAudioPlaying(false);
      const onEndedHandler = () => setIsAudioPlaying(false);

      if (audioPlayer) {
        audioPlayer.addEventListener("playing", onPlayingHandler);
        audioPlayer.addEventListener("pause", onPauseHandler);
        audioPlayer.addEventListener("ended", onEndedHandler);
      }

      return () => {
        if (audioPlayer) {
          audioPlayer.removeEventListener("playing", onPlayingHandler);
          audioPlayer.removeEventListener("pause", onPauseHandler);
          audioPlayer.removeEventListener("ended", onEndedHandler);
        }
      };
    },
    [audioPlayer]
  );

  // useEffect(() => {
  //   if (selectedTrackIndex || selectedTrackIndex === 0) {
  //     audioPlayer.src = currentProject.tracks[selectedTrackIndex].audioSrc;
  //     audioPlayer.play();
  //   }
  // }, [selectedTrackIndex, audioPlayer, currentProject.tracks]);

  const handlePlayPauseClick = () => {
    if (!selectedTrackIndex && selectedTrackIndex !== 0) {
      setSelectedTrackIndex(FIRST_TRACK_INDEX);
      audioPlayer.src = currentProject.tracks[FIRST_TRACK_INDEX].audioSrc;
    }

    if (isAudioPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  };

  const handlePlayNextClick = (prevOrNext: "next" | "prev") => {
    const tracksMaxIndex = currentProject.tracks.length - 1;
    let nextTrackIndex;

    if (prevOrNext === "next") {
      selectedTrackIndex + 1 > tracksMaxIndex
        ? (nextTrackIndex = 0)
        : (nextTrackIndex = selectedTrackIndex + 1);
    }

    if (prevOrNext === "prev") {
      selectedTrackIndex - 1 < 0
        ? (nextTrackIndex = tracksMaxIndex)
        : (nextTrackIndex = selectedTrackIndex - 1);
    }

    setSelectedTrackIndex(nextTrackIndex);
    audioPlayer.src = currentProject.tracks[nextTrackIndex].audioSrc;

    if (isAudioPlaying) {
      audioPlayer.play();
    }
  };

  const handleCloseClick = () => {
    audioPlayer.pause();
    setIsPlayerOpened(false);
    setSelectedTrackIndex(null);
    setSelectedProjectIndex(null);
  };

  const handleVideoClick = () => {
    setVideoID(currentProject.videoSrc);
    setIsVideoPopupOpened(true);
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  };

  return (
    <div className={s.player}>
      <Artwork src={currentProject.imageSrc} />
      <div className={s.playerControls}>
        <Title>
          {currentProject?.tracks[selectedTrackIndex || FIRST_TRACK_INDEX].name}
        </Title>
        <ControlButtons
          handlePlayPauseClick={handlePlayPauseClick}
          handlePlayNextClick={handlePlayNextClick}
          isAudioPlaying={isAudioPlaying}
        />
        <ProgressBar />
      </div>
      <VideoButton handleVideoClick={handleVideoClick} />
      <CloseButton handleCloseClick={handleCloseClick} />
    </div>
  );
};

export default DesktopAudioPlayer;