import styles from "./Home.module.css";
import React, {
  useRef,
  RefObject,
  useEffect,
  useState,
  Suspense,
  useLayoutEffect,
} from "react";
import imageSrc from "../../assets/images/logo.png";
import nameSrc from "../../assets/images/name.svg";
import titleSrc from "../../assets/images/title.svg";
import arrowSrc from "../../assets/images/play-icon.svg";
import playSrc from "../../assets/images/play-icon.svg";
import showreelSrc from "../../assets/images/play-showreel.svg";
import piecesSrc from "../../assets/images/pieces-f20w6.svg";
import workSrc from "../../assets/images/work-f20w6.svg";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import Modal from "../../components/Modal/Modal";
import Preloader from "../../components/Preloader/Preloader";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const YouTubePlayer = React.lazy(
  () => import("../../components/Youtube-Player/YoutubePlayer")
);

export default function Home() {
  const [isPopupOpened, setPopupState] = useState(false);

  const pageRef: RefObject<HTMLDivElement> = useRef(null);
  const tlMenu = useRef(gsap.timeline({ paused: true }));
  const tlSections = useRef(gsap.timeline({ paused: true }));
  const tlArrows = useRef(gsap.timeline({ repeat: -1 }));

  gsap.registerPlugin(Observer);
  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(function menuAnimation() {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          "[data-animate='line1']",
          "[data-animate='line2']",
          "[data-animate='line3']",
        ],
        { width: 6, opacity: 0 }
      );

      gsap.set(["[data-animate='line1']"], { x: "50px" });
      gsap.set(["[data-animate='line3']"], { x: "-50px" });

      tlMenu.current.to(
        [
          "[data-animate='line1']",
          "[data-animate='line2']",
          "[data-animate='line3']",
        ],
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: 0.5,
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

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

  useLayoutEffect(function setSectionsAnimation() {
    const ctx = gsap.context(() => {
      gsap.set(["[data-animate='name']", "[data-animate='title']"], {
        xPercent: -50,
      });

      tlSections.current.to(
        "[data-animate='name']",
        {
          xPercent: 0,
          left: "5%",
          top: "30px",
          duration: 1,
          ease: "power2.inOut",
          onStart: () => {
            tlMenu.current.play();
          },
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
      type: "touch, scroll, click",
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

  return (
    <div className={styles.page} ref={pageRef}>
      <div className={styles.section} data-animate="section1"></div>
      <div className={styles.section} data-animate="section2"></div>
      <div className={styles.section} data-animate="section3"></div>

      <div className={styles.menu} data-animate="container">
        <div className={styles.line} data-animate="line1"></div>
        <div className={styles.line} data-animate="line2"></div>
        <div className={styles.line} data-animate="line3"></div>
      </div>

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

      <div className={styles.linksBlock} data-animate="links">
        <Link to="/portfolio">
          <img className={styles.pieces} src={piecesSrc} alt="pieces-link" />
        </Link>
        <div className={styles.divider} />

        <Link to="/portfolio">
          <img className={styles.work} src={workSrc} alt="work-link" />
        </Link>
      </div>

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
            <YouTubePlayer videoId="u0dBG0AL3Cs" />
          </Suspense>
        </Modal>
      )}
    </div>
  );
}
