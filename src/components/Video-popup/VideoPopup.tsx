import { createPortal } from "react-dom";
import styles from "./VideoPopup.module.css";
import closeIconSrc from "./../../assets/images/close-icon.svg";
import { Dispatch, SetStateAction } from "react";
import YouTube from "react-youtube";

type VideoPopupProps = {
  closeFunc: Dispatch<SetStateAction<boolean>>;
};

function VideoPopup({ closeFunc }: VideoPopupProps) {
  const rootContainer = document.getElementById("modal");

  const handlePopupTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    closeFunc(false);
  };

  const videoOptions = {
    width: "100%",
    height: "260",
    playerVars: {
      autoplay: 1,
      rel: 0,
      showinfo: 1,
    },
  };

  return createPortal(
    <div
      className={styles.container}
      onTouchStart={handlePopupTouch}
      onTouchMove={handlePopupTouch}
      onTouchEnd={handlePopupTouch}
    >
      <button
        className={styles.closeIcon}
        style={{ backgroundImage: `url(${closeIconSrc})` }}
        onClick={() => {
          closeFunc(false);
        }}
      />
      <div className={styles.playerContainer}>
        <YouTube videoId="u0dBG0AL3Cs" opts={videoOptions} />
      </div>
    </div>,
    rootContainer
  );
}

export default VideoPopup;
