import { useContext } from "react";
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
import {
  FIRST_TRACK_INDEX,
  PLAYER_STATUS,
} from "../../../../../utils/constants";
import { EXTENDED_PLAYER_ACTION_TYPE } from "../../../_types";

const DesktopProject = ({
  index: projectIndex,
  data,
  isSelected,
}: //
ProjectProps) => {
  const {
    selectedProjectIndex,
    setSelectedProjectIndex,
    player,
    setVideoID,
    setIsVideoPopupOpened,
    dispatchPlayerAction,
  } = useContext(FeaturedWorkContext);

  const isTrackPlaying = (i) => {
    return (
      selectedProjectIndex === projectIndex &&
      player.status === PLAYER_STATUS.PLAYING &&
      player.selectedTrackIndex === i
    );
  };

  const isTrackSelected = (trackIndex) => {
    return (
      selectedProjectIndex === projectIndex &&
      player.selectedTrackIndex === trackIndex
    );
  };

  const handleVideoClick = (e: Event) => {
    e.stopPropagation();
    dispatchPlayerAction({
      type: EXTENDED_PLAYER_ACTION_TYPE.PLAYER_TERMINATED,
    });
    setVideoID(data.video);
    setIsVideoPopupOpened(true);
  };

  const handleProjectClick = () => {
    if (selectedProjectIndex !== projectIndex) {
      setSelectedProjectIndex(projectIndex);

      dispatchPlayerAction({ type: EXTENDED_PLAYER_ACTION_TYPE.AUDIO_PAUSED });

      dispatchPlayerAction({
        type: EXTENDED_PLAYER_ACTION_TYPE.PROJECT_DATA_SET,
        payload: data,
      });

      dispatchPlayerAction({
        type: EXTENDED_PLAYER_ACTION_TYPE.TRACK_SELECTED,
        payload: FIRST_TRACK_INDEX,
      });

      dispatchPlayerAction({ type: EXTENDED_PLAYER_ACTION_TYPE.PLAYER_OPENED });
      dispatchPlayerAction({ type: EXTENDED_PLAYER_ACTION_TYPE.AUDIO_PLAYED });
    }
  };

  const handleTrackClick = (trackIndex: number) => {
    setSelectedProjectIndex(projectIndex);

    dispatchPlayerAction({
      type: EXTENDED_PLAYER_ACTION_TYPE.PROJECT_DATA_SET,
      payload: data,
    });

    dispatchPlayerAction({
      type: EXTENDED_PLAYER_ACTION_TYPE.TRACK_SELECTED,
      payload: trackIndex,
    });

    dispatchPlayerAction({ type: EXTENDED_PLAYER_ACTION_TYPE.AUDIO_PLAYED });
    dispatchPlayerAction({ type: EXTENDED_PLAYER_ACTION_TYPE.PLAYER_OPENED });
  };

  return (
    <div className={s.container}>
      <div className={s.artworkContainer}>
        <Artwork src={data.image} />

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
