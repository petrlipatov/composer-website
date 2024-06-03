import style from "./YoutubePlayer.module.css";

const YouTubePlayer = ({ videoId }) => {
  return (
    <iframe
      title="YouTube Player"
      width="100%"
      height="220"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&fs=1`}
      allowFullScreen
      loading="lazy"
      className={style.iframe}
    />
  );
};

export default YouTubePlayer;
