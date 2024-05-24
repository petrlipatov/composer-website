import s from "./AudioTitle.module.css";
import AnimatedEqualizer from "../../AnimatedEqualizer/AnimatedEqualizer";

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
            {isLoading || isPaused ? "" : <AnimatedEqualizer />}
          </>
        ) : (
          <>
            <div className={s.titlePlaying}>{name}</div>
            {isLoading || isPaused ? "" : <AnimatedEqualizer />}
          </>
        )
      ) : (
        <div className={s.title}>{name}</div>
      )}
    </div>
  );
};

export default AudioTitle;
