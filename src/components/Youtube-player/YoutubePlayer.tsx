import style from "./YoutubePlayer.module.css";

const YouTubePlayer = ({ videoId }) => {
  return (
    <iframe
      title="YouTube Player"
      width="100%"
      height="260"
      src={`https://www.youtube.com/embed/${videoId}`}
      allowFullScreen
      loading="lazy"
      className={style.iframe}
    />
  );
};

export default YouTubePlayer;
