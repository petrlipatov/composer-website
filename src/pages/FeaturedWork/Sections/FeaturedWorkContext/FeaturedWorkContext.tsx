import {
  Dispatch,
  useEffect,
  useMemo,
  useReducer,
  useState,
  createContext,
} from "react";

import { DEFAULT_CONTEXT, PROJECTS } from "../../_constants";
import { ContextTypes, ExtendedPlayerAction, ProjectData } from "../../_types";
import { PLAYER_STATUS } from "@/utils/constants";
import { featuredReducer as reducer } from "@/utils/reducers/featured.reducer";

export const FeaturedWorkContext = createContext<ContextTypes>(DEFAULT_CONTEXT);
export const FeaturedWorkDispatchContext = createContext<
  Dispatch<ExtendedPlayerAction>
>(() => {});

export const FeaturedWorkContextProvider = ({ children }) => {
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

  const contextValue = useMemo(
    () => ({
      player,
      videoID,
      selectedTags,
      filteredProjects,
      selectedProjectIndex,
      isVideoPopupOpened,
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

  return (
    <FeaturedWorkContext.Provider value={contextValue}>
      <FeaturedWorkDispatchContext.Provider value={dispatchPlayerAction}>
        {children}
      </FeaturedWorkDispatchContext.Provider>
    </FeaturedWorkContext.Provider>
  );
};
