import styles from "./AudioTrack.module.css";
import playSrc from "../../assets/images/play-button.svg";
import {
  useState,
  forwardRef,
  RefObject,
  Dispatch,
  SetStateAction,
} from "react";
import imgSrc from "../../assets/images/imgPlayer.webp";
import AudioPlayer from "../Audio-player-view/AudioPlayerView";

type playerState = {
  elapsedTime: number;
  duration: number;
  isLoading: boolean;
};

type AudioTrackProps = {
  index: number;
  name: string;
  link: string;
  isAudioTrackPlaying: boolean;
  setPlayingAudioTrack: Dispatch<SetStateAction<number>>;
  playerState: playerState;
  setPlayerState: Dispatch<SetStateAction<playerState>>;
};

const AudioTrack = forwardRef(
  (
    {
      index,
      name,
      link,
      isAudioTrackPlaying,
      setPlayingAudioTrack,
      playerState,
      setPlayerState,
    }: AudioTrackProps,
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
                isAudioTrackPlaying={isAudioTrackPlaying}
                setPlayingAudioTrack={setPlayingAudioTrack}
                playerState={playerState}
                setPlayerState={setPlayerState}
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

export default AudioTrack;
