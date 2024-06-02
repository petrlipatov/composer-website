import { useContext, useState } from "react";
import { PiecesContext } from "../../Pieces";
import ProgressBar from "./ProgressBar/ProgressBar";

import s from "./AudioPlayer.module.css";
import ControlButtons from "../../../../components/AudioPlayer/Shared/ControlButtons/ControlButtons";
import Title from "../../../../components/AudioPlayer/Simple/Title/Title";
import Artwork from "../../../../components/AudioPlayer/Simple/Artwork/Artwork";
import VideoButton from "../../../../components/AudioPlayer/Simple/VideoButton/VideoButton";
import CloseButton from "../../../../components/AudioPlayer/Simple/CloseButton/CloseButton";
import useAudioPlayerListeners from "../../../../utils/hooks/useAudioPlayerListeners";
import {
  PlayPauseCallback,
  VideoCalback,
} from "../../../../utils/helpers/audioPlayer";

const AudioPlayer = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const {
    filteredPieces,
    currentAudioData,
    audioPlayerRef,
    setIsPlayerOpened,
    setCurrentAudioData,
    setVideoID,
    setIsVideoPopupOpened,
  } = useContext(PiecesContext);

  const audioPlayer = audioPlayerRef.current;

  useAudioPlayerListeners(audioPlayer, setIsAudioPlaying);

  const handlePlayPauseClick = () => {
    PlayPauseCallback(audioPlayer, isAudioPlaying);
  };

  const handlePlayNextClick = (prevOrNext) => {
    let nextSongIndex = 0;

    prevOrNext === "next"
      ? (nextSongIndex = currentAudioData?.index + 1)
      : (nextSongIndex = currentAudioData?.index - 1);

    const nextTrack = filteredPieces[nextSongIndex];

    if (nextTrack) {
      audioPlayer.src = nextTrack.audioSrc;
      setCurrentAudioData({
        index: filteredPieces.indexOf(nextTrack),
        ...nextTrack,
      });
    }
    if (nextTrack && isAudioPlaying) {
      audioPlayer.play();
    }
  };

  const handleVideoClick = () => {
    VideoCalback(
      audioPlayer,
      currentAudioData,
      setIsPlayerOpened,
      setVideoID,
      setIsVideoPopupOpened
    );
  };

  const handleCloseClick = () => {
    audioPlayer.pause();
    audioPlayer.src = "";
    setIsAudioPlaying(false);
    setIsPlayerOpened(false);
  };

  return (
    <div className={s.player}>
      <div className={s.content}>
        <Artwork src={currentAudioData?.imageSrc} />

        <div className={s.playerControls}>
          <Title>{currentAudioData?.name}</Title>
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
    </div>
  );
};

export default AudioPlayer;
