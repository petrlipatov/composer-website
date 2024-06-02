import { Dispatch, MutableRefObject, SetStateAction } from "react";

export type AudioTrackData = {
  name: string;
  tags: string[];
  imageSrc: string;
  audioSrc: string;
  videoSrc: string;
};

export type currentAudioData = AudioTrackData & {
  index: number;
};

export interface ContextTypes {
  videoID: string;
  selectedTags: string[];
  filteredPieces: AudioTrackData[];
  currentAudioData: currentAudioData;
  isPlayerOpened: boolean;
  isVideoPopupOpened: boolean;
  audioPlayerRef: MutableRefObject<HTMLAudioElement>;
  selectedTrackIndex: number;
  setVideoID: Dispatch<SetStateAction<string>>;
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
  setCurrentAudioData: Dispatch<SetStateAction<currentAudioData>>;
  setIsPlayerOpened: Dispatch<SetStateAction<boolean>>;
  setIsVideoPopupOpened: Dispatch<SetStateAction<boolean>>;
  setSelectedTrackIndex: Dispatch<SetStateAction<number>>;
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
