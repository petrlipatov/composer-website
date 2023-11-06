import styles from "./AudioElement.module.css";
import playSrc from "../../assets/images/play-button.svg";
import {
  useState,
  forwardRef,
  RefObject,
  Dispatch,
  SetStateAction,
} from "react";
import imgSrc from "../../assets/images/imgPlayer.webp";
import AudioPlayer from "../Audio-player/AudioPlayer";

type AudioElementProps = {
  index: number;
  name: string;
  link: string;
  duration: number;
  elapsedTime: number;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isActive: boolean;
  setActiveAudio: Dispatch<SetStateAction<number>>;
};

const AudioElement = forwardRef(
  (
    {
      index,
      name,
      link,
      duration,
      elapsedTime,
      isLoading,
      setIsLoading,
      isActive,
      setActiveAudio,
    }: AudioElementProps,
    ref: RefObject<HTMLAudioElement>
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleTrackClick = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className={styles.audioElementContainer}>
        <div className={styles.track} onClick={handleTrackClick}>
          <img
            className={styles.playButton}
            style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            src={playSrc}
            alt="play-logo"
          />
          <p className={styles.title}>{`${index + 1}. ${name}`}</p>
        </div>

        <div
          className={styles.contentContainer}
          style={{ display: isOpen ? "flex" : "none" }}
        >
          <div className={styles.content}>
            <div className={styles.audioPlayerContainer}>
              <AudioPlayer
                index={index}
                link={link}
                duration={duration}
                elapsedTime={elapsedTime}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isActive={isActive}
                setActiveAudio={setActiveAudio}
                ref={ref}
              />
            </div>
            <img className={styles.videoPlayer} src={imgSrc} loading="lazy" />
          </div>
        </div>
      </div>
    );
  }
);

export default AudioElement;
