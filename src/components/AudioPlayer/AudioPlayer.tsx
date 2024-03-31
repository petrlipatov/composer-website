import { useState, useRef, useEffect } from "react";
import s from "./AudioPlayer.module.css";
import playSrc from "../../assets/images/play.svg";
import pauseSrc from "../../assets/images/pause.svg";
import closeIcon from "../../assets/images/close-icon_black.svg";
import cn from "classnames";
import { formatTime } from "../../utils/helpers/formatTime";
import test from "/audio/Theory-of-Light-Master.mp3";

export default function AudioPlayer({
  isPlayerOpened,
  setIsPlayerOpened,
  audioSrc,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const audioPlayerRef = useRef<HTMLAudioElement>();
  const progressBarRef = useRef<HTMLInputElement>();
  const progressBar = progressBarRef.current;

  const playerClasses = cn(s.playerSection, {
    [s.playerSectionActive]: isPlayerOpened == true,
  });

  useEffect(
    function clearAudioIfPlayerClosed() {
      if (isPlayerOpened === false) {
        // audioPlayerRef.current.src = "";
      }
    },
    [isPlayerOpened]
  );

  useEffect(
    function updateElapsedProgressOnScrubber() {
      if (progressBar) {
        const max = progressBar.max;
        const progressValue = elapsedTime;
        const relativeProgressVal = ((progressValue / +max) * 100).toFixed(1);
        progressBar.style.backgroundSize = `${relativeProgressVal}% 100%`;
      }
    },
    [elapsedTime]
  );

  const togglePlaying = () => {
    console.log(audioPlayerRef.current.src);
    if (isPlaying) {
      audioPlayerRef.current.pause();
    } else {
      audioPlayerRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onLoadedMetadata = () => {
    setDuration(audioPlayerRef.current.duration);
  };

  const onTimeUpdate = () => {
    if (elapsedTime <= duration) {
      setElapsedTime(audioPlayerRef.current.currentTime);
    }
  };

  const onScrubberChange = (e) => {
    const newTime = e.target.value;
    audioPlayerRef.current.currentTime = newTime;
  };

  const onEnded = () => {
    setElapsedTime(0);
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={playerClasses}>
      <audio
        // preload="none"
        ref={audioPlayerRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onPlaying={() => setIsLoading(false)}
        onWaiting={() => setIsLoading(true)}
        onEnded={onEnded}
      >
        <source src={test} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button className={s.playButton} onClick={togglePlaying}>
        <img
          className={s.playIcon}
          src={pauseSrc}
          alt="pause-button"
          style={isPlaying ? {} : { display: "none" }}
        />

        <img
          className={s.playIcon}
          src={playSrc}
          alt="play-button"
          style={isPlaying ? { display: "none" } : {}}
        />
      </button>

      <div className={s.timeScrubberContainer}>
        <div>{formatTime(elapsedTime)}</div>
        <input
          className={s.timeScrubber}
          type="range"
          value={elapsedTime}
          min={0}
          max={duration}
          onChange={onScrubberChange}
          ref={progressBarRef}
        />
        <div>{formatTime(duration)}</div>
      </div>
      <img
        className={s.closeIcon}
        src={closeIcon}
        onClick={() => setIsPlayerOpened(false)}
      />
    </div>
  );
}
