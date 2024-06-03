import s from "./ControlButtons.module.css";
import useIsMobile from "../../../../utils/hooks/useIsMobile";
import PlayIcon from "../../../Icons/PlayIcon/PlayIcon";
import PauseIcon from "../../../Icons/PauseIcon/PauseIcon";
import NextIcon from "../../../Icons/NextIcon/NextIcon";

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
  const isMobile = useIsMobile();

  const handlePlayPauseClickDesktop = () => {
    if (isMobile) return;
    handlePlayPauseClick();
  };

  const handlePlayNextClickDesktop = (str: "next" | "prev") => {
    if (isMobile) return;
    handlePlayNextClick(str);
  };

  return (
    <div className={s.container}>
      <button
        className={s.playNextButton}
        onClick={() => handlePlayNextClickDesktop("prev")}
        onTouchEnd={() => handlePlayNextClick("prev")}
        type="button"
      >
        <NextIcon className={s.icon} isRotated={true} />
      </button>

      <button
        className={s.playButton}
        onClick={handlePlayPauseClickDesktop}
        onTouchEnd={handlePlayPauseClick}
        type="button"
      >
        <PauseIcon isAudioPlaying={isAudioPlaying} customStyles={s.icon} />
        <PlayIcon isAudioPlaying={isAudioPlaying} customStyles={s.icon} />
      </button>

      <button
        className={s.playNextButton}
        onClick={() => handlePlayNextClickDesktop("next")}
        onTouchEnd={() => handlePlayNextClick("next")}
        type="button"
      >
        <NextIcon className={s.icon} />
      </button>
    </div>
  );
}

export default ControlButtons;
