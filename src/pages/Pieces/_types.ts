import { Dispatch, SetStateAction } from "react";

export type trackData = {
  name: string;
  tags: string[];
  image: string;
  audio: string;
  video: string;
};

export type trackDataWithIndex = trackData & {
  index: number;
};

export type PlayerState = {
  data: trackDataWithIndex;
  status: "playing" | "paused" | "loading" | "ended";
  isOpened: boolean;
};

export enum PLAYER_ACTION_TYPE {
  AUDIO_PLAYED = "AUDIO_PLAYED",
  AUDIO_PAUSED = "AUDIO_PAUSED",
  AUDIO_LOADING = "AUDIO_LOADING",
  AUDIO_TOGGLED = "AUDIO_TOGGLED",
  TRACK_DATA_SET = "TRACK_DATA_SET",
  PLAYER_OPENED = "PLAYER_OPENED",
  PLAYER_TERMINATED = "PLAYER_TERMINATED",
}

export type PlayerAction = {
  type: PLAYER_ACTION_TYPE;
  payload?: trackDataWithIndex;
};

export type playerStateSetter = Dispatch<SetStateAction<PlayerState>>;

export interface ContextTypes {
  videoID: string;
  selectedTags: string[];
  filteredPieces: trackData[];
  isVideoPopupOpened: boolean;
  selectedTrackIndex: number;
  player: PlayerState;
  // buffered: number;
  // elapsed: number;
  // duration: number;
  // isUserScrubbing: boolean;
  setVideoID: Dispatch<SetStateAction<string>>;
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
  setIsVideoPopupOpened: Dispatch<SetStateAction<boolean>>;
  setSelectedTrackIndex: Dispatch<SetStateAction<number>>;
  // onScrubberChange: (e: any) => void;
}

export type genres =
  | "classical"
  | "contemporary"
  | "vintage"
  | "electronic"
  | "dark"
  | "folk"
  | "chamber"
  | "borroque";
