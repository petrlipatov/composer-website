import Logo from "../../../components/Logo/Logo";
import s from "./InfoMobile.module.css";
// import React, { useRef, RefObject, useState, Suspense } from "react";
import portraitImage from "../../../../assets/images/portrait.jpg";

function InfoMobile() {
  return (
    <div className={s.page}>
      <div className={s.content}>
        <Logo />

        <img className={s.portrait} src={portraitImage} />
        <div>
          STUDIED MUSIC TECHNOLOGY AT LONDON COLLEGE OF MUSIC WORKED AND
          COLLECTED EXPERIENCE AT MUSIC STUDIOS IN LONDON, BERLIN, NEW YORK AND
          MOSCOW STUDIED FORTEPIANO AND DRUMS COMPOSING AND PERFORMING SINCE
          1996 2006-2013 - LEADER OF AN INDIE BAND STUDIO RECORDING AND MIXING
          SINCE 2006 COMPOSING FOR VIDEO SINCE 2012
        </div>
      </div>
    </div>
  );
}

export default InfoMobile;
