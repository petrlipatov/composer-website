import cn from "classnames";
import s from "./AudioTrack.module.css";
import tvIconSrc from "../../assets/images/tv.svg";
import hedphonesIconSrc from "../../assets/images/headphones.svg";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  forwardRef,
  useEffect,
} from "react";
import AudioTitle from "./AudioTitle/AudioTitle";

type AudioTrackProps = {
  name: string;
  imageSource: string;
  audioSource: string;
  videoSource: string;
  selectedTrack: number;
  playingAudioTitle: string;
  isAudioPlaying: boolean;
  index: number;
  openPopup: () => void;
  setSelectedTrack: Dispatch<SetStateAction<number>>;
  setVideoId: Dispatch<SetStateAction<string>>;
  setIsPlayerOpened: Dispatch<SetStateAction<boolean>>;
  setIsAudioPlaying: Dispatch<SetStateAction<boolean>>;
  setPlayingAudioTitle: Dispatch<SetStateAction<string>>;
};

const AudioTrack = forwardRef(
  (
    {
      index,
      name,
      imageSource,
      audioSource,
      videoSource,
      selectedTrack,
      isAudioPlaying,
      playingAudioTitle,
      setSelectedTrack,
      setVideoId,
      setIsPlayerOpened,
      setIsAudioPlaying,
      setPlayingAudioTitle,
      openPopup,
    }: AudioTrackProps,
    ref: RefObject<HTMLAudioElement>
  ) => {
    const audioPlayerRef = ref.current;

    // useEffect(() => {
    //   if (selectedTrack === index) {
    //     const timer = setTimeout(() => {
    //       setSelectedTrack(null);
    //     }, 5000);

    //     return () => clearTimeout(timer);
    //   }
    // }, [selectedTrack]);

    function handleTrackClick() {
      setSelectedTrack(index);
    }

    function handleWatchClick(e) {
      e.stopPropagation();
      setIsPlayerOpened(false);
      audioPlayerRef.pause();
      audioPlayerRef.src = "";
      setVideoId(videoSource);
      openPopup();
    }

    function handleListenClick(e) {
      e.stopPropagation();
      audioPlayerRef.src = audioSource;
      audioPlayerRef.play();
      setPlayingAudioTitle(name);
      setIsPlayerOpened(true);
      setIsAudioPlaying(true);
    }

    const trackImageMaskClasses = cn(s.trackImageMask, {
      [s.trackImageMaskSelected]: selectedTrack === index,
    });

    // console.log(audioPlayerRef.currentSrc);

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
                  <div className={s.imageMaskCaption}>Listen</div>
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
          isAudioPlaying={isAudioPlaying}
          playingAudioTitle={playingAudioTitle}
          name={name}
        />
      </div>
    );
  }
);

export default AudioTrack;
