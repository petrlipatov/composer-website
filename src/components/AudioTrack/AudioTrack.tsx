import cn from "classnames";
import s from "./AudioTrack.module.css";
import tvIconSrc from "../../assets/images/tv.svg";
import hedphonesIconSrc from "../../assets/images/headphones.svg";
import { Dispatch, RefObject, SetStateAction, forwardRef } from "react";

type AudioTrackProps = {
  name: string;
  imageSource: string;
  audioSource: string;
  videoSource: string;
  selectedTrack: number;
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
    const trackImageMaskClasses = cn(s.trackImageMask, {
      [s.trackImageMaskSelected]: selectedTrack === index,
    });

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
      setIsPlayerOpened(true);
      setIsAudioPlaying(true);
      setPlayingAudioTitle(name);
    }

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
                  <img className={s.imageMaskIcon} src={hedphonesIconSrc} />
                  <div>Listen</div>
                </div>
                <div
                  className={s.imageMaskButtonRight}
                  onClick={handleWatchClick}
                >
                  <img className={s.imageMaskIcon} src={tvIconSrc} />
                  <div>Watch</div>
                </div>
              </>
            )}
          </div>
        </div>
        <div>{name}</div>
      </div>
    );
  }
);

export default AudioTrack;
