import {
  useRef,
  useEffect,
  useContext,
  forwardRef,
  RefObject,
  Dispatch,
  SetStateAction,
} from "react";
import s from "./AudioPlayer.module.css";
import playSrc from "../../assets/images/play.svg";
import pauseSrc from "../../assets/images/pause.svg";
import closeIcon from "../../assets/images/close-icon_black.svg";
import cn from "classnames";
import { formatTime } from "../../utils/helpers/formatTime";
// import test from "/audio/Theory-of-Light-Master.mp3";

type AudioPlayerProps = {
  duration: number;
  elapsedTime: number;
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
        <img className={s.closeIcon} src={closeIcon} onClick={onClose} />
      </div>
    );
  }
);

export default AudioPlayer;
