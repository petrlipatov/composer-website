import { createPortal } from "react-dom";
import styles from "./VideoPopup.module.css";
import closeIconSrc from "./../../assets/images/close-icon.svg";
import React, {
  Suspense,
  useLayoutEffect,
  useRef,
  RefObject,
  Dispatch,
  SetStateAction,
} from "react";
import { gsap } from "gsap";
import Preloader from "../Preloader/Preloader";

const YouTubePlayer = React.lazy(
  () => import("../Youtube-player/YoutubePlayer")
);

type VideoPopupProps = {
  setPopupState: Dispatch<SetStateAction<boolean>>;
};

function VideoPopup({ setPopupState }: VideoPopupProps) {
  const rootContainer = document.getElementById("modal");
  const tlPopup = useRef(gsap.timeline());
  const popupRef: RefObject<HTMLDivElement> = useRef(null);

  useLayoutEffect(function popupAnimation() {
    // const ctx = gsap.context(() => {
    gsap.set(popupRef.current, {
      autoAlpha: 0,
    });

    tlPopup.current.to(popupRef.current, {
      display: "flex",
      autoAlpha: 1,
    });
    // }, pageRef);
    // return () => ctx.revert();
  }, []);

  const handlePopupTouch = async (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    await tlPopup.current.reverse();
    setPopupState(false);
  };

  const videoOptions = {
    width: "100%",
    height: "260",
  };

  return createPortal(
    <div
      className={styles.container}
      onTouchStart={handlePopupTouch}
      onTouchMove={handlePopupTouch}
      onTouchEnd={handlePopupTouch}
      data-animate="popup"
      ref={popupRef}
    >
      <button
        className={styles.closeIcon}
        style={{ backgroundImage: `url(${closeIconSrc})` }}
        onClick={() => {
          tlPopup.current.reverse();
        }}
      />
      <div className={styles.playerContainer}>
        <Suspense fallback={<Preloader content={"🐥"} />}>
          <YouTubePlayer videoId="u0dBG0AL3Cs" options={videoOptions} />
        </Suspense>
      </div>
    </div>,
    rootContainer
  );
}

export default VideoPopup;
