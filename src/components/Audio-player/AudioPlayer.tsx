import styles from "./AudioPlayer.module.css";
import React, { useRef, useState, useEffect } from "react";
import playSrc from "../../assets/images/play-button.svg";
import pauseSrc from "../../assets/images/pause-icon.svg";
import { formatTime } from "../../utils/formatTime";

function AudioPlayer({ srcLink }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [duration, setDuration] = useState(0);
  const [mediaTime, setMediaTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement>();
  const mediaTimeRef = useRef<HTMLInputElement>();

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
    // if (audioRef.current) {
    //   isPlaying ? audioRef.current.pause() : audioRef.current.play();
    // }
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

  useEffect(() => {
    if (mediaTimeRef.current) {
      const progressBar = mediaTimeRef.current;
      const value = mediaTime;
      const max = progressBar.max;
      progressBar.style.backgroundSize = `${(value / +max) * 100}% 100%`;
    }
  }, [mediaTime]);

  return (
    <div
      className={styles.playerContainer}
      // style={isReady ? { backgroundColor: "#93c4c1" } : null}
    >
      <p>{`${isPlaying}`}</p>
      <button className={styles.playButton} onClick={togglePlaying}>
        {isPlaying ? (
          <img
            className={styles.playIcon}
            src={pauseSrc}
            alt="play-button"
            loading="eager"
          />
        ) : (
          <img
            className={styles.playIcon}
            src={playSrc}
            alt="play-button"
            loading="eager"
          />
        )}
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

      <div className={styles.timeValue}>{formatTime(mediaTime)}</div>

      <audio
        className={styles.audioPlayer}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        preload="metadata"
        ref={audioRef}
        onCanPlayThrough={() => {
          setIsReady(true);
        }}
        // onPlay={() => {
        //   setIsPlaying(true);
        // }}
        // onPause={() => {
        //   setIsPlaying(false);
        // }}
        // onEnded={() => {
        //   setIsPlaying(false);
        // }}
      >
        <source src={srcLink} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioPlayer;
