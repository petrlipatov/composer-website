import Logo from "../../../components/Logo/Logo";
import { GENRES_WORK } from "../../../utils/constants";
import s from "./FeaturedWork.module.css";
// import React, { useRef, RefObject, useState, Suspense } from "react";

import compilationImage from "../../../../assets/images/imgPlayer.webp";

function FeaturedWorkMobile() {
  return (
    <div className={s.page}>
      <div className={s.content}>
        <Logo />
        <div className={s.genresSection}>
          <div className={s.genresList}>
            {GENRES_WORK.map((genre, i) => (
              <div className={s.genresButton} key={i}>
                {genre}
              </div>
            ))}
          </div>
          <div
            className={s.compilationVideoButton}
            style={{ backgroundImage: `url(${compilationImage})` }}
          />
        </div>
      </div>
    </div>
  );
}

export default FeaturedWorkMobile;
