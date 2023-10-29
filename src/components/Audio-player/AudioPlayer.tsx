import styles from "./AudioPlayer.module.css";
import React, { useRef, useState, useEffect } from "react";
import playSrc from "../../assets/images/play-button.svg";
import pauseSrc from "../../assets/images/pause-icon.svg";
// import { formatTime } from "../../utils/formatTime";

function AudioPlayer({ srcLink }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [mediaTime, setMediaTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement>();
  const mediaTimeRef = useRef<HTMLInputElement>();
  // const playButtonRef = useRef<HTMLButtonElement>();

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
    }
  };

  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const onTimeUpdate = () => {
    setMediaTime(audioRef.current.currentTime);
  };

  const onScrubberChange = (event) => {
    const newTime = event.target.value;
    setMediaTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  // useEffect(() => {
  //   const playButton = playButtonRef.current;
  //   playButton.addEventListener("touchstart", togglePlaying);
  //   return () => {
  //     playButton.removeEventListener("touchstart", togglePlaying);
  //   };
  // }, []);

  useEffect(() => {
    if (mediaTimeRef.current) {
      const progressBar = mediaTimeRef.current;
      const value = mediaTime;
      const max = progressBar.max;
      progressBar.style.backgroundSize = `${(value / +max) * 100}% 100%`;
    }
  }, [mediaTime]);

  return (
    <div className={styles.playerContainer}>
      <button className={styles.playButton} onClick={togglePlaying}>
        <img
          className={styles.playIcon}
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
        ref={mediaTimeRef}
      />

      {/* <div>{formatTime(mediaTime)}</div> */}
      <audio
        className={styles.audioPlayer}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="metadata"
        ref={audioRef}
      >
        <source src={srcLink} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioPlayer;
