import useIsMobile from "../../../../utils/hooks/useIsMobile";
import PlayIcon from "../../../Icons/PlayIcon/PlayIcon";
import PauseIcon from "../../../Icons/PauseIcon/PauseIcon";
import NextIcon from "../../../Icons/NextIcon/NextIcon";
import { PLAYER_CONTROLS } from "../../../../utils/constants";
import s from "./ControlButtons.module.css";

type Props = {
  handlePlayPauseClick: () => void;
  handlePlayNextClick: (arg: PLAYER_CONTROLS) => void;
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

  const handlePlayNextClickDesktop = (str: PLAYER_CONTROLS) => {
    if (isMobile) return;
    handlePlayNextClick(str);
  };

  return (
    <div className={s.container}>
      <button
        className={s.playNextButton}
        onClick={() => handlePlayNextClickDesktop(PLAYER_CONTROLS.prev)}
        onTouchEnd={() => handlePlayNextClick(PLAYER_CONTROLS.prev)}
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
        onClick={() => handlePlayNextClickDesktop(PLAYER_CONTROLS.next)}
        onTouchEnd={() => handlePlayNextClick(PLAYER_CONTROLS.next)}
        type="button"
      >
        <NextIcon className={s.icon} />
      </button>
    </div>
  );
}

export default ControlButtons;
