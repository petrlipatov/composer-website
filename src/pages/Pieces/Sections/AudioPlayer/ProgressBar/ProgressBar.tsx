import { useContext, useEffect, useRef, useState } from "react";
import { formatTime } from "../../../../../utils/helpers/formatTime";
import s from "./ProgressBar.module.css";
import ProgressBarLoader from "../../../../../components/AudioPlayer/Shared/ProgressBarLoader/ProgressBarLoader";
import { PiecesContext } from "../../../Pieces";

const ProgressBar = () => {
  const [duration, setDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const progressBarRef = useRef<HTMLInputElement>();
  const { audioPlayerRef } = useContext(PiecesContext);

  const progressBar = progressBarRef.current;
  const audioPlayer = audioPlayerRef.current;

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.onloadedmetadata = () => {
        setDuration(audioPlayer.duration);
      };
      audioPlayer.ontimeupdate = () => {
        setElapsedTime(Math.round(audioPlayer.currentTime));
      };
      audioPlayer.onwaiting = () => {
        setIsLoading(true);
      };
      audioPlayer.onplaying = () => {
        setIsLoading(false);
      };

      audioPlayer.onstalled = () => {
        setIsLoading(false);
      };

      audioPlayer.onerror = () => {
        setIsLoading(false);
      };

      audioPlayer.onended = () => {
        setElapsedTime(0);
      };
    }
  }, [audioPlayerRef, audioPlayer]);

  useEffect(
    function updateElapsedProgressOnScrubber() {
      if (progressBar) {
        const max = progressBar.max;
        const progressValue = elapsedTime;
        const relativeProgressVal = ((progressValue / +max) * 100).toFixed(1);
        progressBar.style.backgroundSize = `${relativeProgressVal}% 100%`;
      }
    },
    [elapsedTime, progressBar]
  );

  const onScrubberChange = (e) => {
    const newTime = e.target.value;
    audioPlayer.currentTime = newTime;
  };

  return (
    <div className={s.progressBarContainer}>
      <div className={s.timeValue}>{formatTime(elapsedTime)}</div>
      {isLoading ? (
        <ProgressBarLoader />
      ) : (
        <input
          className={s.timeScrubber}
          type="range"
          value={elapsedTime}
          min={0}
          max={duration}
          onChange={onScrubberChange}
          ref={progressBarRef}
        />
      )}
      <div className={s.timeValue}>{formatTime(duration)}</div>
    </div>
  );
};

export default ProgressBar;
