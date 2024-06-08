import { useContext, useRef, useState } from "react";

import { formatTime } from "../../../../../utils/helpers/formatTime";

import ScrubberLoader from "../../../../../components/AudioPlayer/Shared/ProgressBar/ScrubberLoader/ScrubberLoader";
import ScrubberBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/ScrubberBar/ScrubberBar";
import DurationBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/DurationBar/DurationBar";
import BufferedBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/BufferedBar/BufferedBar";
import TimeValue from "../../../../../components/AudioPlayer/Shared/ProgressBar/TimeValue/TimeValue";

import useAudioEventsForProgressBar from "../../../../../utils/hooks/useAudioEventsForProgressBar";
import useElapsedTimeProgressUpdate from "../../../../../utils/hooks/useElapsedTimeProgressUpdate";
import useBufferedProgressUpdate from "../../../../../utils/hooks/useBufferedProgressUpdate";

import { PiecesContext } from "../../../Pieces";

import s from "./ProgressBar.module.css";

const ProgressBar = () => {
  const [duration, setDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [buffered, setBuffered] = useState(0);

  const progressBarRef = useRef<HTMLInputElement>();
  const bufferedBarRef = useRef<HTMLInputElement>();
  const { audioPlayerRef } = useContext(PiecesContext);

  const progressBar = progressBarRef.current;
  const bufferedBar = bufferedBarRef.current;
  const audioPlayer = audioPlayerRef.current;

  useAudioEventsForProgressBar(
    audioPlayer,
    setDuration,
    setElapsedTime,
    setBuffered,
    setIsLoading
  );

  useElapsedTimeProgressUpdate(progressBar, elapsedTime, duration);
  useBufferedProgressUpdate(
    bufferedBar,
    buffered,
    duration,
    audioPlayer.currentTime
  );

  const onScrubberChange = (e) => {
    e.target.style.transition = "background-size 0.1s ease";
    const newTime = e.target.value;
    audioPlayer.currentTime = newTime;
    setTimeout(() => {
      e.target.style.transition = "background-size 2.5s ease";
    }, 100);
  };

  return (
    <div className={s.progressBarContainer}>
      <TimeValue> {formatTime(elapsedTime)}</TimeValue>

      <div className={s.progressBar}>
        <ScrubberLoader isLoading={isLoading} />
        <ScrubberBar
          elapsedTime={elapsedTime}
          duration={duration}
          onScrubberChange={onScrubberChange}
          ref={progressBarRef}
        />
        <DurationBar />
        <BufferedBar ref={bufferedBarRef} />
      </div>

      <TimeValue> {formatTime(duration)}</TimeValue>
    </div>
  );
};

export default ProgressBar;
