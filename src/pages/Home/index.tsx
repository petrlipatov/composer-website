import styles from "./index.module.css";
import React, { useRef, RefObject, useEffect, useState, Suspense } from "react";
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
import Modal from "../../components/Modal/Modal";
import Preloader from "../../components/Preloader/Preloader";
import { Link } from "react-router-dom";

const YouTubePlayer = React.lazy(
  () => import("../../components/Youtube-player/YoutubePlayer")
);

export default function Home() {
  const [isPopupOpened, setPopupState] = useState(false);

  const pageRef: RefObject<HTMLDivElement> = useRef(null);
  const tlSections = useRef(gsap.timeline({ paused: true }));
  const tlArrows = useRef(gsap.timeline({ repeat: -1 }));
  gsap.registerPlugin(Observer);

  useLayoutEffect(function loopArrowsAnimation() {
    const ctx = gsap.context(() => {
      gsap.set("[data-animate='arrow-top']", {
        xPercent: -50,
        rotate: 90,
        left: "50%",
        top: "300px",
        opacity: 0,
      });

      gsap.set("[data-animate='arrow-bottom']", {
        xPercent: -50,
        rotate: 90,
        left: "50%",
        top: "320px",
        opacity: 0,
      });

      tlArrows.current.to(
        "[data-animate='arrow-top']",
        {
          opacity: 1,
          duration: 0.3,
        },
        2
      );

      tlArrows.current.to(
        "[data-animate='arrow-top']",
        {
          opacity: 0,
          ease: "none",
          duration: 0,
        },
        2.3
      );

      tlArrows.current.to(
        "[data-animate='arrow-bottom']",
        {
          opacity: 0.5,
          ease: "none",
          duration: 0,
        },
        2.3
      );

      tlArrows.current.to(
        "[data-animate='arrow-bottom']",
        {
          opacity: 0,
          duration: 0.5,
        },
        2.8
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(function setSectionsTransitionsAnimations() {
    const ctx = gsap.context(() => {
      gsap.set(["[data-animate='name']", "[data-animate='title']"], {
        xPercent: -50,
      });

      gsap.set("[data-animate='showreel']", {
        xPercent: -50,
        left: "50%",
        top: "220px",
        y: 350,
        opacity: 0,
        duration: 0.5,
      });

      gsap.set("[data-animate='links']", {
        position: "absolute",
        xPercent: -50,
        top: "75%",
        left: "50%",
        opacity: 0,
      });

      tlSections.current.to(
        "[data-animate='name']",
        {
          xPercent: 0,
          left: "5%",
          top: "30px",
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );
      tlSections.current.to(
        "[data-animate='title']",
        {
          xPercent: 0,
          left: "5%",
          top: "60px",
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );
      tlSections.current.to(
        "[data-animate='showreel']",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        0
      );
      tlSections.current.addPause();
      tlSections.current.to(
        "[data-animate='showreel']",
        {
          opacity: 0,
          y: -90,
          duration: 1,
          ease: "power3.inOut",
        },
        1
      );
      tlSections.current.to(
        "[data-animate='links']",
        {
          opacity: 1,
          top: "30%",
          duration: 1,
          ease: "power3.inOut",
        },
        1
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  useEffect(function setListenersForAnimations() {
    Observer.create({
      type: "touch, scroll",
      onChange: () => {
        tlArrows.current.revert();
      },
      onDown: () => {
        tlSections.current.reverse();
      },
      onUp: () => {
        tlSections.current.play();
      },
    });
  }, []);

  function openPopup() {
    setPopupState(true);
  }

  const videoOptions = {
    width: "100%",
    height: "260",
  };

  return (
    <div className={styles.page} ref={pageRef}>
      <div className={styles.section}></div>
      <div className={styles.section}></div>
      <div className={styles.section}></div>

      <img
        className={styles.name}
        src={nameSrc}
        alt="name"
        data-animate="name"
      />
      <img
        className={styles.title}
        src={titleSrc}
        alt="title"
        data-animate="title"
      />

      <div
        className={styles.playContainer}
        data-animate="showreel"
        onClick={openPopup}
      >
        <img
          className={styles.showreel}
          src={showreelSrc}
          alt="showreel-icon"
        />
        <img className={styles.play} src={playSrc} alt="play-icon" />
      </div>

      <Link to="/portfolio" className={styles.linksBlock} data-animate="links">
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
      </Link>

      <img
        src={arrowSrc}
        className={styles.arrowTop}
        alt="arrow-icon"
        data-animate="arrow-top"
      />

      <img
        src={arrowSrc}
        className={styles.arrowBottom}
        alt="arrow-icon"
        data-animate="arrow-bottom"
      />

      <img
        rel="preload"
        className={styles.image}
        src={imageSrc}
        alt="logo"
        decoding="sync"
      />
      {isPopupOpened && (
        <Modal setPopupState={setPopupState}>
          <Suspense fallback={<Preloader content={"🐥"} />}>
            <YouTubePlayer videoId="u0dBG0AL3Cs" options={videoOptions} />
          </Suspense>
        </Modal>
      )}
    </div>
  );
}
