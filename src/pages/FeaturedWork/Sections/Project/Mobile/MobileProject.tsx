import { useEffect, useContext } from "react";
import cn from "classnames";

import Title from "../../../../../components/Project/Title/Title";
import Description from "../../../../../components/Project/Description/Description";
import Artwork from "../../../../../components/Project/Artwork/Artwork";
import TvIcon from "../../../../../components/Icons/TvIcon/TvIcon";
import HeadphonesIcon from "../../../../../components/Icons/HeadphonesIcon/HeadphonesIcon";

import { FeaturedWorkContext } from "../../../FeaturedWork";

import { FIRST_TRACK_INDEX } from "../../../../../utils/constants";

import { ProjectProps } from "../types";

import s from "./MobileProject.module.css";
import HorizontalOverlayButton from "../../../../../components/Buttons/HorizontalOverlayButton/HorizontalOverlayButton";

const MobileProject = ({
  index,
  data,
  isSelected,
  setSelectedProjectIndex,
}: ProjectProps) => {
  const {
    audioPlayerRef,
    setIsPlayerOpened,
    setCurrentProject,
    setVideoID,
    setIsVideoPopupOpened,
  } = useContext(FeaturedWorkContext);

  const audioPlayer = audioPlayerRef.current;

  useEffect(() => {
    if (isSelected) {
      const timer = setTimeout(() => {
        setSelectedProjectIndex(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isSelected, setSelectedProjectIndex, index]);

  function handleProjectClick() {
    setSelectedProjectIndex(index);
  }

  function handleListenClick() {
    setIsPlayerOpened(true);
    setCurrentProject(data);
    audioPlayer.src = data.tracks[FIRST_TRACK_INDEX].audioSrc;
    audioPlayer.play();
  }

  function handleWatchClick() {
    setVideoID(data.videoSrc);
    setIsVideoPopupOpened(true);
  }

  const projectButtonsClasses = cn(s.projectButtons, {
    [s.projectButtonsActive]: isSelected,
  });

  return (
    <>
      <div className={s.container} onClick={handleProjectClick}>
        <Artwork src={data.imageSrc} />

        <div className={projectButtonsClasses}>
          <HorizontalOverlayButton onClick={handleListenClick}>
            <HeadphonesIcon className={s.icon} />
            <div className={s.iconCaption}>Listen</div>
          </HorizontalOverlayButton>

          <HorizontalOverlayButton onClick={handleWatchClick}>
            <TvIcon className={s.icon} />
            <div className={s.iconCaption}>Watch</div>
          </HorizontalOverlayButton>
        </div>
      </div>

      <Title>{data.name}</Title>
      <Description>{data.genre}</Description>
    </>
  );
};

export default MobileProject;
