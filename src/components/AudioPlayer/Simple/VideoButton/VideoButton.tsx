import TvIcon from "../../../Icons/TvIcon/TvIcon";

import s from "./VideoButton.module.css";

type Props = {
  handleVideoClick: () => void;
};

function VideoButton({ handleVideoClick }: Props) {
  return (
    <div className={s.container} onClick={handleVideoClick}>
      <TvIcon className={s.videoIcon} />
      <button className={s.button}>Watch video</button>
    </div>
  );
}

export default VideoButton;
