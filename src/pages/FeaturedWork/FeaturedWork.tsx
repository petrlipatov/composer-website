import {
  useMemo,
  useRef,
  useState,
  createContext,
  useEffect,
  useReducer,
  Dispatch,
} from "react";
import cn from "classnames";

import AudioPlayer from "./Sections/AudioPlayer/AudioPlayer";
import Tags from "./Sections/Tags/Tags";
import Projects from "./Sections/Projects/Projects";

import Header from "../../components/Header/Header";
import VideoPopup from "../../components/VideoPopup/VideoPopup";

import reducer from "../../utils/reducers/featured.reducer";
import useIsMobile from "../../utils/hooks/useIsMobile";
import { PAGES, PLAYER_STATUS } from "../../utils/constants";
import { DEFAULT_CONTEXT, PROJECTS } from "./_constants";
import { ContextTypes, ExtendedPlayerAction, ProjectData } from "./_types";

import s from "./FeaturedWork.module.css";

export const FeaturedWorkContext = createContext<ContextTypes>(DEFAULT_CONTEXT);
export const FeaturedWorkDispatchContext = createContext<
  Dispatch<ExtendedPlayerAction>
>(() => {});

function FeaturedWork() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [videoID, setVideoID] = useState<string>("");
  const [isVideoPopupOpened, setIsVideoPopupOpened] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] =
    useState<number>(null);

  const [player, dispatchPlayerAction] = useReducer(reducer, {
    status: PLAYER_STATUS.PAUSED,
    data: null,
    selectedTrackIndex: null,
    isOpened: false,
  });

  const audioPlayerRef = useRef<HTMLAudioElement>();
  const isMobile = useIsMobile();

  const contextValue = useMemo(
    () => ({
      player,
      videoID,
      selectedTags,
      filteredProjects,
      audioPlayerRef,
      selectedProjectIndex,
      setSelectedTags,
      setIsVideoPopupOpened,
      setVideoID,
      setSelectedProjectIndex,
    }),
    [player, videoID, selectedTags, filteredProjects, selectedProjectIndex]
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
    player.isOpened && isMobile ? s.mobilePlayerOpened : "",
    player.isOpened && !isMobile ? s.desktopPlayerOpened : ""
  );

  return (
    <FeaturedWorkContext.Provider value={contextValue}>
      <FeaturedWorkDispatchContext.Provider value={dispatchPlayerAction}>
        <div className={s.page}>
          <div className={content}>
            <Header>{PAGES.featured}</Header>
            <Tags />
            <Projects />
          </div>

          {player.isOpened && <AudioPlayer />}

          {isVideoPopupOpened && (
            <VideoPopup
              videoID={videoID}
              setIsVideoPopupOpened={setIsVideoPopupOpened}
            />
          )}
        </div>
      </FeaturedWorkDispatchContext.Provider>
    </FeaturedWorkContext.Provider>
  );
}

export default FeaturedWork;
