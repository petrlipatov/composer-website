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

type AudioPlayerProps = {
  isPlayerOpened: boolean;
  setIsPlayerOpened: Dispatch<SetStateAction<boolean>>;
  setSelectedTrack: Dispatch<SetStateAction<number>>;
  filteredPieces: AudioTrackData[];
};

const AudioPlayer = forwardRef(
  (
    {
      filteredPieces,
      isPlayerOpened,
      setIsPlayerOpened,
      setSelectedTrack,
    }: AudioPlayerProps,
    ref: RefObject<HTMLAudioElement>
  ) => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [playingTrack, setPlayingTrack] = useState<AudioTrackData>();
    const [playingTrackName, setPlayingTrackName] = useState<string>();

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

    useEffect(() => {
      if (audioPlayerRef) {
        const track = filteredPieces.find((track) =>
          audioPlayerRef.src.includes(track.audioSrc)
        );

        if (track) {
          setPlayingTrack(track);
          setPlayingTrackName(track.name);
        } else {
          setPlayingTrack(null);
          setPlayingTrackName("");
        }
      }
    }, [audioPlayerRef, audioPlayerRef?.src, filteredPieces]);

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

      const playingTrackIndex = filteredPieces.indexOf(playingTrack);

      prevOrNext === "next"
        ? (nextSongIndex = playingTrackIndex + 1)
        : (nextSongIndex = playingTrackIndex - 1);

      const nextTrack = filteredPieces[nextSongIndex];

      if (nextTrack) {
        audioPlayerRef.src = nextTrack.audioSrc;
        setSelectedTrack(nextSongIndex);
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
        <div className={s.title}>{playingTrackName}</div>

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
        <img className={s.artwork} src={playingTrack?.imageSrc} />
      </div>
    );
  }
);

export default AudioPlayer;
