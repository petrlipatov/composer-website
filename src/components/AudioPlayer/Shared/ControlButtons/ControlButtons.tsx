import cn from "classnames";

import playSrc from "../../../../assets/images/play.svg";
import pauseSrc from "../../../../assets/images/pause.svg";
import playNextSrc from "../../../../assets/images/play-next.svg";

import s from "./ControlButtons.module.css";

type Props = {
  handlePlayPauseClick: () => void;
  handlePlayNextClick: (arg: "next" | "prev") => void;
  isAudioPlaying: boolean;
};

function ControlButtons({
  handlePlayPauseClick,
  handlePlayNextClick,
  isAudioPlaying,
}: Props) {
  return (
    <div className={s.container}>
      <button
        type="button"
        className={s.playNextButton}
        onClick={() => handlePlayNextClick("prev")}
        // onTouchStart={() => handlePlayNextClick("prev")}
      >
        <img
          className={cn(s.icon, s.iconPlayPrevious)}
          src={playNextSrc}
          alt="play-next-button"
        />
      </button>

      <button
        type="button"
        className={s.playButton}
        onClick={handlePlayPauseClick}
        // onTouchStart={handlePlayPauseClick}
      >
        <img
          className={s.icon}
          src={pauseSrc}
          alt="pause-button"
          style={isAudioPlaying ? {} : { display: "none" }}
        />

        <img
          className={s.icon}
          src={playSrc}
          alt="play-button"
          style={isAudioPlaying ? { display: "none" } : {}}
        />
      </button>

      <button
        type="button"
        className={s.playNextButton}
        onClick={() => handlePlayNextClick("next")}
        // onTouchStart={() => handlePlayNextClick("next")}
      >
        <img className={s.icon} src={playNextSrc} alt="play-next-button" />
      </button>
    </div>
  );
}

export default ControlButtons;
