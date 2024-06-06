import { SyntheticEvent, forwardRef } from "react";
import cn from "classnames";

import Equalizer from "../../../Equalizer/Equalizer";

import s from "./AudioTrack.module.css";

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

const AudioTrack = forwardRef<HTMLDivElement, Props>(
  (
    { index, track, isTrackPlaying, isTrackSelected, handleTrackClick },
    ref
  ) => {
    const handleTrackClickWithStopPropagation = (e: SyntheticEvent) => {
      e.stopPropagation();
      handleTrackClick(track.audioSrc, index);
    };

    return (
      <div
        className={cn(s.track, isTrackSelected ? s.trackPlaying : "")}
        key={index}
        onClick={handleTrackClickWithStopPropagation}
        ref={ref}
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
);

export default AudioTrack;
