// import { useEffect } from "react";
import style from "./YoutubePlayer.module.css";

const YouTubePlayer = ({ videoId, options }) => {
  return (
    <iframe
      title="YouTube Player"
      width={options.width}
      height={options.height}
      src={`https://www.youtube.com/embed/${videoId}`}
      allowFullScreen
      loading="lazy"
      className={style.iframe}
      id="youtubePlayer"
    />
  );
};

export default YouTubePlayer;
