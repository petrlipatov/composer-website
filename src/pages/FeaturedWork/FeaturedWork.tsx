import { useMemo, useRef, useState, createContext, useEffect } from "react";
import cn from "classnames";

import HTMLAudioTag from "../../components/HTMLAudioTag/HTMLAudioTag";
import Header from "../../components/Header/Header";
import VideoPopup from "../../components/VideoPopup/VideoPopup";

import Tags from "./Sections/Tags/Tags";
import ProjectsSuspensed from "./Sections/ProjectsSuspensed/ProjectsSuspensed";
import ExtendedAudioPlayer from "./Sections/ExtendedAudioPlayer/ExtendedAudioPlayer";

import { ProjectData } from "../../types";

import { PROJECTS } from "../../utils/constants";

import s from "./FeaturedWork.module.css";

interface FeaturedWorkContext {
  videoID: string;
  isPlayerOpened: boolean;
  selectedTags: string[];
  currentProject: ProjectData;
  filteredProjects: ProjectData[];
  selectedProjectIndex: number;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedProjectIndex: React.Dispatch<React.SetStateAction<number>>;
  setCurrentProject: React.Dispatch<React.SetStateAction<ProjectData>>;
  setVideoID: React.Dispatch<React.SetStateAction<string>>;
  setIsPlayerOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVideoPopupOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FeaturedWorkContext = createContext<FeaturedWorkContext>(null);

function FeaturedWork() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectData>(null);
  const [isPlayerOpened, setIsPlayerOpened] = useState(false);
  const [videoID, setVideoID] = useState<string>("");
  const [isVideoPopupOpened, setIsVideoPopupOpened] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] =
    useState<number>(null);

  const audioPlayerRef = useRef<HTMLAudioElement>();

  const contextValue = useMemo(
    () => ({
      videoID,
      currentProject,
      isPlayerOpened,
      selectedTags,
      filteredProjects,
      selectedProjectIndex,
      setSelectedTags,
      setSelectedProjectIndex,
      setCurrentProject,
      setIsPlayerOpened,
      setIsVideoPopupOpened,
      setVideoID,
    }),
    [
      videoID,
      isPlayerOpened,
      selectedTags,
      currentProject,
      filteredProjects,
      selectedProjectIndex,
      setSelectedTags,
      setSelectedProjectIndex,
      setCurrentProject,
      setIsPlayerOpened,
      setIsVideoPopupOpened,
      setVideoID,
    ]
  );

  useEffect(
    function filterProjectsByTags() {
      const filteredProjects = PROJECTS.filter((project) =>
        selectedTags.every((tag) => project.tags.includes(tag))
      );
      setFilteredProjects(filteredProjects);
    },
    [selectedTags]
  );

  return (
    <FeaturedWorkContext.Provider value={contextValue}>
      <div className={s.page}>
        <div
          className={cn(s.content, isPlayerOpened ? s.contentShortened : "")}
        >
          <Header pageTitle={"Featured Work"} />

          <Tags />

          <ProjectsSuspensed />

          <HTMLAudioTag ref={audioPlayerRef} />
        </div>

        {isPlayerOpened && <ExtendedAudioPlayer ref={audioPlayerRef} />}

        {isVideoPopupOpened && (
          <VideoPopup
            videoID={videoID}
            setIsVideoPopupOpened={setIsVideoPopupOpened}
          />
        )}
      </div>
    </FeaturedWorkContext.Provider>
  );
}

export default FeaturedWork;
