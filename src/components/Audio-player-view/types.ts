import { Dispatch, SetStateAction } from "react";

export type AudioPlayerViewProps = {
  index: number;
  link: string;
  isAudioTrackSelected: boolean;
  setSelectedAudioTrack: Dispatch<SetStateAction<number>>;
};
