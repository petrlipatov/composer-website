import { useState } from "react";

import Logo from "../../components/Logo/Logo";
import VideoPopup from "../../components/VideoPopup/VideoPopup";

import Menu from "./Sections/Menu/Menu";
import BackgroundImages from "./Sections/BackgroundImages/BackgroundImages";

import { SHOWREEL_YT_ID } from "./_constants";

import s from "./Home.module.css";

function Home() {
  const [isPopupOpened, setPopupState] = useState(false);

  function openPopup() {
    setPopupState(true);
  }

  return (
    <div className={s.page}>
      <div className={s.content}>
        <Logo />
        <Menu openPopup={openPopup} />
        <BackgroundImages />

        {isPopupOpened && (
          <VideoPopup
            videoID={SHOWREEL_YT_ID}
            setIsVideoPopupOpened={setPopupState}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
