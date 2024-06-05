import cn from "classnames";

import Equalizer from "../../../Equalizer/Equalizer";

import s from "./AudioTrack.module.css";
import { SyntheticEvent } from "react";

type Props = {
  index: number;
  isTrackPlaying: boolean;
  isTrackSelected: boolean;
  track: {
    name: string;
    duration: string;
    audioSrc: string;
  };
  handleTrackClick: (src: string, index: number) => void;
};

function AudioTrack({
  index,
  track,
  isTrackPlaying,
  isTrackSelected,
  handleTrackClick,
}: Props) {
  const handleTrackClickWithStopPropagation = (e: SyntheticEvent) => {
    e.stopPropagation();
    handleTrackClick(track.audioSrc, index);
  };

  return (
    <div
      className={cn(s.track, isTrackSelected ? s.trackPlaying : "")}
      key={index}
      onClick={handleTrackClickWithStopPropagation}
    >
      {isTrackPlaying ? (
        <Equalizer color={"black"} />
      ) : (
        <div className={s.trackIndex}>{index + 1}</div>
      )}
      <span className={s.trackTitle}>{track.name}</span>
      <span className={s.duration}>{track.duration}</span>
    </div>
  );
}

export default AudioTrack;
