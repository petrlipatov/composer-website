import {
  useMemo,
  useRef,
  useState,
  createContext,
  useEffect,
  useReducer,
} from "react";
import cn from "classnames";

import AudioPlayer from "./Sections/AudioPlayer/AudioPlayer";
import Tags from "./Sections/Tags/Tags";

import Header from "../../components/Header/Header";
import VideoPopup from "../../components/VideoPopup/VideoPopup";

import useIsMobile from "../../utils/hooks/useIsMobile";

import { DEFAULT_CONTEXT, PROJECTS } from "./_constants";

import {
  ContextTypes,
  ExtendedPlayerAction,
  ExtendedPlayerState,
  ProjectData,
  SelectedTrackIndex,
} from "./_types";

import s from "./FeaturedWork.module.css";
import Projects from "./Sections/Projects/Projects";
import { PAGES, PLAYER_STATUS } from "../../utils/constants";

export const FeaturedWorkContext = createContext<ContextTypes>(DEFAULT_CONTEXT);

function reducer(state: ExtendedPlayerState, action: ExtendedPlayerAction) {
  switch (action.type) {
    case "AUDIO_PLAYED": {
      return {
        ...state,
        status: PLAYER_STATUS.PLAYING,
      };
    }
    case "AUDIO_PAUSED": {
      return {
        ...state,
        status: PLAYER_STATUS.PAUSED,
      };
    }
    case "AUDIO_LOADING": {
      return {
        ...state,
        status: PLAYER_STATUS.LOADING,
      };
    }
    case "AUDIO_TOGGLED": {
      return {
        ...state,
        status:
          state.status === PLAYER_STATUS.PLAYING
            ? PLAYER_STATUS.PAUSED
            : PLAYER_STATUS.PLAYING,
      };
    }

    case "PROJECT_DATA_SET": {
      return {
        ...state,
        data: action.payload as ProjectData,
      };
    }
    case "TRACK_SELECTED": {
      return {
        ...state,
        selectedTrackIndex: action.payload as SelectedTrackIndex,
      };
    }
    case "PLAYER_OPENED": {
      return {
        ...state,
        isOpened: true,
      };
    }

    case "PLAYER_TERMINATED": {
      return {
        status: PLAYER_STATUS.PAUSED,
        data: null,
        isOpened: false,
        selectedTrackIndex: null,
      };
    }
  }
}

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
      dispatchPlayerAction,
      setSelectedTags,
      setIsVideoPopupOpened,
      setVideoID,
      setSelectedProjectIndex,
    }),
    [player, videoID, selectedTags, filteredProjects, selectedProjectIndex]
  );

  useEffect(() => {
    console.log(player);
  }, [player]);

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
    </FeaturedWorkContext.Provider>
  );
}

export default FeaturedWork;
