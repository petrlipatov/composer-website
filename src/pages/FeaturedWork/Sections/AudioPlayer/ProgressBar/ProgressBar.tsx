import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

import ScrubberLoader from "../../../../../components/AudioPlayer/Shared/ProgressBar/ScrubberLoader/ScrubberLoader";
import TimeValue from "../../../../../components/AudioPlayer/Shared/ProgressBar/TimeValue/TimeValue";
import { FeaturedWorkContext } from "../../../FeaturedWork";
import { formatTime } from "../../../../../utils/helpers/formatTime";

import s from "./ProgressBar.module.css";
import ScrubberBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/ScrubberBar/ScrubberBar";
import DurationBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/DurationBar/DurationBar";
import BufferedBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/BufferedBar/BufferedBar";

const ProgressBar = () => {
  const [duration, setDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { audioPlayerRef } = useContext(FeaturedWorkContext);
  const progressBarRef = useRef<HTMLInputElement>();
  const bufferedBarRef = useRef<HTMLInputElement>();

  const progressBar = progressBarRef.current;
  const bufferedBar = bufferedBarRef.current;
  const audioPlayer = audioPlayerRef.current;

  useEffect(() => {
    function updateBufferedAndElapsedTime() {
      if (!audioPlayer) {
        return;
      }

      const currentTime = Math.round(audioPlayer.currentTime);
      setElapsedTime(currentTime);

      const bufferedRanges = audioPlayer.buffered;
      const hasBufferedRanges = bufferedRanges && bufferedRanges.length > 0;

      if (hasBufferedRanges) {
        const lastBufferedIndex = bufferedRanges.length - 1;
        const bufferedEndTime = Math.round(
          bufferedRanges.end(lastBufferedIndex)
        );
        setBuffered(bufferedEndTime);
      }
    }

    if (audioPlayer) {
      audioPlayer.onloadedmetadata = () => {
        setDuration(audioPlayer.duration);
      };
      audioPlayer.ontimeupdate = () => updateBufferedAndElapsedTime();

      audioPlayer.onwaiting = () => setIsLoading(true);

      audioPlayer.onplaying = () => setIsLoading(false);

      audioPlayer.onstalled = () => setIsLoading(false);

      audioPlayer.onerror = () => setIsLoading(false);

      audioPlayer.onended = () => setElapsedTime(0);
    }
  }, [audioPlayer]);

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

  useEffect(
    function updateBufferedProgressOnScrubber() {
      if (bufferedBar) {
        const max = duration;
        const progressValue = buffered;
        const relativeProgressVal = ((progressValue / +max) * 100).toFixed(0);

        bufferedBar.style.backgroundSize = `${relativeProgressVal}% 100%`;
      }
    },
    [buffered, bufferedBar, duration, audioPlayer.buffered]
  );

  const onScrubberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    audioPlayer.currentTime = Number(newTime);
  };

  return (
    <div className={s.progressBarContainer}>
      <TimeValue> {formatTime(elapsedTime)}</TimeValue>
      {isLoading ? (
        <ScrubberLoader />
      ) : (
        <div className={s.progressBar}>
          <DurationBar />
          <ScrubberBar
            elapsedTime={elapsedTime}
            duration={duration}
            onScrubberChange={onScrubberChange}
            ref={progressBarRef}
          />
          <BufferedBar ref={bufferedBarRef} />
        </div>
      )}
      <TimeValue> {formatTime(duration)}</TimeValue>
    </div>
  );
};

export default ProgressBar;
