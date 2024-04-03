import s from "./AudioTitle.module.css";
import cn from "classnames";
import AudioPlayingLoader from "../AudioPlayingLoader/AudioPlayingLoader";

const AudioTitle = ({ isAudioPlaying, playingAudioTitle, name }) => {
  //   const titleClasses = cn(, {
  //     [s.titlePlaying]: playingAudioTitle === name && isAudioPlaying,
  //   });

  const isLongName = (name) => {
    return name.length > 18;
  };
  return (
    <div className={s.titleContainer}>
      {isAudioPlaying && name == playingAudioTitle ? (
        isLongName(name) ? (
          <>
            <div className={s.bitTitleTextContainer}>
              <p className={s.title}>{name}</p>
            </div>
            <AudioPlayingLoader />
          </>
        ) : (
          <>
            <div className={s.titlePlaying}>{name}</div>
            <AudioPlayingLoader />
          </>
        )
      ) : (
        <div className={s.title}>{name}</div>
      )}
    </div>
  );
};

export default AudioTitle;
