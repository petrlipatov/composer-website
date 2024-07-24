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

export type playerState = {
  src: string;
  data: trackDataWithIndex;
  status: "playing" | "paused" | "loading" | "ended";
  isOpened: boolean;
};

export type playerStateSetter = Dispatch<SetStateAction<playerState>>;

export interface ContextTypes {
  videoID: string;
  selectedTags: string[];
  filteredPieces: trackData[];
  isVideoPopupOpened: boolean;
  selectedTrackIndex: number;
  player: playerState;
  buffered: number;
  elapsed: number;
  duration: number;
  isUserScrubbing: boolean;
  setVideoID: Dispatch<SetStateAction<string>>;
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
  setIsVideoPopupOpened: Dispatch<SetStateAction<boolean>>;
  setSelectedTrackIndex: Dispatch<SetStateAction<number>>;
  setPlayer: playerStateSetter;
  onScrubberChange: (e: any) => void;
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
