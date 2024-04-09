import {
  forwardRef,
  RefObject,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import playSrc from "../../assets/images/play.svg";
import pauseSrc from "../../assets/images/pause.svg";
import closeIcon from "../../assets/images/close-icon_black.svg";
import videoIcon from "../../assets/images/tv.svg";

import cn from "classnames";
import s from "./AudioPlayer.module.css";
import { AudioTrackData } from "../../types";
import ProgressBar from "./ProgressBar/ProgressBar";
import { PlayingAudioData } from "../../pages/Pieces/Mobile/PiecesMobile";

type AudioPlayerProps = {
  isPlayerOpened: boolean;
  playingAudioData: PlayingAudioData;
  setPlayingAudioData: Dispatch<SetStateAction<PlayingAudioData>>;
  setIsPlayerOpened: Dispatch<SetStateAction<boolean>>;
  setSelectedTrack: Dispatch<SetStateAction<number>>;
  filteredPieces: AudioTrackData[];
};

const AudioPlayer = forwardRef(
  (
    {
      filteredPieces,
      isPlayerOpened,
      playingAudioData,
      setPlayingAudioData,
      setIsPlayerOpened,
      setSelectedTrack,
    }: AudioPlayerProps,
    ref: RefObject<HTMLAudioElement>
  ) => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const audioPlayerRef = ref.current;

    useEffect(() => {
      const onPlayingHandler = () => {
        setIsAudioPlaying(true);
      };

      if (audioPlayerRef) {
        audioPlayerRef.addEventListener("playing", onPlayingHandler);
      }

      return () => {
        if (audioPlayerRef) {
          audioPlayerRef.removeEventListener("playing", onPlayingHandler);
        }
      };
    }, [audioPlayerRef]);

    const togglePlaying = () => {
      if (isAudioPlaying) {
        audioPlayerRef.pause();
      } else {
        audioPlayerRef.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    };

    const playNextTrack = (prevOrNext) => {
      let nextSongIndex = 0;

      prevOrNext === "next"
        ? (nextSongIndex = playingAudioData.index + 1)
        : (nextSongIndex = playingAudioData.index - 1);

      const nextTrack = filteredPieces[nextSongIndex];

      if (nextTrack) {
        audioPlayerRef.src = nextTrack.audioSrc;
        setSelectedTrack(nextSongIndex);
        setPlayingAudioData({
          index: filteredPieces.indexOf(nextTrack),
          name: nextTrack.name,
          imageSource: nextTrack.imageSrc,
          videoSource: nextTrack.videoSrc,
        });
      }
      if (nextTrack && isAudioPlaying) audioPlayerRef.play();
    };

    const onClose = () => {
      audioPlayerRef.pause();
      audioPlayerRef.src = "";
      setIsAudioPlaying(false);
      setIsPlayerOpened(false);
    };

    const playerClasses = cn(s.playerSection, {
      [s.playerSectionActive]: isPlayerOpened == true,
    });

    return (
      <div className={playerClasses}>
        <div className={s.title}>{playingAudioData?.name}</div>

        <div className={s.buttonsContainer}>
          <button
            type="button"
            className={s.playPreviousButton}
            onClick={() => playNextTrack("prev")}
          />

          <button
            type="button"
            className={s.playButton}
            onClick={togglePlaying}
          >
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

          <button
            type="button"
            className={s.playNextButton}
            onClick={() => playNextTrack("next")}
          />
        </div>

        <ProgressBar ref={ref} />

        <img className={s.videoIcon} src={videoIcon} />
        <img className={s.closeIcon} src={closeIcon} onClick={onClose} />
        <img className={s.artwork} src={playingAudioData?.imageSource} />
      </div>
    );
  }
);

export default AudioPlayer;
