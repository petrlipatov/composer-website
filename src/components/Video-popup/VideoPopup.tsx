import { createPortal } from "react-dom";
import styles from "./VideoPopup.module.css";
import closeIconSrc from "./../../assets/images/close-icon.svg";
import { LegacyRef, forwardRef } from "react";
import YouTube from "react-youtube";

type VideoPopupProps = {
  tl: React.MutableRefObject<gsap.core.Timeline>;
};

const VideoPopup = forwardRef(
  (
    { tl }: VideoPopupProps,

    ref: LegacyRef<HTMLDivElement>
  ) => {
    const rootContainer = document.getElementById("modal");

    const handlePopupTouch = (e: React.TouchEvent<HTMLDivElement>) => {
      e.stopPropagation();
      tl.current.reverse();
    };

    const videoOptions = {
      width: "100%",
      height: "260",
      playerVars: {
        // autoplay: 1,
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
        data-animate="popup"
        ref={ref}
      >
        <button
          className={styles.closeIcon}
          style={{ backgroundImage: `url(${closeIconSrc})` }}
          onClick={() => {
            tl.current.reverse();
          }}
        />
        <div className={styles.playerContainer}>
          <YouTube videoId="u0dBG0AL3Cs" opts={videoOptions} />
        </div>
      </div>,
      rootContainer
    );
  }
);

export default VideoPopup;
