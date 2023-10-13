import { createPortal } from "react-dom";
import styles from "./VideoPopup.module.css";
import closeIconSrc from "./../../assets/images/close-icon.svg";
import { Dispatch, SetStateAction } from "react";

type VideoPopupProps = {
  closeFunc: Dispatch<SetStateAction<boolean>>;
};

function VideoPopup({ closeFunc }: VideoPopupProps) {
  const rootContainer = document.getElementById("modal");

  const handlePopupTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    closeFunc(false);
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
      <iframe
        id="player"
        title="All In One Composer Showreel - Liza Tikhonova / Film Music, Experimental, Electronic, Neoclassical"
        height={280}
        src="https://www.youtube.com/embed/u0dBG0AL3Cs?enablejsapi=1&origin=https://example.com"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen={true}
        style={{ border: "none" }}
      ></iframe>
    </div>,
    rootContainer
  );
}

export default VideoPopup;
