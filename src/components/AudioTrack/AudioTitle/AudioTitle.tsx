import s from "./AudioTitle.module.css";
import AudioPlayingLoader from "../AudioPlayingLoader/AudioPlayingLoader";

type AudioTitleProps = {
  name: string;
  isPlaying: boolean;
  isLoading: boolean;
  isPaused: boolean;
};

const AudioTitle = ({
  isPlaying,
  isLoading,
  isPaused,
  name,
}: AudioTitleProps) => {
  const isLongName = (name) => {
    return name.length > 18;
  };
  return (
    <div className={s.titleContainer}>
      {isPlaying ? (
        isLongName(name) ? (
          <>
            <div className={s.bigTitleTextContainer}>
              <p className={s.titlePlaying}>{name}</p>
            </div>
            {isLoading || isPaused ? "" : <AudioPlayingLoader />}
          </>
        ) : (
          <>
            <div className={s.titlePlaying}>{name}</div>
            {isLoading || isPaused ? "" : <AudioPlayingLoader />}
          </>
        )
      ) : (
        <div className={s.title}>{name}</div>
      )}
    </div>
  );
};

export default AudioTitle;
