import styles from "./AudioPlayer.module.css";
import React, { useRef, useState } from "react";
import playSrc from "../../assets/images/play-button.svg";
import pauseSrc from "../../assets/images/pause-icon.svg";
import { formatTime } from "../../utils/formatTime";

function AudioPlayer({ srcLink }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [mediaTime, setMediaTime] = useState(0);
  const ref = useRef<HTMLAudioElement>();

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
    if (ref.current) {
      isPlaying ? ref.current.pause() : ref.current.play();
    }
  };

  const onLoadedMetadata = () => {
    setDuration(ref.current.duration);
  };

  const onTimeUpdate = () => {
    setMediaTime(ref.current.currentTime);
  };

  const onScrubberChange = (event) => {
    const newTime = event.target.value;
    setMediaTime(newTime);
    ref.current.currentTime = newTime;
  };

  return (
    <div className={styles.playerContainer}>
      <button className={styles.playButton}>
        <img
          className={styles.playIcon}
          onClick={togglePlaying}
          src={isPlaying ? pauseSrc : playSrc}
          alt="play-button"
        />
      </button>
      <input
        className={styles.timeScrubber}
        type="range"
        id="time-scrubber"
        value={mediaTime}
        min={0}
        max={duration}
        onChange={onScrubberChange}
      />

      {/* <div>{formatTime(mediaTime)}</div> */}
      <audio
        className={styles.audioPlayer}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="metadata"
        ref={ref}
      >
        <source src={srcLink} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioPlayer;
