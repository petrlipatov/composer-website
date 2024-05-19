import { useContext, useEffect, useRef, useState } from "react";

import ProgressBarLoader from "../../../../../components/AudioPlayer/Shared/ProgressBarLoader/ProgressBarLoader";
import { FeaturedWorkContext } from "../../../FeaturedWork";
import { formatTime } from "../../../../../utils/helpers/formatTime";

import s from "./ProgressBar.module.css";

const ProgressBar = () => {
  const [duration, setDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const progressBarRef = useRef<HTMLInputElement>();
  const progressBar = progressBarRef.current;
  const { audioPlayerRef } = useContext(FeaturedWorkContext);
  const audioPlayer = audioPlayerRef.current;

  useEffect(() => {
    if (audioPlayerRef) {
      audioPlayer.onloadedmetadata = () => {
        setDuration(audioPlayer.duration);
        setElapsedTime(0);
      };

      audioPlayer.ontimeupdate = () =>
        setElapsedTime(Math.round(audioPlayer.currentTime));

      audioPlayer.onplaying = () => setIsLoading(false);
      audioPlayer.onwaiting = () => setIsLoading(true);
      audioPlayer.onended = () => setElapsedTime(0);
    }
  }, [audioPlayer, audioPlayerRef]);

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
