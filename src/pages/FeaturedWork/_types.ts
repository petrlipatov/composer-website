import { Dispatch, MutableRefObject, SetStateAction } from "react";

export type ProjectData = {
  name: string;
  genre: string;
  year: string;
  imageSrc: string;
  videoSrc: string;
  tags: string[];
  tracks: {
    name: string;
    duration: string;
    audioSrc: string;
  }[];
};

export interface ContextTypes {
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
