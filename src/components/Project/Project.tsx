import { Dispatch, SetStateAction, useEffect } from "react";
import cn from "classnames";

import tvIconSrc from "../../assets/images/tv.svg";
import hedphonesIconSrc from "../../assets/images/headphone50.svg";

import s from "./Project.module.css";

import { ProjectData } from "../../types";

type ProjectProps = {
  index: number;
  data: ProjectData;
  isSelected: boolean;
  setSelectedProject: Dispatch<SetStateAction<number>>;
  setIsPlayerOpened: Dispatch<SetStateAction<boolean>>;
  setProjectData: Dispatch<SetStateAction<ProjectData>>;
  setVideoId: Dispatch<SetStateAction<string>>;
  openVideoModal: () => void;
};

const Project = ({
  index,
  data,
  isSelected,
  setIsPlayerOpened,
  setSelectedProject,
  setProjectData,
  setVideoId,
  openVideoModal,
}: ProjectProps) => {
  useEffect(() => {
    if (isSelected) {
      const timer = setTimeout(() => {
        setSelectedProject(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isSelected, setSelectedProject, index]);

  function handleProjectClick() {
    setSelectedProject(index);
  }

  function handleListenClick() {
    setIsPlayerOpened(true);
    setProjectData(data);
  }

  function handleWatchClick() {
    setVideoId(data.videoSrc);
    openVideoModal();
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
