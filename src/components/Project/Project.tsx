import { useEffect, useContext } from "react";
import cn from "classnames";

import tvIconSrc from "../../assets/images/tv.svg";
import hedphonesIconSrc from "../../assets/images/headphone50.svg";
import { FeaturedWorkPageContext } from "../../pages/FeaturedWork/FeaturedWork";

import s from "./Project.module.css";

import { ProjectData } from "../../types";

type ProjectProps = {
  index: number;
  data: ProjectData;
  isSelected: boolean;
};

const Project = ({ index, data, isSelected }: ProjectProps) => {
  const {
    setIsPlayerOpened,
    setProjectData,
    setSelectedProjectIndex,
    setVideoID,
    setIsVideoPopupOpened,
  } = useContext(FeaturedWorkPageContext);

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
    setProjectData(data);
  }

  function handleWatchClick() {
    setVideoID(data.videoSrc);
    setIsVideoPopupOpened(true);
  }

  const projectImageMaskClasses = cn(s.projectImageMask, {
    [s.projectImageMaskSelected]: isSelected,
  });

  return (
    <div className={s.project}>
      <div className={s.projectImageContainer} onClick={handleProjectClick}>
        <img
          className={s.projectImage}
          src={data.imageSrc}
          alt="project artwork"
        />

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

      <div className={s.projectTitle}>{data.name}</div>
      <div className={s.projectDescription}>{data.genre}</div>
    </div>
  );
};

export default Project;
