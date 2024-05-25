import { useEffect, useContext } from "react";
import cn from "classnames";

import Title from "../../../../../components/Project/Title/Title";
import Description from "../../../../../components/Project/Description/Description";

import { FeaturedWorkContext } from "../../../FeaturedWork";

import { ProjectProps } from "../types";

import tvIconSrc from "../../../../../assets/images/tv.svg";
import hedphonesIconSrc from "../../../../../assets/images/headphone50.svg";

import s from "./MobileProject.module.css";
import Artwork from "../../../../../components/Project/Artwork/Artwork";
import { FIRST_TRACK_INDEX } from "../../../../../utils/constants";

const MobileProject = ({
  index,
  data,
  isSelected,
  setSelectedProjectIndex,
}: ProjectProps) => {
  const {
    currentProject,
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

  const projectImageMaskClasses = cn(s.projectImageMask, {
    [s.projectImageMaskSelected]: isSelected,
  });

  return (
    <>
      <div className={s.imageContainer} onClick={handleProjectClick}>
        <Artwork src={data.imageSrc} />

        <div className={projectImageMaskClasses}>
          <div className={s.imageMaskButtonLeft} onClick={handleListenClick}>
            <img
              className={cn(s.imageMaskIcon, s.imageMaskIconLeft)}
              src={hedphonesIconSrc}
            />
            <div className={cn(s.imageMaskCaption, s.imageMaskCaptionLeft)}>
              Listen
            </div>
          </div>
          <div className={s.imageMaskButtonRight} onClick={handleWatchClick}>
            <img className={cn(s.imageMaskIcon)} src={tvIconSrc} />
            <div className={s.imageMaskCaption}>Watch</div>
          </div>
        </div>
      </div>

      <Title>{data.name}</Title>
      <Description>{data.genre}</Description>
    </>
  );
};

export default MobileProject;
