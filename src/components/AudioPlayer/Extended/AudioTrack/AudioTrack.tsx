import cn from "classnames";

import AudioPlayingLoader from "../../../AudioPlayingLoader/AudioPlayingLoader";

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
  handleTrackClick: (audioSrc: string, index: number) => void;
};

function AudioTrack({
  index,
  track,
  isTrackPlaying,
  isTrackSelected,
  handleTrackClick,
}: Props) {
  return (
    <div
      className={cn(s.track, isTrackSelected ? s.trackPlaying : "")}
      key={index}
      onClick={() => handleTrackClick(track.audioSrc, index)}
    >
      {isTrackPlaying ? (
        <AudioPlayingLoader color={"black"} />
      ) : (
        <div className={s.trackIndex}>{index + 1}</div>
      )}
      <span className={s.trackTitle}>{track.name}</span>
      <span className={s.duration}>{track.duration}</span>
    </div>
  );
}

export default AudioTrack;
