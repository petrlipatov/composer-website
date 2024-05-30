import React, { useRef, useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";

import Modal from "../../components/Modal/Modal";
import Preloader from "../../components/Preloader/Preloader";
import Logo from "../../components/Logo/Logo";

import s from "./Home.module.css";

const YouTubePlayer = React.lazy(
  () => import("../../components/VideoPopup/YoutubePlayer/YoutubePlayer")
);

const imageSources = [
  "/images/home/flower1_414x753.webp",
  "/images/home/flower2_414x753.webp",
  "/images/home/flower3_414x753.webp",
];

function Home() {
  const [isPopupOpened, setPopupState] = useState(false);
  const [loadedImages, setLoadedImages] = useState([false, false, false]);
  const pageRef = useRef(null);

  useEffect(() => {
    imageSources.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages((prevLoadedImages) => {
          const newLoadedImages = [...prevLoadedImages];
          newLoadedImages[index] = true;
          return newLoadedImages;
        });
      };
    });
  }, []);

  function openPopup() {
    setPopupState(true);
  }

  return (
    <div className={s.page} ref={pageRef}>
      <div className={s.content}>
        <Logo />
        <div className={s.nav}>
          <div className={s.link} onClick={openPopup}>
            Showreel
          </div>
          <Link to="work" className={s.link}>
            Featured Work
          </Link>
          <Link to="pieces" className={s.link}>
            Pieces
          </Link>
          <Link to="info" className={s.link}>
            Info
          </Link>
        </div>
        {imageSources.map((src, index) => (
          <div
            key={index}
            className={`${s.image} ${loadedImages[index] ? s.fadeIn : ""}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        {isPopupOpened && (
          <Modal setPopupState={setPopupState}>
            <Suspense fallback={<Preloader content={"🐥"} />}>
              <YouTubePlayer videoId="u0dBG0AL3Cs" />
            </Suspense>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Home;
