import React, { useRef, RefObject, useState, Suspense } from "react";
import { Link } from "react-router-dom";

import Modal from "../../components/Modal/Modal";
import Preloader from "../../components/Preloader/Preloader";
import Logo from "../../components/Logo/Logo";

import s from "./Home.module.css";

const YouTubePlayer = React.lazy(
  () => import("../../components/YoutubePlayer/YoutubePlayer")
);

function Home() {
  const [isPopupOpened, setPopupState] = useState(false);

  const pageRef: RefObject<HTMLDivElement> = useRef(null);

  function openPopup() {
    setPopupState(true);
  }

  return (
    <div className={s.page} ref={pageRef}>
      <div className={s.content} ref={pageRef}>
        <Logo />
        <div className={s.nav}>
          <div className={s.button} onClick={openPopup}>
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
        <div
          className={s.image}
          style={{ backgroundImage: `url(/images/home/flower1_414x753.webp)` }}
        />
        <div
          className={s.image}
          style={{ backgroundImage: `url(/images/home/flower2_414x753.webp)` }}
        />
        <div
          className={s.image}
          style={{ backgroundImage: `url(/images/home/flower3_414x753.webp)` }}
        />
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
