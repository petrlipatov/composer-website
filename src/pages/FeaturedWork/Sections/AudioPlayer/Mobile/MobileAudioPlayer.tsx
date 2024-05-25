import { useContext, useEffect, useState } from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import ControlButtons from "../../../../../components/AudioPlayer/Shared/ControlButtons/ControlButtons";
import Title from "../../../../../components/AudioPlayer/Extended/Title/Title";
import AudioTrack from "../../../../../components/AudioPlayer/Extended/AudioTrack/AudioTrack";
import Info from "../../../../../components/AudioPlayer/Extended/Info/Info";
import Scrollbar from "../../../../../components/AudioPlayer/Extended/Scrollbar/Scrollbar";

import { FeaturedWorkContext } from "../../../FeaturedWork";

import closeIcon from "../../../../../assets/images/close-icon_black.svg";
import { FIRST_TRACK_INDEX } from "../../../../../utils/constants";

import s from "./MobileAudioPlayer.module.css";

const MobileAudioPlayer = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playingTrackIndex, setPlayingTrackIndex] = useState<number>(null);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(null);

  const {
    currentProject,
    setIsPlayerOpened,
    setVideoID,
    setIsVideoPopupOpened,
    audioPlayerRef,
  } = useContext(FeaturedWorkContext);

  const audioPlayer = audioPlayerRef.current;

  useEffect(
    function playFirstTrackOnMount() {
      setPlayingTrackIndex(FIRST_TRACK_INDEX);
      setSelectedTrackIndex(FIRST_TRACK_INDEX);
      audioPlayer.src = currentProject.tracks[FIRST_TRACK_INDEX].audioSrc;
      console.log("useEffect");
      const playAudio = () => {
        console.log("callback");
        audioPlayer.play().catch((err) => {
          console.log("Error playing audio:", err);
        });
      };

      if (audioPlayer) {
        audioPlayer.addEventListener("canplay", playAudio, { once: true });
      }

      return () => {
        if (audioPlayer) {
          audioPlayer.removeEventListener("canplay", playAudio);
        }
      };
    },
    [audioPlayer, currentProject.tracks]
  );

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

  const isTrackPlaying = (i) => {
    return isAudioPlaying && playingTrackIndex === i;
  };

  const isTrackSelected = (i) => {
    return selectedTrackIndex === i;
  };

  const handlePlayPauseClick = () => {
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
      playingTrackIndex + 1 > tracksMaxIndex
        ? (nextTrackIndex = 0)
        : (nextTrackIndex = playingTrackIndex + 1);
    }

    if (prevOrNext === "prev") {
      playingTrackIndex - 1 < 0
        ? (nextTrackIndex = tracksMaxIndex)
        : (nextTrackIndex = playingTrackIndex - 1);
    }

    setSelectedTrackIndex(nextTrackIndex);
    setPlayingTrackIndex(nextTrackIndex);
    audioPlayer.src = currentProject.tracks[nextTrackIndex].audioSrc;

    if (isAudioPlaying) {
      audioPlayer.play();
    }
  };

  const handleTrackClick = (audioSrc: string, index: number) => {
    setSelectedTrackIndex(index);
    setPlayingTrackIndex(index);
    audioPlayer.src = audioSrc;
    audioPlayer.play();
  };

  const handleCloseClick = () => {
    audioPlayer.pause();
    setIsPlayerOpened(false);
    setPlayingTrackIndex(null);
    setSelectedTrackIndex(null);
  };

  const handleVideoClick = (e) => {
    e.stopPropagation();
    setIsPlayerOpened(false);
    setVideoID(currentProject.videoSrc);
    audioPlayer.src = "";
    setIsVideoPopupOpened(true);
  };

  return (
    <div className={s.section}>
      <img className={s.closeIcon} src={closeIcon} onClick={handleCloseClick} />

      <Info data={currentProject} handleVideoClick={handleVideoClick} />

      <Scrollbar>
        {currentProject?.tracks.map((track, i) => {
          return (
            <AudioTrack
              key={i}
              index={i}
              track={track}
              isTrackPlaying={isTrackPlaying(i)}
              isTrackSelected={isTrackSelected(i)}
              handleTrackClick={handleTrackClick}
            />
          );
        })}
      </Scrollbar>

      <div className={s.playerContainer}>
        <Title
          selectedTrackIndex={selectedTrackIndex}
          currentProject={currentProject}
        />

        <ControlButtons
          handlePlayPauseClick={handlePlayPauseClick}
          handlePlayNextClick={handlePlayNextClick}
          isAudioPlaying={isAudioPlaying}
        />

        <ProgressBar />
      </div>
    </div>
  );
};

export default MobileAudioPlayer;
