import { forwardRef, useContext } from "react";
import { PiecesContext } from "../../Pieces";
import ProgressBar from "./ProgressBar/ProgressBar";

import s from "./AudioPlayer.module.css";
import ControlButtons from "../../../../components/AudioPlayer/Shared/ControlButtons/ControlButtons";
import Title from "../../../../components/AudioPlayer/Simple/Title/Title";
import Artwork from "../../../../components/AudioPlayer/Simple/Artwork/Artwork";
import VideoButton from "../../../../components/AudioPlayer/Simple/VideoButton/VideoButton";
import CloseButton from "../../../../components/AudioPlayer/Simple/CloseButton/CloseButton";
import {
  terminatePlayer,
  playPauseTrack,
  setNextTrack,
} from "../../../../utils/helpers/piecesPlayer";
import { PLAYER_STATE } from "../../_constants";

forwardRef;

const AudioPlayer = () => {
  const {
    filteredPieces,
    player,
    setIsVideoPopupOpened,
    setSelectedTrackIndex,
    setPlayer,
    setVideoID,
  } = useContext(PiecesContext);

  const handlePlayPauseClick = () => {
    playPauseTrack(player, setPlayer);
  };

  const handlePlayNextClick = (direction: "next" | "prev") => {
    let nextTrackIndex: number;

    switch (direction) {
      case "next":
        nextTrackIndex = player.data.index + 1;
        break;
      case "prev":
        nextTrackIndex = player.data.index - 1;
        break;
    }

    const nextTrackData = filteredPieces[nextTrackIndex];

    if (nextTrackData) {
      setNextTrack(player, setPlayer, nextTrackIndex, nextTrackData);
      setSelectedTrackIndex(nextTrackIndex);
    }
  };

  const handleVideoClick = () => {
    setVideoID(player.data.video);
    setIsVideoPopupOpened(true);
    terminatePlayer(setPlayer);
  };

  const handleCloseClick = () => {
    terminatePlayer(setPlayer);
  };

  return (
    <div className={s.player}>
      <div className={s.content}>
        <Artwork src={player.data.image} />
        <div className={s.playerControls}>
          <Title>{player.data.name}</Title>
          <ControlButtons
            handlePlayPauseClick={handlePlayPauseClick}
            handlePlayNextClick={handlePlayNextClick}
            isAudioPlaying={player.status === PLAYER_STATE.Playing}
          />
          <ProgressBar />
        </div>
        <VideoButton handleVideoClick={handleVideoClick} />
        <CloseButton onClick={handleCloseClick} />
      </div>
    </div>
  );
};

export default AudioPlayer;
