import { RefObject, forwardRef, useContext } from "react";

import AudioTrack from "../../../../components/AudioTrack/AudioTrack";

import { PiecesContext } from "../../Pieces";

import s from "./Tracks.module.css";
forwardRef;

const Tracks = forwardRef((props, ref: RefObject<HTMLAudioElement>) => {
  const { selectedTrackIndex, filteredPieces } = useContext(PiecesContext);

  return (
    <div className={s.tracksSection}>
      {filteredPieces.map((track, index) => (
        <AudioTrack
          index={index}
          data={track}
          isSelected={selectedTrackIndex === index}
          key={track.name}
          ref={ref}
        />
      ))}
    </div>
  );
});

export default Tracks;
