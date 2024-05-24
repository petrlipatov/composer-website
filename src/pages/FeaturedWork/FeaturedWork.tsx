import {
  useMemo,
  useRef,
  useState,
  createContext,
  useEffect,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";
import cn from "classnames";

import AudioPlayer from "./Sections/AudioPlayer/AudioPlayer";
import Tags from "./Sections/Tags/Tags";
import ProjectsSuspensed from "./Sections/ProjectsSuspensed/ProjectsSuspensed";

import HTMLAudioTag from "../../components/HTMLAudioTag/HTMLAudioTag";
import Header from "../../components/Header/Header";
import VideoPopup from "../../components/VideoPopup/VideoPopup";

import useIsMobile from "../../utils/hooks/useIsMobile";

import { ProjectData } from "../../types";
import { PROJECTS } from "../../utils/constants";

import s from "./FeaturedWork.module.css";

interface FeaturedWorkContext {
  videoID: string;
  isPlayerOpened: boolean;
  selectedTags: string[];
  currentProject: ProjectData;
  filteredProjects: ProjectData[];
  audioPlayerRef: MutableRefObject<HTMLAudioElement>;
  selectedProjectIndex: number;
  selectedTrackIndex: number;
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
  setCurrentProject: Dispatch<SetStateAction<ProjectData>>;
  setVideoID: Dispatch<SetStateAction<string>>;
  setIsPlayerOpened: Dispatch<SetStateAction<boolean>>;
  setIsVideoPopupOpened: Dispatch<SetStateAction<boolean>>;
  setSelectedProjectIndex: Dispatch<SetStateAction<number>>;
  setSelectedTrackIndex: Dispatch<SetStateAction<number>>;
}

export const FeaturedWorkContext = createContext<FeaturedWorkContext>(null);

function FeaturedWork() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [videoID, setVideoID] = useState<string>("");
  const [currentProject, setCurrentProject] = useState<ProjectData>(null);

  const [isVideoPopupOpened, setIsVideoPopupOpened] = useState(false);
  const [isPlayerOpened, setIsPlayerOpened] = useState(false);

  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);
  const [selectedProjectIndex, setSelectedProjectIndex] =
    useState<number>(null);

  const audioPlayerRef = useRef<HTMLAudioElement>();
  const isMobile = useIsMobile();

  const contextValue = useMemo(
    () => ({
      videoID,
      currentProject,
      isPlayerOpened,
      selectedTags,
      filteredProjects,
      audioPlayerRef,
      selectedProjectIndex,
      selectedTrackIndex,
      setSelectedTags,
      setCurrentProject,
      setIsPlayerOpened,
      setIsVideoPopupOpened,
      setVideoID,
      setSelectedProjectIndex,
      setSelectedTrackIndex,
    }),
    [
      videoID,
      isPlayerOpened,
      selectedTags,
      currentProject,
      filteredProjects,
      selectedProjectIndex,
      selectedTrackIndex,
      setSelectedTags,
      setCurrentProject,
      setIsPlayerOpened,
      setIsVideoPopupOpened,
      setVideoID,
      setSelectedProjectIndex,
      setSelectedTrackIndex,
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

  const content = cn(
    s.content,
    isPlayerOpened && isMobile ? s.mobilePlayerOpened : "",
    isPlayerOpened && !isMobile ? s.desktopPlayerOpened : ""
  );

  return (
    <FeaturedWorkContext.Provider value={contextValue}>
      <div className={s.page}>
        <div className={content}>
          <Header>{"Featured Work"}</Header>

          <Tags />

          <ProjectsSuspensed />
        </div>

        {isPlayerOpened && <AudioPlayer />}

        {isVideoPopupOpened && (
          <VideoPopup
            videoID={videoID}
            setIsVideoPopupOpened={setIsVideoPopupOpened}
          />
        )}
        <HTMLAudioTag ref={audioPlayerRef} />
      </div>
    </FeaturedWorkContext.Provider>
  );
}

export default FeaturedWork;
