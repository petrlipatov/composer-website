import cn from "classnames";
import s from "./AudioTrack.module.css";
import tvIconSrc from "../../assets/images/tv.svg";
import hedphonesIconSrc from "../../assets/images/headphones.svg";

const AudioTrack = ({
  index,
  name,
  imageSource,
  youtubeId,
  setSelectedTrack,
  selectedTrack,
  openPopup,
  setVideoId,
}) => {
  const trackImageMaskClasses = cn(s.trackImageMask, {
    [s.trackImageMaskSelected]: selectedTrack === index,
  });

  function handleTrackClick() {
    setSelectedTrack(index);
  }

  function handleVideoClick() {
    setVideoId(youtubeId);
    openPopup();
  }

  return (
    <div className={s.track}>
      <div className={s.trackImageContainer} onClick={handleTrackClick}>
        <img className={s.trackImage} src={imageSource} />
        <div className={trackImageMaskClasses}>
          {selectedTrack === index && (
            <>
              <div className={s.imageMaskButtonLeft}>
                <img className={s.imageMaskIcon} src={hedphonesIconSrc} />
                <div>Listen</div>
              </div>
              <div
                className={s.imageMaskButtonRight}
                onClick={handleVideoClick}
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
};

export default AudioTrack;
