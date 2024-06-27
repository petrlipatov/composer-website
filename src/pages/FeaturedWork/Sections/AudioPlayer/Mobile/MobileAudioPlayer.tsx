import { useContext, useEffect, useRef, useState } from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import ControlButtons from "../../../../../components/AudioPlayer/Shared/ControlButtons/ControlButtons";
import Title from "../../../../../components/AudioPlayer/Extended/Title/Title";
import AudioTrack from "../../../../../components/AudioPlayer/Extended/AudioTrack/AudioTrack";
import Info from "../../../../../components/AudioPlayer/Extended/Info/Info";
import Scrollbar from "../../../../../components/AudioPlayer/Extended/Scrollbar/Scrollbar";
import CloseButton from "../../../../../components/AudioPlayer/Simple/CloseButton/CloseButton";

import { FeaturedWorkContext } from "../../../FeaturedWork";
import {
  playPauseCallback,
  watchVideoCallback,
} from "../../../../../utils/helpers/audioPlayer";
import usePlayingAudioStates from "../../../../../utils/hooks/usePlayingAudioStates";

import {
  FIRST_TRACK_INDEX,
  PLAYER_CONTROLS,
} from "../../../../../utils/constants";

import s from "./MobileAudioPlayer.module.css";
import { calcNextTrackIndex, calcPrevTrackIndex } from "../_helpers";

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

  const audioPlayer = audioPlayerRef.current;

  usePlayingAudioStates(audioPlayer, setIsAudioPlaying);

  useEffect(
    function scrollSelectedTrackIntoView() {
      const tracksContainer = tracksContainerRef.current;
      const selectedTrack = tracksRefs.current[selectedTrackIndex];

      if (selectedTrack && tracksContainer) {
        const { top, bottom } = selectedTrack.getBoundingClientRect();
        const { top: containerTop, bottom: containerBottom } =
          tracksContainer.getBoundingClientRect();
        const isTrackVisible = top >= containerTop && bottom <= containerBottom;
        if (!isTrackVisible) {
          selectedTrack.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    },
    [selectedTrackIndex]
  );

  const isTrackPlaying = (i) => {
    return isAudioPlaying && playingTrackIndex === i;
  };

  const isTrackSelected = (i) => {
    return selectedTrackIndex === i;
  };

  const handlePlayPauseClick = () => {
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
    watchVideoCallback(
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
