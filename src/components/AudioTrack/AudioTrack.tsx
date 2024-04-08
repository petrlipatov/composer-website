import cn from "classnames";
import s from "./AudioTrack.module.css";
import tvIconSrc from "../../assets/images/tv.svg";
import hedphonesIconSrc from "../../assets/images/headphone50.svg";
import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  forwardRef,
  useEffect,
} from "react";
import AudioTitle from "./AudioTitle/AudioTitle";
import { PlayerState } from "../../pages/Pieces/Mobile/PiecesMobile";

type AudioTrackProps = {
  index: number;
  name: string;
  imageSource: string;
  audioSource: string;
  videoSource: string;
  selectedTrack: number;
  playerState;
  openPopup: () => void;
  setSelectedTrack: Dispatch<SetStateAction<number>>;
  setVideoId: Dispatch<SetStateAction<string>>;
  setPlayerState: Dispatch<SetStateAction<PlayerState>>;
  setIsPlayerOpened: Dispatch<SetStateAction<boolean>>;
};

const AudioTrackUnmemoized = forwardRef(
  (
    {
      index,
      name,
      imageSource,
      audioSource,
      videoSource,
      selectedTrack,
      playerState,
      setSelectedTrack,
      setVideoId,
      setPlayerState,
      setIsPlayerOpened,
      openPopup,
    }: AudioTrackProps,
    ref: RefObject<HTMLAudioElement>
  ) => {
    const audioPlayerRef = ref.current;

    useEffect(() => {
      if (selectedTrack === index) {
        const timer = setTimeout(() => {
          setSelectedTrack(null);
        }, 5000);

        return () => clearTimeout(timer);
      }
    }, [selectedTrack]);

    function handleTrackClick() {
      setSelectedTrack(index);
    }

    function handleWatchClick(e) {
      e.stopPropagation();
      setPlayerState({ ...playerState, isPlayerOpened: false });
      audioPlayerRef.pause();
      audioPlayerRef.src = "";
      setVideoId(videoSource);
      openPopup();
    }

    function handleListenClick(e) {
      e.stopPropagation();
      audioPlayerRef.src = audioSource;
      audioPlayerRef.play();
      setIsPlayerOpened(true);
    }

    const trackImageMaskClasses = cn(s.trackImageMask, {
      [s.trackImageMaskSelected]: selectedTrack === index,
    });

    return (
      <div className={s.track}>
        <div className={s.trackImageContainer} onClick={handleTrackClick}>
          <img className={s.trackImage} src={imageSource} />
          <div className={trackImageMaskClasses}>
            {selectedTrack === index && (
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
        <AudioTitle playerState={playerState} name={name} />
      </div>
    );
  }
);

const AudioTrack = React.memo(AudioTrackUnmemoized);
export default AudioTrack;
