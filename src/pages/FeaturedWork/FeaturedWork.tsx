import {
  useMemo,
  useRef,
  useState,
  Suspense,
  createContext,
  useEffect,
  lazy,
} from "react";

import ExtendedAudioPlayer from "../../components/ExtendedAudioPlayer/ExtendedAudioPlayer";
import Modal from "../../components/Modal/Modal";
import Preloader from "../../components/Preloader/Preloader";
import YouTubePlayer from "../../components/YoutubePlayer/YoutubePlayer";

import Nav from "./Sections/Nav/Nav";
import Tags from "./Sections/Tags/Tags";
// import Projects from "./Sections/Projects/Projects";

import { ProjectData } from "../../types";

import { PROJECTS } from "../../utils/constants";

import s from "./FeaturedWork.module.css";
import cn from "classnames";
import HtmlAudioTag from "./Sections/HtmlAudio/HtmlAudio";

const Projects = lazy(() => import("./Sections/Projects/Projects"));

interface FeaturedWorkPageContext {
  isPlayerOpened: boolean;
  selectedTags: string[];
  filteredProjects: ProjectData[];
  selectedProjectIndex: number;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedProjectIndex: React.Dispatch<React.SetStateAction<number>>;
  setProjectData: React.Dispatch<React.SetStateAction<ProjectData>>;
  setVideoID: React.Dispatch<React.SetStateAction<string>>;
  setIsPlayerOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVideoPopupOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FeaturedWorkPageContext =
  createContext<FeaturedWorkPageContext>(null);

function FeaturedWork() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [projectData, setProjectData] = useState<ProjectData>(null);
  const [isPlayerOpened, setIsPlayerOpened] = useState(false);
  const [videoID, setVideoID] = useState<string>("");
  const [isVideoPopupOpened, setIsVideoPopupOpened] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] =
    useState<number>(null);

  const audioPlayerRef = useRef<HTMLAudioElement>();

  const contextValue = useMemo(
    () => ({
      isPlayerOpened,
      selectedTags,
      filteredProjects,
      selectedProjectIndex,
      setSelectedTags,
      setSelectedProjectIndex,
      setProjectData,
      setIsPlayerOpened,
      setIsVideoPopupOpened,
      setVideoID,
    }),
    [
      isPlayerOpened,
      selectedTags,
      filteredProjects,
      selectedProjectIndex,
      setSelectedTags,
      setSelectedProjectIndex,
      setProjectData,
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
    <div className={s.page}>
      <FeaturedWorkPageContext.Provider value={contextValue}>
        <div
          className={cn(s.content, isPlayerOpened ? s.contentShortened : "")}
        >
          <Nav />

          <Tags />

          <Suspense fallback={<Preloader content={"🐥"} />}>
            <Projects />
          </Suspense>

          <HtmlAudioTag ref={audioPlayerRef} />
        </div>

        {isPlayerOpened && (
          <ExtendedAudioPlayer
            isPlayerOpened={isPlayerOpened}
            projectData={projectData}
            ref={audioPlayerRef}
          />
        )}

        {isVideoPopupOpened && (
          <Modal setPopupState={setIsVideoPopupOpened}>
            <Suspense fallback={<Preloader content={"🐥"} />}>
              <YouTubePlayer videoId={videoID} />
            </Suspense>
          </Modal>
        )}
      </FeaturedWorkPageContext.Provider>
    </div>
  );
}

export default FeaturedWork;
