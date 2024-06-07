import { useContext, useState } from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import ControlButtons from "../../../../../components/AudioPlayer/Shared/ControlButtons/ControlButtons";
import Title from "../../../../../components/AudioPlayer/Simple/Title/Title";
import Artwork from "../../../../../components/AudioPlayer/Simple/Artwork/Artwork";
import CloseButton from "../../../../../components/AudioPlayer/Simple/CloseButton/CloseButton";
import VideoButton from "../../../../../components/AudioPlayer/Simple/VideoButton/VideoButton";

import { FeaturedWorkContext } from "../../../FeaturedWork";

import {
  FIRST_TRACK_INDEX,
  PLAYER_CONTROLS,
} from "../../../../../utils/constants";

import s from "./DesktopAudioPlayer.module.css";
import usePlayingAudioStates from "../../../../../utils/hooks/usePlayingAudioStates";
import {
  playPauseCallback,
  watchVideoCallback,
} from "../../../../../utils/helpers/audioPlayer";
import { calcNextTrackIndex, calcPrevTrackIndex } from "../_helpers";

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

  usePlayingAudioStates(audioPlayer, setIsAudioPlaying);

  const handlePlayPauseClick = () => {
    if (!selectedTrackIndex && selectedTrackIndex !== 0) {
      setSelectedTrackIndex(FIRST_TRACK_INDEX);
      audioPlayer.src = currentProject.tracks[FIRST_TRACK_INDEX].audioSrc;
    }

    playPauseCallback(audioPlayer, isAudioPlaying);
  };

  const handlePlayNextClick = (prevOrNext: PLAYER_CONTROLS) => {
    const tracksMaxIndex = currentProject.tracks.length - 1;
    let nextTrackIndex;

    if (prevOrNext === PLAYER_CONTROLS.next)
      nextTrackIndex = calcNextTrackIndex(selectedTrackIndex, tracksMaxIndex);

    if (prevOrNext === PLAYER_CONTROLS.prev)
      nextTrackIndex = calcPrevTrackIndex(selectedTrackIndex, tracksMaxIndex);

    setSelectedTrackIndex(nextTrackIndex);
    audioPlayer.src = currentProject.tracks[nextTrackIndex].audioSrc;

    if (isAudioPlaying) audioPlayer.play();
  };

  const handleCloseClick = () => {
    audioPlayer.pause();
    setIsPlayerOpened(false);
    setSelectedTrackIndex(null);
    setSelectedProjectIndex(null);
  };

  const handleVideoClick = () => {
    watchVideoCallback(
      audioPlayer,
      currentProject,
      setIsPlayerOpened,
      setVideoID,
      setIsVideoPopupOpened
    );
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
      <CloseButton onClick={handleCloseClick} />
    </div>
  );
};

export default DesktopAudioPlayer;
