import videoIconSrc from "../../../../assets/images/tv.svg";

import s from "./VideoButton.module.css";

type Props = {
  handleVideoClick: () => void;
};

function VideoButton({ handleVideoClick }: Props) {
  return (
    <div className={s.container} onClick={handleVideoClick}>
      <img
        className={s.videoIcon}
        src={videoIconSrc}
        onClick={handleVideoClick}
      />
      <button className={s.button}>Watch video</button>
    </div>
  );
}

export default VideoButton;
