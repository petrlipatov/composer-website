import { useContext } from "react";

import { formatTime } from "../../../../../utils/helpers/formatTime";

// import ScrubberLoader from "../../../../../components/AudioPlayer/Shared/ProgressBar/ScrubberLoader/ScrubberLoader";
// import ScrubberBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/ScrubberBar/ScrubberBar";
// import DurationBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/DurationBar/DurationBar";
// import BufferedBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/BufferedBar/BufferedBar";
// import TimeValue from "../../../../../components/AudioPlayer/Shared/ProgressBar/TimeValue/TimeValue";
// import useElapsedTimeProgressUpdate from "../../../../../utils/hooks/useElapsedTimeProgressUpdate";
// import useBufferedProgressUpdate from "../../../../../utils/hooks/useBufferedProgressUpdate";

// import { PlayerContext } from "../../../Pieces";

import s from "./ProgressBar.module.css";
import { PLAYER_STATUS } from "../../../../../utils/constants";

const ProgressBar = ({
  // buffered,
  duration,
  elapsed,
  // isUserScrubbing,
  // onScrubberChange,
}) => {
  // const progressBarRef = useRef<HTMLInputElement>();
  // const bufferedBarRef = useRef<HTMLInputElement>();

  // const { player } = useContext(PlayerContext);

  // const progressBar = progressBarRef.current;
  // const bufferedBar = bufferedBarRef.current;

  return (
    <div className={s.progressBarContainer}>
      {/* <TimeValue> {formatTime(elapsed)}</TimeValue> */}

      <div className={s.progressBar}>
        {/* <ScrubberLoader isLoading={player.status === PLAYER_STATUS.LOADING} /> */}
        {/* <ScrubberBar
          elapsedTime={elapsed}
          duration={duration}
          onScrubberChange={onScrubberChange}
          ref={progressBarRef}
        /> */}
        {/* <DurationBar /> */}
        {/* <BufferedBar ref={bufferedBarRef} /> */}
      </div>

      {/* <TimeValue> {formatTime(duration)}</TimeValue> */}
    </div>
  );
};

export default ProgressBar;
