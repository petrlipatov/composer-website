import { useContext, useRef } from "react";

import { formatTime } from "../../../../../utils/helpers/formatTime";

import ScrubberLoader from "../../../../../components/AudioPlayer/Shared/ProgressBar/ScrubberLoader/ScrubberLoader";
import ScrubberBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/ScrubberBar/ScrubberBar";
import DurationBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/DurationBar/DurationBar";
import BufferedBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/BufferedBar/BufferedBar";
import TimeValue from "../../../../../components/AudioPlayer/Shared/ProgressBar/TimeValue/TimeValue";
import useElapsedTimeProgressUpdate from "../../../../../utils/hooks/useElapsedTimeProgressUpdate";
import useBufferedProgressUpdate from "../../../../../utils/hooks/useBufferedProgressUpdate";

import { PiecesContext } from "../../../Pieces";

import s from "./ProgressBar.module.css";
import { PLAYER_STATE } from "../../../_constants";

const ProgressBar = () => {
  const progressBarRef = useRef<HTMLInputElement>();
  const bufferedBarRef = useRef<HTMLInputElement>();

  const { player, buffered, duration, elapsed, onScrubberChange } =
    useContext(PiecesContext);

  const progressBar = progressBarRef.current;
  const bufferedBar = bufferedBarRef.current;

  useElapsedTimeProgressUpdate(progressBar, elapsed, duration);
  useBufferedProgressUpdate(bufferedBar, buffered, duration, elapsed);

  return (
    <div className={s.progressBarContainer}>
      <TimeValue> {formatTime(elapsed)}</TimeValue>

      <div className={s.progressBar}>
        <ScrubberLoader isLoading={player.status === PLAYER_STATE.Loading} />
        <ScrubberBar
          elapsedTime={elapsed}
          duration={duration}
          onScrubberChange={onScrubberChange}
          ref={progressBarRef}
          key={player.src}
        />
        <DurationBar />
        <BufferedBar ref={bufferedBarRef} key={player.data.name} />
      </div>

      <TimeValue> {formatTime(duration)}</TimeValue>
    </div>
  );
};

export default ProgressBar;
