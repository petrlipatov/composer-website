import styles from "./AudioPlayer.module.css";
import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  RefObject,
  Dispatch,
  SetStateAction,
} from "react";
import playSrc from "../../assets/images/play-button.svg";
import pauseSrc from "../../assets/images/pause-icon.svg";
import { formatTime } from "../../utils/formatTime";

type AudioPlayerProps = {
  index: number;
  link: string;
  duration: number;
  elapsedTime: number;
  isActive: boolean;
  setActiveAudio: Dispatch<SetStateAction<number>>;
};

const AudioPlayer = forwardRef(
  (
    {
      index,
      link,
      duration,
      elapsedTime,
      isActive,
      setActiveAudio,
    }: AudioPlayerProps,
    ref: RefObject<HTMLAudioElement>
  ) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackDuration, setTrackDuration] = useState(0);
    const [trackElapsedTime, setTrackElapsedTime] = useState(0);

    const mediaTimeRef = useRef<HTMLInputElement>();
    const currentAudioTrack = ref.current;

    const togglePlaying = () => {
      if (!isActive) {
        currentAudioTrack.src = link;
        currentAudioTrack.load();
        setActiveAudio(index);
      }

      setIsPlaying(!isPlaying);
      isPlaying ? ref.current.pause() : ref.current.play();
    };

    useEffect(
      function activateOrDeactivateTrack() {
        if (isActive) {
          setTrackDuration(duration);
          setTrackElapsedTime(elapsedTime);
        } else {
          setTrackDuration(0);
          setTrackElapsedTime(0);
        }
      },
      [isActive, duration, elapsedTime]
    );

    useEffect(
      function clearControllersWhenSwitched() {
        if (!isActive && isPlaying) {
          setIsPlaying(false);
          mediaTimeRef.current.style.backgroundSize = "0";
        }
      },
      [isActive, isPlaying]
    );

    useEffect(
      function updateElapsedProgress() {
        if (mediaTimeRef.current && isActive) {
          const progressBar = mediaTimeRef.current;
          const value = trackElapsedTime;
          const max = progressBar.max;
          progressBar.style.backgroundSize = `${(value / +max) * 100}% 100%`;
        }
      },
      [trackElapsedTime]
    );

    // const onScrubberChange = (event) => {
    //   const newTime = event.target.value;
    //   setMediaTime(newTime);
    //   audioRef.current.currentTime = newTime;
    // };

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
          value={trackElapsedTime}
          min={0}
          max={trackDuration}
          // onChange={onScrubberChange}
          ref={mediaTimeRef}
        />

        <div className={styles.timeValue}>{formatTime(trackElapsedTime)}</div>
      </div>
    );
  }
);

export default AudioPlayer;
