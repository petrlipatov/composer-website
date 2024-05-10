import React, { useRef, RefObject, useState, Suspense } from "react";
import { Link } from "react-router-dom";

import Modal from "../../components/Modal/Modal";
import Preloader from "../../components/Preloader/Preloader";
import Logo from "../../components/Logo/Logo";

import flower1_src from "../../assets/images/flower1.webp";
import flower2_src from "../../assets/images/flower2.webp";
import flower3_src from "../../assets/images/flower3.webp";

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
          style={{ backgroundImage: `url(${flower1_src})` }}
        />
        <div
          className={s.image}
          style={{ backgroundImage: `url(${flower2_src})` }}
        />
        <div
          className={s.image}
          style={{ backgroundImage: `url(${flower3_src})` }}
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
