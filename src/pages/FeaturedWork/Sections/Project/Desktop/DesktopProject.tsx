import { useContext, useEffect, useState } from "react";
import cn from "classnames";

import Artwork from "../../../../../components/Project/Artwork/Artwork";
import Title from "../../../../../components/Project/Title/Title";
import Description from "../../../../../components/Project/Description/Description";

import Info from "../../../../../components/AudioPlayer/Extended/Info/Info";
import Scrollbar from "../../../../../components/AudioPlayer/Extended/Scrollbar/Scrollbar";
import AudioTrack from "../../../../../components/AudioPlayer/Extended/AudioTrack/AudioTrack";

import { FeaturedWorkContext } from "../../../FeaturedWork";

import { ProjectProps } from "../types";

import s from "./DesktopProject.module.css";

const DesktopProject = ({
  index: projectIndex,
  data,
  isSelected,
  setSelectedProjectIndex,
}: ProjectProps) => {
  const {
    selectedProjectIndex,
    selectedTrackIndex,
    audioPlayerRef,
    setCurrentProject,
    setIsPlayerOpened,
    setSelectedTrackIndex,
    setVideoID,
    setIsVideoPopupOpened,
  } = useContext(FeaturedWorkContext);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

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

  const isTrackPlaying = (trackIndex) => {
    return (
      selectedProjectIndex === projectIndex &&
      isAudioPlaying &&
      selectedTrackIndex === trackIndex
    );
  };

  const isTrackSelected = (trackIndex) => {
    return (
      selectedProjectIndex === projectIndex && selectedTrackIndex === trackIndex
    );
  };

  const handleVideoClick = () => {
    setVideoID(data.videoSrc);
    setIsVideoPopupOpened(true);
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  };

  const handleProjectClick = () => {
    if (selectedProjectIndex !== projectIndex) {
      setSelectedTrackIndex(null);
      setSelectedProjectIndex(projectIndex);
      setCurrentProject(data);
      setIsPlayerOpened(true);
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
  };

  const handleTrackClick = (src: string, trackIndex: number) => {
    setSelectedProjectIndex(projectIndex);
    setCurrentProject(data);
    setIsPlayerOpened(true);
    setSelectedTrackIndex(trackIndex);
    audioPlayer.src = src;
    audioPlayer.play();
  };

  return (
    <div className={s.container}>
      <div className={s.artworkContainer}>
        <Artwork src={data.imageSrc} />

        <div
          className={cn(s.player, isSelected ? s.playerActive : "")}
          onClick={handleProjectClick}
        >
          <Info data={data} handleVideoClick={handleVideoClick} />
          <Scrollbar>
            {data.tracks.map((track, i) => (
              <AudioTrack
                index={i}
                track={track}
                isTrackPlaying={isTrackPlaying(i)}
                isTrackSelected={isTrackSelected(i)}
                handleTrackClick={handleTrackClick}
                key={track.name}
              />
            ))}
          </Scrollbar>
        </div>
      </div>

      <Title>{data.name}</Title>
      <Description>{data.genre}</Description>
    </div>
  );
};

export default DesktopProject;
