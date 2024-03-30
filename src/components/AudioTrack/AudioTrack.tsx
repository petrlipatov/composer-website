import cn from "classnames";
import s from "./AudioTrack.module.css";
import tvIconSrc from "../../assets/images/tv.svg";
import hedphonesIconSrc from "../../assets/images/headphones.svg";

const AudioTrack = ({
  index,
  name,
  imageSource,
  setSelectedTrack,
  selectedTrack,
}) => {
  const trackImageMaskClasses = cn(s.trackImageMask, {
    [s.trackImageMaskSelected]: selectedTrack === index,
  });

  function handleClick() {
    setSelectedTrack(index);
  }

  return (
    <div className={s.track}>
      <div className={s.trackImageContainer} onClick={handleClick}>
        <img className={s.trackImage} src={imageSource} />
        <div className={trackImageMaskClasses}>
          {selectedTrack === index && (
            <>
              <div className={s.imageMaskButtonLeft}>
                <img className={s.imageMaskIcon} src={hedphonesIconSrc} />
                <div>Listen</div>
              </div>
              <div className={s.imageMaskButtonRight}>
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
