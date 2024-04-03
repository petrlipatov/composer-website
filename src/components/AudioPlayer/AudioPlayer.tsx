import {
  useRef,
  useEffect,
  forwardRef,
  RefObject,
  Dispatch,
  SetStateAction,
} from "react";
import AudioPlayerPreloader from "./AudioPlayerPreloader/AudioPlayerPreloader";
import playSrc from "../../assets/images/play.svg";
import playNextSrc from "../../assets/images/play-next.svg";
import pauseSrc from "../../assets/images/pause.svg";
import closeIcon from "../../assets/images/close-icon_black.svg";
import artworkIcon from "../../assets/images/track.webp";
import cn from "classnames";
import { formatTime } from "../../utils/helpers/formatTime";
import s from "./AudioPlayer.module.css";
// import test from "/audio/Theory-of-Light-Master.mp3";

type AudioPlayerProps = {
  duration: number;
  elapsedTime: number;
  isLoading: boolean;
  filteredPieces: any;
  playingAudioTitle: string;
  setPlayingAudioTitle: Dispatch<SetStateAction<string>>;
  isPlayerOpened: boolean;
  setIsPlayerOpened: Dispatch<SetStateAction<boolean>>;
  isAudioPlaying: boolean;
  setIsAudioPlaying: Dispatch<SetStateAction<boolean>>;
};

const AudioPlayer = forwardRef(
  (
    {
      duration,
      elapsedTime,
      isLoading,
      filteredPieces,
      playingAudioTitle,
      setPlayingAudioTitle,
      isPlayerOpened,
      setIsPlayerOpened,
      isAudioPlaying,
      setIsAudioPlaying,
    }: AudioPlayerProps,
    ref: RefObject<HTMLAudioElement>
  ) => {
    const audioPlayerRef = ref.current;
    const progressBarRef = useRef<HTMLInputElement>();
    const progressBar = progressBarRef.current;
    // const bufferBarRef = useRef<HTMLDivElement>();
    // const bufferBar = progressBarRef.current;

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
      if (isAudioPlaying) {
        audioPlayerRef.pause();
      } else {
        audioPlayerRef.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    };

    // audio player controllers

    const playNextTrack = (playingTrackName, prevOrNext) => {
      if (isAudioPlaying) {
        const playingTrackIndex = filteredPieces.findIndex(
          (piece) => piece.name === playingTrackName
        );

        let nextSongIndex = 0;

        switch (prevOrNext) {
          case "next":
            nextSongIndex = playingTrackIndex + 1;
            break;
          case "prev":
            nextSongIndex = playingTrackIndex - 1;
            break;
        }

        const nextTrack = filteredPieces[nextSongIndex];
        if (nextTrack) {
          setPlayingAudioTitle(nextTrack.name);
          audioPlayerRef.src = nextTrack.audioSrc;
          audioPlayerRef.play();
        }
      }
    };

    const onScrubberChange = (e) => {
      const newTime = e.target.value;
      audioPlayerRef.currentTime = newTime;
    };

    const onClose = () => {
      audioPlayerRef.pause();
      audioPlayerRef.src = "";
      setIsPlayerOpened(false);
    };

    const playerClasses = cn(s.playerSection, {
      [s.playerSectionActive]: isPlayerOpened == true,
    });

    return (
      <div className={playerClasses}>
        <div className={s.title}>{playingAudioTitle}</div>

        <div className={s.buttonsContainer}>
          <img
            className={cn(s.playNextIcon, s.playNextIconLeft)}
            src={playNextSrc}
            alt="play-next-button"
            onClick={() => playNextTrack(playingAudioTitle, "prev")}
          />

          <button className={s.playButton} onClick={togglePlaying}>
            <img
              className={s.playIcon}
              src={pauseSrc}
              alt="pause-button"
              style={isAudioPlaying ? {} : { display: "none" }}
            />

            <img
              className={s.playIcon}
              src={playSrc}
              alt="play-button"
              style={isAudioPlaying ? { display: "none" } : {}}
            />
          </button>

          <img
            className={s.playNextIcon}
            src={playNextSrc}
            alt="play-next-button"
            onClick={() => playNextTrack(playingAudioTitle, "next")}
          />
        </div>

        <div className={s.timeScrubberContainer}>
          <div className={s.timeValue}>{formatTime(elapsedTime)}</div>
          {isLoading ? (
            <AudioPlayerPreloader />
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
          {/* <div className={s.bufferedTimeline} ref={bufferBarRef} /> */}
          <div className={s.timeValue}>{formatTime(duration)}</div>
        </div>

        <img className={s.closeIcon} src={closeIcon} onClick={onClose} />
        <img className={s.artwork} src={artworkIcon} />
      </div>
    );
  }
);

export default AudioPlayer;
