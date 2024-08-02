import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { PLAYER_STATUS } from "../../utils/constants";

export type ProjectData = {
  name: string;
  genre: string;
  year: string;
  image: string;
  video: string;
  tags: string[];
  tracks: {
    name: string;
    duration: string;
    audio: string;
  }[];
};

export type ExtendedPlayerState = {
  status: PLAYER_STATUS;
  data: ProjectData;
  selectedTrackIndex: number;
  isOpened: boolean;
};

export enum EXTENDED_PLAYER_ACTION_TYPE {
  AUDIO_PLAYED = "AUDIO_PLAYED",
  AUDIO_PAUSED = "AUDIO_PAUSED",
  AUDIO_LOADING = "AUDIO_LOADING",
  AUDIO_TOGGLED = "AUDIO_TOGGLED",
  PROJECT_DATA_SET = "PROJECT_DATA_SET",
  TRACK_SELECTED = "TRACK_SELECTED",
  PLAYER_OPENED = "PLAYER_OPENED",
  PLAYER_TERMINATED = "PLAYER_TERMINATED",
}

export type SelectedTrackIndex = number;

export type ExtendedPlayerAction = {
  type: EXTENDED_PLAYER_ACTION_TYPE;
  payload?: ProjectData | SelectedTrackIndex;
};

export interface ContextTypes {
  videoID: string;
  // isPlayerOpened: boolean;
  selectedTags: string[];
  // currentProject: ProjectData;
  filteredProjects: ProjectData[];
  audioPlayerRef: MutableRefObject<HTMLAudioElement>;
  selectedProjectIndex: number;
  // selectedTrackIndex: number;
  player: ExtendedPlayerState;
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
  // setCurrentProject: Dispatch<SetStateAction<ProjectData>>;
  setVideoID: Dispatch<SetStateAction<string>>;
  // setIsPlayerOpened: Dispatch<SetStateAction<boolean>>;
  setIsVideoPopupOpened: Dispatch<SetStateAction<boolean>>;
  setSelectedProjectIndex: Dispatch<SetStateAction<number>>;
  // setSelectedTrackIndex: Dispatch<SetStateAction<number>>;
  dispatchPlayerAction: Dispatch<ExtendedPlayerAction>;
}
