import { createPortal } from "react-dom";
import styles from "./VideoPopup.module.css";
import closeIconSrc from "./../../assets/images/close-icon.svg";
import React, { LegacyRef, forwardRef, Suspense } from "react";
// import YouTubePlayer from "../Youtube-player/YoutubePlayer";

const YouTubePlayer = React.lazy(
  () => import("../Youtube-player/YoutubePlayer")
);

type VideoPopupProps = {
  tl: React.MutableRefObject<gsap.core.Timeline>;
  loadIframe: boolean;
};

const VideoPopup = forwardRef(
  (
    { tl, loadIframe = false }: VideoPopupProps,
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
        rel: 0,
        showinfo: 0,
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
          {loadIframe && (
            <Suspense
              fallback={
                <h1 className={styles.emoji}>
                  <p>🐥</p>
                </h1>
              }
            >
              <YouTubePlayer videoId="u0dBG0AL3Cs" options={videoOptions} />
            </Suspense>
            // <YouTube videoId="u0dBG0AL3Cs" opts={videoOptions} loading="lazy" />
          )}
        </div>
      </div>,
      rootContainer
    );
  }
);

export default VideoPopup;
