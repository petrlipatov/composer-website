// import React, { useEffect, useRef } from "react";
// import cn from "classnames";

import styles from "./AudioElement.module.css";
import playSrc from "../../assets/images/play-button.svg";
import { useState } from "react";
import imgSrc from "../../assets/images/imgPlayer.png";
import AudioPlayer from "../Audio-player/AudioPlayer";

function AudioElement({ index, name, audio }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTrackClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.audioElementContainer}>
      <div className={styles.track} onClick={handleTrackClick}>
        <img
          className={styles.playButton}
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
          src={playSrc}
          alt="play-logo"
        />
        <p className={styles.title}>{`${index + 1}. ${name}`}</p>
      </div>

      <div
        className={styles.contentContainer}
        style={{ display: isOpen ? "flex" : "none" }}
      >
        <div className={styles.content}>
          <div className={styles.audioPlayerContainer}>
            <AudioPlayer srcLink={audio} />
          </div>
          <img className={styles.videoPlayer} src={imgSrc} />
        </div>
      </div>
    </div>
  );
}

export default AudioElement;
