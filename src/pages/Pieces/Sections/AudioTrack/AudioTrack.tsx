import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  memo,
  useState,
} from "react";
import cn from "classnames";

import AudioTitle from "./AudioTitle/AudioTitle";
import { PiecesContext } from "../../Pieces";
import { AudioTrackData } from "../../_types";

import s from "./AudioTrack.module.css";
import TvIcon from "../../../../components/Icons/TvIcon/TvIcon";
import HeadphonesIcon from "../../../../components/Icons/HeadphonesIcon/HeadphonesIcon";
import TrackButton from "./TrackButton/TrackButton";
import HorizontalOverlayButton from "../../../../components/Buttons/HorizontalOverlayButton/HorizontalOverlayButton";

type AudioTrackProps = {
  index: number;
  data: AudioTrackData;
  isSelected: boolean;
  extraStyles: any;
  setSelectedTrackIndex: Dispatch<SetStateAction<number>>;
};

const AudioTrack = memo(
  ({
    index,
    data,
    isSelected,
    extraStyles,
    setSelectedTrackIndex,
  }: AudioTrackProps) => {
    const {
      setIsPlayerOpened,
      setCurrentAudioData,
      setVideoID,
      setIsVideoPopupOpened,
      audioPlayerRef,
    } = useContext(PiecesContext);

    const [isPlaying, setIsPlaying] = useState(null);
    const [isPaused, setIsPaused] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const audioPlayer = audioPlayerRef.current;

    useEffect(
      function mountPlayerListeners() {
        const onPlayingHandler = () => {
          if (audioPlayer.src.includes(data.audioSrc)) {
            setIsPlaying(true);
            setIsLoading(false);
            setIsPaused(false);
          }
        };

        const onLoadingHandler = () => {
          if (audioPlayer.src.includes(data.audioSrc)) {
            setIsLoading(true);
          }
        };

        const onPauseHandler = () => {
          if (audioPlayer.src.includes(data.audioSrc)) {
            setIsPaused(true);
          }
        };

        if (audioPlayerRef) {
          audioPlayer.addEventListener("playing", onPlayingHandler);
          audioPlayer.addEventListener("waiting", onLoadingHandler);
          audioPlayer.addEventListener("pause", onPauseHandler);
        }

        return () => {
          if (audioPlayerRef) {
            audioPlayer.removeEventListener("playing", onPlayingHandler);
            audioPlayer.removeEventListener("waiting", onLoadingHandler);
            audioPlayer.removeEventListener("pause", onLoadingHandler);
          }
        };
      },
      [audioPlayerRef, audioPlayer, data.audioSrc, index]
    );

    useEffect(
      function highlightWhenSelected() {
        if (audioPlayer?.src.includes(data.audioSrc)) {
          setIsPlaying(true);

          if (audioPlayer.paused) {
            setIsPaused(true);
          }
        }
      },
      [
        data.audioSrc,
        audioPlayer,
        audioPlayer?.src,
        index,
        setSelectedTrackIndex,
      ]
    );

    useEffect(
      function clearTrackStates() {
        if (!audioPlayer?.src.includes(data.audioSrc)) {
          setIsPlaying(null);
          setIsLoading(null);
          setIsPaused(null);
        }
      },
      [audioPlayerRef, audioPlayer?.src, data.audioSrc, index]
    );

    // useEffect(() => {
    //   if (isSelected) {
    //     const timer = setTimeout(() => {
    //       setSelectedTrackIndex(null);
    //     }, 5000);

    //     return () => clearTimeout(timer);
    //   }
    // }, [isSelected, setSelectedTrackIndex, index]);

    function handleTrackClick() {
      setSelectedTrackIndex(index);
    }

    function handleWatchClick() {
      setIsPlayerOpened(false);
      audioPlayer.pause();
      audioPlayer.src = "";
      setVideoID(data.videoSrc);
      setIsVideoPopupOpened(true);
    }

    function handleListenClick() {
      audioPlayer.src = data.audioSrc;
      audioPlayer.play();
      setIsPlayerOpened(true);
      setCurrentAudioData({ ...data, index });
    }

    const trackButtonsClasses = cn(s.trackButtons, {
      [s.trackButtonsActive]: isSelected,
    });

    return (
      <div className={s.track} style={{ ...extraStyles }}>
        <div className={s.artworkContainer} onClick={handleTrackClick}>
          <img className={s.artwork} src={data.imageSrc} />

          <div className={trackButtonsClasses}>
            <HorizontalOverlayButton onClick={handleListenClick}>
              <HeadphonesIcon className={s.Icon} />
              <div className={s.iconCaption}>Listen</div>
            </HorizontalOverlayButton>

            <HorizontalOverlayButton onClick={handleWatchClick}>
              <TvIcon className={s.Icon} />
              <div className={s.iconCaption}>Watch</div>
            </HorizontalOverlayButton>
          </div>
        </div>

        <AudioTitle
          isPlaying={isPlaying}
          isLoading={isLoading}
          isPaused={isPaused}
          name={data.name}
        />
      </div>
    );
  }
);

export default AudioTrack;
