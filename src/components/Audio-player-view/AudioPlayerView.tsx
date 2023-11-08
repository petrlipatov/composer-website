import styles from "./AudioPlayerView.module.css";
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
import Preloader from "../Preloader/Preloader";

type audioState = {
  elapsedTime: number;
  duration: number;
  isLoading: boolean;
};

type AudioPlayerProps = {
  index: number;
  link: string;
  isAudioTrackPlaying: boolean;
  setPlayingAudioTrack: Dispatch<SetStateAction<number>>;
  playerState: audioState;
  setPlayerState: Dispatch<SetStateAction<audioState>>;
};

const AudioPlayer = forwardRef(
  (
    {
      index,
      link,
      isAudioTrackPlaying,
      setPlayingAudioTrack,
      playerState,
      setPlayerState,
    }: AudioPlayerProps,
    ref: RefObject<HTMLAudioElement>
  ) => {
    1;
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackDuration, setTrackDuration] = useState(0);
    const [trackElapsedTime, setTrackElapsedTime] = useState(0);

    const { duration, elapsedTime, isLoading } = playerState;

    const mediaTimeRef = useRef<HTMLInputElement>();
    const currentAudioTrack = ref.current;

    const togglePlaying = () => {
      if (!isAudioTrackPlaying) {
        setPlayerState({ ...playerState, isLoading: true });
        currentAudioTrack.src = link;
        currentAudioTrack.load();
        setPlayingAudioTrack(index);
      }

      setIsPlaying(!isPlaying);
      isPlaying ? ref.current.pause() : ref.current.play();
    };

    useEffect(
      function activateOrDeactivateTrack() {
        if (isAudioTrackPlaying) {
          setTrackDuration(duration);
          setTrackElapsedTime(elapsedTime);
        } else {
          setTrackDuration(0);
          setTrackElapsedTime(0);
        }
      },
      [isAudioTrackPlaying, duration, elapsedTime]
    );

    useEffect(
      function clearControllersWhenSwitched() {
        if (!isAudioTrackPlaying && isPlaying) {
          setIsPlaying(false);
          if (mediaTimeRef.current) {
            mediaTimeRef.current.style.backgroundSize = "0";
          }
        }
      },
      [isAudioTrackPlaying, isPlaying]
    );

    useEffect(
      function updateElapsedProgress() {
        if (mediaTimeRef.current && isAudioTrackPlaying) {
          const progressBar = mediaTimeRef.current;
          const value = trackElapsedTime;
          const max = progressBar.max;
          progressBar.style.backgroundSize = `${(value / +max) * 100}% 100%`;
        }
      },
      [trackElapsedTime, isAudioTrackPlaying]
    );

    const onScrubberChange = (event) => {
      if (isAudioTrackPlaying) {
        const newTime = event.target.value;
        currentAudioTrack.currentTime = newTime;
      }
    };

    return (
      <div className={styles.playerContainer}>
        {isLoading && isAudioTrackPlaying ? (
          <Preloader content={"preloader"} />
        ) : (
          <>
            <button className={styles.playButton} onClick={togglePlaying}>
              {isPlaying ? (
                <img
                  className={styles.playIcon}
                  src={pauseSrc}
                  alt="play-button"
                  loading="eager"
                  rel="preload"
                  decoding="sync"
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
              onChange={onScrubberChange}
              ref={mediaTimeRef}
            />

            <div className={styles.timeValue}>
              {formatTime(trackElapsedTime)}
            </div>
          </>
        )}
      </div>
    );
  }
);

export default AudioPlayer;
