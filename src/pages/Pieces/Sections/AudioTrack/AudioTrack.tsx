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

import tvIconSrc from "../../../../assets/images/tv.svg";
import hedphonesIconSrc from "../../../../assets/images/headphone50.svg";

import s from "./AudioTrack.module.css";

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

    useEffect(() => {
      if (isSelected) {
        const timer = setTimeout(() => {
          setSelectedTrackIndex(null);
        }, 5000);

        return () => clearTimeout(timer);
      }
    }, [isSelected, setSelectedTrackIndex, index]);

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

    const trackImageMaskClasses = cn(s.trackImageMask, {
      [s.trackImageMaskSelected]: isSelected,
    });

    return (
      <div className={s.track} style={{ ...extraStyles }}>
        <div className={s.trackImageContainer} onClick={handleTrackClick}>
          <img className={s.trackImage} src={data.imageSrc} />

          <div className={trackImageMaskClasses}>
            <div className={s.imageMaskButtonLeft} onClick={handleListenClick}>
              <img
                className={cn(s.imageMaskIcon, s.imageMaskIconLeft)}
                src={hedphonesIconSrc}
              />
              <div className={cn(s.imageMaskCaption, s.imageMaskCaptionLeft)}>
                Listen
              </div>
            </div>
            <div className={s.imageMaskButtonRight} onClick={handleWatchClick}>
              <img className={cn(s.imageMaskIcon)} src={tvIconSrc} />
              <div className={s.imageMaskCaption}>Watch</div>
            </div>
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
