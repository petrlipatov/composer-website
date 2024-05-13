import {
  RefObject,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from "react";

import AudioTrack from "../../../../components/AudioTrack/AudioTrack";

import { PiecesContext } from "../../Pieces";

import s from "./Tracks.module.css";
forwardRef;

const Tracks = forwardRef((props, ref: RefObject<HTMLAudioElement>) => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(null);
  const { filteredPieces } = useContext(PiecesContext);

  const setSelectedTrackIndexCached = useCallback(setSelectedTrackIndex, [
    setSelectedTrackIndex,
  ]);

  return (
    <div className={s.tracksSection}>
      {filteredPieces.map((track, index) => (
        <AudioTrack
          index={index}
          data={track}
          isSelected={selectedTrackIndex === index}
          setSelectedTrackIndex={setSelectedTrackIndexCached}
          key={track.name}
          ref={ref}
        />
      ))}
    </div>
  );
});

export default Tracks;
