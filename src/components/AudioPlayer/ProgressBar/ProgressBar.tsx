import { RefObject, forwardRef, useEffect, useRef, useState } from "react";
import { formatTime } from "../../../utils/helpers/formatTime";
import s from "./ProgressBar.module.css";
import ProgressBarLoader from "../ProgressBarLoader/ProgressBarLoader";

const ProgressBar = forwardRef((props, ref: RefObject<HTMLAudioElement>) => {
  const [duration, setDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioPlayerRef = ref?.current;
  const progressBarRef = useRef<HTMLInputElement>();
  const progressBar = progressBarRef.current;

  useEffect(() => {
    if (audioPlayerRef) {
      audioPlayerRef.onloadedmetadata = () => {
        setDuration(audioPlayerRef.duration);
      };
      audioPlayerRef.ontimeupdate = () => {
        setElapsedTime(Math.round(audioPlayerRef.currentTime));
      };
      audioPlayerRef.onwaiting = () => {
        setIsLoading(true);
      };
      audioPlayerRef.onplaying = () => {
        setIsLoading(false);
      };
      audioPlayerRef.onended = () => {
        setElapsedTime(0);
      };
    }
  }, [audioPlayerRef]);

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
    setIsLoading(true);
    const newTime = e.target.value;
    audioPlayerRef.currentTime = newTime;
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
});

export default ProgressBar;
