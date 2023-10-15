import styles from "./index.module.css";
import { useRef, RefObject, useState } from "react";
import imageSrc from "../../assets/images/logo.png";
import nameSrc from "../../assets/images/name.svg";
import arrowSrc from "../../assets/images/play-icon.svg";
import titleSrc from "../../assets/images/title.svg";
import playSrc from "../../assets/images/play-icon.svg";
import showreelSrc from "../../assets/images/play-showreel.svg";
import piecesSrc from "../../assets/images/pieces-f20w6.svg";
import featuredSrc from "../../assets/images/featured-f20w6.svg";
import workSrc from "../../assets/images/work-f20w6.svg";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useLayoutEffect } from "react";
import VideoPopup from "../../components/Video-popup/VideoPopup";

export default function Home() {
  const [isPopupOpen, setPopupState] = useState(false);

  const tlMain = gsap.timeline();
  const tlArrows = gsap.timeline({ repeat: -1 });
  gsap.registerPlugin(Observer);

  const nameRef: RefObject<HTMLImageElement> = useRef(null),
    titleRef: RefObject<HTMLImageElement> = useRef(null),
    logoRef: RefObject<HTMLImageElement> = useRef(null),
    showreelContainerRef: RefObject<HTMLDivElement> = useRef(null),
    arrowBottomRef: RefObject<HTMLImageElement> = useRef(null),
    arrowTopRef: RefObject<HTMLImageElement> = useRef(null),
    linksRef: RefObject<HTMLDivElement> = useRef(null);

  useLayoutEffect(function startArrowsAnimation() {
    gsap.set(arrowTopRef.current, {
      xPercent: -50,
      rotate: 90,
      left: "50%",
      top: "300px",
      opacity: 0,
    });

    gsap.set(arrowBottomRef.current, {
      xPercent: -50,
      rotate: 90,
      left: "50%",
      top: "320px",
      opacity: 0,
    });

    tlArrows.to(
      arrowTopRef.current,
      {
        opacity: 1,
        duration: 0.3,
      },
      2
    );

    tlArrows.to(
      arrowTopRef.current,
      {
        opacity: 0,
        ease: "none",
        duration: 0,
      },
      2.3
    );

    tlArrows.to(
      arrowBottomRef.current,
      {
        opacity: 0.5,
        ease: "none",
        duration: 0,
      },
      2.3
    );

    tlArrows.to(
      arrowBottomRef.current,
      {
        opacity: 0,
        duration: 0.5,
      },
      2.8
    );
  }, []);

  useLayoutEffect(function startMainAnimation() {
    gsap.set([nameRef.current, titleRef.current], { xPercent: -50 });
    gsap.set(linksRef.current, {
      position: "absolute",
      xPercent: -50,
      top: "75%",
      left: "50%",
      opacity: 0,
    });
    gsap.set(showreelContainerRef.current, {
      xPercent: -50,
      y: 350,
      opacity: 0,
      duration: 0.5,
    });

    tlMain.paused(true);
    tlMain.to(
      nameRef.current,
      {
        xPercent: 0,
        left: "5%",
        top: "30px",
        duration: 1,
        ease: "power2.inOut",
      },
      0
    );
    tlMain.to(
      titleRef.current,
      {
        xPercent: 0,
        left: "5%",
        top: "60px",
        duration: 1,
        ease: "power2.inOut",
      },
      0
    );
    tlMain.to(
      showreelContainerRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.inOut",
      },
      0
    );
    tlMain.addPause();
    tlMain.to(
      showreelContainerRef.current,
      {
        opacity: 0,
        y: -90,
        duration: 1,
        ease: "power3.inOut",
      },
      1
    );
    tlMain.to(
      linksRef.current,
      {
        opacity: 1,
        top: "30%",
        duration: 1,
        ease: "power3.inOut",
      },
      1
    );

    Observer.create({
      type: "touch, scroll",
      onChange: () => {
        tlArrows.revert();
      },
      onDown: () => {
        tlMain.reverse();
      },
      onUp: () => {
        tlMain.play();
      },
    });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.section}></div>
      <div className={styles.section}></div>
      <div className={styles.section}></div>

      <img className={styles.name} src={nameSrc} alt="name" ref={nameRef} />
      <img className={styles.title} src={titleSrc} alt="title" ref={titleRef} />

      <div
        className={styles.playContainer}
        onClick={() => {
          setPopupState(true);
        }}
        ref={showreelContainerRef}
      >
        <img
          className={styles.showreel}
          src={showreelSrc}
          alt="showreel-icon"
        />
        <img className={styles.play} src={playSrc} alt="play-icon" />
      </div>

      <div className={styles.linksBlock} ref={linksRef}>
        <img className={styles.pieces} src={piecesSrc} alt="pieces-link" />

        <div className={styles.divider} />

        <div className={styles.featuredWorkContainer}>
          <img
            className={styles.featured}
            src={featuredSrc}
            alt="featured-link"
          />

          <img className={styles.work} src={workSrc} alt="work-link" />
        </div>
      </div>

      <img
        src={arrowSrc}
        className={styles.arrowTop}
        ref={arrowTopRef}
        alt="arrow-icon"
      />

      <img
        src={arrowSrc}
        className={styles.arrowBottom}
        ref={arrowBottomRef}
        alt="arrow-icon"
        decoding="async"
      />

      <img className={styles.image} src={imageSrc} alt="logo" ref={logoRef} />

      {isPopupOpen && <VideoPopup closeFunc={setPopupState} />}
    </div>
  );
}
