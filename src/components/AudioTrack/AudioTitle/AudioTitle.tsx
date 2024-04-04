import s from "./AudioTitle.module.css";
import AudioPlayingLoader from "../AudioPlayingLoader/AudioPlayingLoader";
import { PlayerState } from "../../../pages/Pieces/Mobile/PiecesMobile";

type AudioTitleProps = {
  name: string;
  playerState: PlayerState;
};

const AudioTitle = ({ playerState, name }: AudioTitleProps) => {
  //   const titleClasses = cn(, {
  //     [s.titlePlaying]: playingAudioTitle === name && isAudioPlaying,
  //   });

  const isLongName = (name) => {
    return name.length > 18;
  };
  return (
    <div className={s.titleContainer}>
      {playerState.isAudioPlaying && playerState.playingAudioTitle === name ? (
        isLongName(name) ? (
          <>
            <div className={s.bitTitleTextContainer}>
              <p className={s.titlePlaying}>{name}</p>
            </div>
            {playerState.isLoading ? "" : <AudioPlayingLoader />}
          </>
        ) : (
          <>
            <div className={s.titlePlaying}>{name}</div>
            {playerState.isLoading ? "" : <AudioPlayingLoader />}
          </>
        )
      ) : (
        <div className={s.title}>{name}</div>
      )}
    </div>
  );
};

export default AudioTitle;
