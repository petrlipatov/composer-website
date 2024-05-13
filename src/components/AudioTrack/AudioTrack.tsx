import {
  Dispatch,
  RefObject,
  SetStateAction,
  forwardRef,
  useContext,
  useEffect,
  useState,
  memo,
} from "react";
import cn from "classnames";

import AudioTitle from "./AudioTitle/AudioTitle";
import { PiecesContext } from "../../pages/Pieces/Pieces";
import { AudioTrackData } from "../../types";

import tvIconSrc from "../../assets/images/tv.svg";
import hedphonesIconSrc from "../../assets/images/headphone50.svg";

import s from "./AudioTrack.module.css";

type AudioTrackProps = {
  index: number;
  data: AudioTrackData;
  isSelected: boolean;
  setSelectedTrackIndex: Dispatch<SetStateAction<number>>;
};

const AudioTrack = memo(
  forwardRef(
    (
      { index, isSelected, data, setSelectedTrackIndex }: AudioTrackProps,
      ref: RefObject<HTMLAudioElement>
    ) => {
      const [isPaused, setIsPaused] = useState(false);
      const [isPlaying, setIsPlaying] = useState(false);
      const [isLoading, setIsLoading] = useState(false);

      const {
        setIsPlayerOpened,
        setCurrentAudioData,
        setVideoID,
        setIsVideoPopupOpened,
      } = useContext(PiecesContext);

      const audioPlayerRef = ref?.current;

      useEffect(
        function mountPlayerListeners() {
          const onPlayingHandler = () => {
            if (audioPlayerRef.src.includes(data.audioSrc)) {
              setIsPlaying(true);
              setIsLoading(false);
              setIsPaused(false);
            }
          };

          const onLoadingHandler = () => {
            if (audioPlayerRef.src.includes(data.audioSrc)) {
              setIsLoading(true);
            }
          };

          const onPauseHandler = () => {
            if (audioPlayerRef.src.includes(data.audioSrc)) {
              setIsPaused(true);
            }
          };

          if (audioPlayerRef) {
            audioPlayerRef.addEventListener("playing", onPlayingHandler);
            audioPlayerRef.addEventListener("waiting", onLoadingHandler);
            audioPlayerRef.addEventListener("pause", onPauseHandler);
          }

          return () => {
            if (audioPlayerRef) {
              audioPlayerRef.removeEventListener("playing", onPlayingHandler);
              audioPlayerRef.removeEventListener("waiting", onLoadingHandler);
              audioPlayerRef.removeEventListener("pause", onLoadingHandler);
            }
          };
        },
        [audioPlayerRef, audioPlayerRef?.src, data.audioSrc]
      );

      useEffect(
        function clearTrackStates() {
          if (!audioPlayerRef?.src.includes(data.audioSrc)) {
            setIsPaused(false);
            setIsLoading(false);
            setIsPlaying(false);
          }
        },
        [audioPlayerRef, audioPlayerRef?.src, data.audioSrc]
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

      function handleWatchClick(e) {
        e.stopPropagation();
        setIsPlayerOpened(false);
        audioPlayerRef.pause();
        audioPlayerRef.src = "";
        setVideoID(data.videoSrc);
        setIsVideoPopupOpened(true);
      }

      function handleListenClick(e) {
        e.stopPropagation();
        audioPlayerRef.src = data.audioSrc;
        audioPlayerRef.play();
        setIsPlayerOpened(true);
        setCurrentAudioData({ ...data, index });
      }

      const trackImageMaskClasses = cn(s.trackImageMask, {
        [s.trackImageMaskSelected]: isSelected,
      });

      return (
        <div className={s.track}>
          <div className={s.trackImageContainer} onClick={handleTrackClick}>
            <img className={s.trackImage} src={data.imageSrc} />
            <div className={trackImageMaskClasses}>
              {isSelected && (
                <>
                  <div
                    className={s.imageMaskButtonLeft}
                    onClick={handleListenClick}
                  >
                    <img
                      className={cn(s.imageMaskIcon, s.imageMaskIconLeft)}
                      src={hedphonesIconSrc}
                    />
                    <div
                      className={cn(s.imageMaskCaption, s.imageMaskCaptionLeft)}
                    >
                      Listen
                    </div>
                  </div>
                  <div
                    className={s.imageMaskButtonRight}
                    onClick={handleWatchClick}
                  >
                    <img className={cn(s.imageMaskIcon)} src={tvIconSrc} />
                    <div className={s.imageMaskCaption}>Watch</div>
                  </div>
                </>
              )}
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
  )
);

export default AudioTrack;
