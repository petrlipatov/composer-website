import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  forwardRef,
  useEffect,
  useState,
} from "react";
import cn from "classnames";

import { ProjectData } from "../../types";

import tvIconSrc from "../../assets/images/tv.svg";
import hedphonesIconSrc from "../../assets/images/headphone50.svg";

import s from "./Project.module.css";

type ProjectProps = {
  index: number;
  data: ProjectData;
  isSelected: boolean;
  setSelectedProject: Dispatch<SetStateAction<number>>;

  //   openPopup: () => void;
  //   setVideoId: Dispatch<SetStateAction<string>>;
  //   setIsPlayerOpened: Dispatch<SetStateAction<boolean>>;
  //   setPlayingAudioData: Dispatch<SetStateAction<PlayingAudioData>>;
};

const Project = forwardRef(
  (
    { data, isSelected, setSelectedProject, index }: ProjectProps,
    ref: RefObject<HTMLAudioElement>
  ) => {
    const [isPaused, setIsPaused] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const audioPlayerRef = ref?.current;

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
            <div
              className={s.imageMaskButtonLeft}
              // onClick={handleListenClick}
            >
              <img
                className={cn(s.imageMaskIcon, s.imageMaskIconLeft)}
                src={hedphonesIconSrc}
              />
              <div className={cn(s.imageMaskCaption, s.imageMaskCaptionLeft)}>
                Listen
              </div>
            </div>
            <div
              className={s.imageMaskButtonRight}
              // onClick={handleWatchClick}
            >
              <img className={cn(s.imageMaskIcon)} src={tvIconSrc} />
              <div className={s.imageMaskCaption}>Watch</div>
            </div>
          </div>
        </div>

        <div className={s.projectTitle}>{data.name}</div>
        <div className={s.projectDescription}>{data.description}</div>
      </div>
    );
  }
);

export default Project;
