import { useContext, useEffect, useRef, useState } from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import ControlButtons from "../../../../../components/AudioPlayer/Shared/ControlButtons/ControlButtons";
import Title from "../../../../../components/AudioPlayer/Extended/Title/Title";
import AudioTrack from "../../../../../components/AudioPlayer/Extended/AudioTrack/AudioTrack";
import Info from "../../../../../components/AudioPlayer/Extended/Info/Info";
import Scrollbar from "../../../../../components/AudioPlayer/Extended/Scrollbar/Scrollbar";
import CloseButton from "../../../../../components/AudioPlayer/Simple/CloseButton/CloseButton";

import { FeaturedWorkContext } from "../../../FeaturedWork";
import { VideoCalback } from "../../../../../utils/helpers/audioPlayer";
import usePlayingAudioStates from "../../../../../utils/hooks/usePlayingAudioStates";

import { FIRST_TRACK_INDEX } from "../../../../../utils/constants";

import s from "./MobileAudioPlayer.module.css";

const MobileAudioPlayer = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playingTrackIndex, setPlayingTrackIndex] =
    useState<number>(FIRST_TRACK_INDEX);
  const [selectedTrackIndex, setSelectedTrackIndex] =
    useState<number>(FIRST_TRACK_INDEX);

  const {
    currentProject,
    setIsPlayerOpened,
    setVideoID,
    setIsVideoPopupOpened,
    audioPlayerRef,
  } = useContext(FeaturedWorkContext);

  const tracksContainerRef = useRef(null);
  const tracksRefs = useRef([]);

  const tracksContainer = tracksContainerRef.current;
  const audioPlayer = audioPlayerRef.current;

  usePlayingAudioStates(audioPlayer, setIsAudioPlaying);

  useEffect(() => {
    const selectedTrackRef = tracksRefs.current[selectedTrackIndex];

    if (selectedTrackRef && tracksContainer) {
      const { top, bottom } = selectedTrackRef.getBoundingClientRect();
      const { top: containerTop, bottom: containerBottom } =
        tracksContainer.getBoundingClientRect();
      const isTrackVisible = top >= containerTop && bottom <= containerBottom;
      if (!isTrackVisible) {
        selectedTrackRef.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [selectedTrackIndex, tracksContainer]);

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

  const handleVideoClick = () => {
    VideoCalback(
      audioPlayer,
      currentProject,
      setIsPlayerOpened,
      setVideoID,
      setIsVideoPopupOpened
    );
  };

  return (
    <div className={s.section}>
      <CloseButton onClick={handleCloseClick} />
      <Info data={currentProject} handleVideoClick={handleVideoClick} />
      <Scrollbar ref={tracksContainerRef}>
        {currentProject.tracks.map((track, i) => {
          return (
            <AudioTrack
              key={i}
              index={i}
              track={track}
              isTrackPlaying={isTrackPlaying(i)}
              isTrackSelected={isTrackSelected(i)}
              handleTrackClick={handleTrackClick}
              ref={(el) => (tracksRefs.current[i] = el)}
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
