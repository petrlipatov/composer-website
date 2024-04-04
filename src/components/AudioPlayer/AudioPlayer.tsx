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
import videoIcon from "../../assets/images/tv.svg";

import cn from "classnames";
import { formatTime } from "../../utils/helpers/formatTime";
import s from "./AudioPlayer.module.css";
import { PlayerState } from "../../pages/Pieces/Mobile/PiecesMobile";
import { AudioTrackData } from "../../types";

type AudioPlayerProps = {
  playerState: PlayerState;
  setPlayerState: Dispatch<SetStateAction<PlayerState>>;
  filteredPieces: AudioTrackData[];
};

const AudioPlayer = forwardRef(
  (
    { filteredPieces, playerState, setPlayerState }: AudioPlayerProps,
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
          const progressValue = playerState.elapsedTime;
          const relativeProgressVal = ((progressValue / +max) * 100).toFixed(1);
          progressBar.style.backgroundSize = `${relativeProgressVal}% 100%`;
        }
      },
      [playerState.elapsedTime]
    );

    const togglePlaying = () => {
      if (playerState.isAudioPlaying) {
        audioPlayerRef.pause();
      } else {
        audioPlayerRef.play();
      }
      setPlayerState({
        ...playerState,
        isAudioPlaying: !playerState.isAudioPlaying,
      });
    };

    const playNextTrack = (playingTrackName, prevOrNext) => {
      if (playerState.isAudioPlaying) {
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
          setPlayerState({
            ...playerState,
            playingAudioTitle: nextTrack.name,
            playingAudioImageSrc: nextTrack.imageSrc,
            playingAudioIndex: nextSongIndex,
          });
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
      setPlayerState({
        ...playerState,
        isPlayerOpened: false,
        isAudioPlaying: false,
      });
    };

    const playerClasses = cn(s.playerSection, {
      [s.playerSectionActive]: playerState.isPlayerOpened == true,
    });

    return (
      <div className={playerClasses}>
        <div className={s.title}>{playerState.playingAudioTitle}</div>

        <div className={s.buttonsContainer}>
          <button className={s.playNextButton}>
            <img
              className={cn(s.playNextIcon, s.playNextIconLeft)}
              src={playNextSrc}
              alt="play-next-button"
              onClick={() =>
                playNextTrack(playerState.playingAudioTitle, "prev")
              }
            />
          </button>

          <button className={s.playButton} onClick={togglePlaying}>
            <img
              className={s.playIcon}
              src={pauseSrc}
              alt="pause-button"
              style={playerState.isAudioPlaying ? {} : { display: "none" }}
            />

            <img
              className={s.playIcon}
              src={playSrc}
              alt="play-button"
              style={playerState.isAudioPlaying ? { display: "none" } : {}}
            />
          </button>

          <button className={s.playNextButton}>
            <img
              className={s.playNextIcon}
              src={playNextSrc}
              alt="play-next-button"
              onClick={() =>
                playNextTrack(playerState.playingAudioTitle, "next")
              }
            />
          </button>
        </div>

        <div className={s.timeScrubberContainer}>
          <div className={s.timeValue}>
            {formatTime(playerState.elapsedTime)}
          </div>
          {playerState.isLoading ? (
            <AudioPlayerPreloader />
          ) : (
            <input
              className={s.timeScrubber}
              type="range"
              value={playerState.elapsedTime}
              min={0}
              max={playerState.duration}
              onChange={onScrubberChange}
              ref={progressBarRef}
            />
          )}
          {/* <div className={s.bufferedTimeline} ref={bufferBarRef} /> */}
          <div className={s.timeValue}>{formatTime(playerState.duration)}</div>
        </div>

        <img className={s.videoIcon} src={videoIcon} />
        <img className={s.closeIcon} src={closeIcon} onClick={onClose} />
        <img className={s.artwork} src={playerState.playingAudioImageSrc} />
      </div>
    );
  }
);

export default AudioPlayer;
