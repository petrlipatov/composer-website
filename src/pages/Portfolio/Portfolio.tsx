import styles from "./Portfolio.module.css";
import { Link } from "react-router-dom";
import nameSrc from "../../assets/images/name.svg";
import titleSrc from "../../assets/images/title.svg";
import logoSrc from "../../assets/images/logo_vertical.png";

import Toggler from "./Toggler/Toggler";
import { useState, useRef } from "react";
import AudioElement from "../../components/Audio-element/AudioElement";
import mp3Src from "../../assets/Theory-of-Light-Master.mp3";
import mp3Src2 from "../../assets/Free_Test_Data_2MB_MP3.mp3";

// type Genres =
//   | "classical"
//   | "contemporary"
//   | "vintage"
//   | "electronic"
//   | "dark"
//   | "folk"
//   | "chamber"
//   | "borroque";

function Portfolio() {
  const [activeAudio, setActiveAudio] = useState(undefined);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const [category, setCategory] = useState<Genres>(undefined);
  // const [genre, setGenre] = useState<Genres>(undefined);
  const audioRef = useRef<HTMLAudioElement>();

  const onTimeUpdate = () => {
    setElapsedTime(audioRef.current.currentTime);
  };

  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <Link to="/" className={styles.nameContainer}>
          <img className={styles.name} src={nameSrc} alt="name" />
          <img className={styles.title} src={titleSrc} alt="title" />
        </Link>
      </div>
      <div className={styles.togglerSection}>
        <Toggler />
      </div>

      <div className={styles.genresSection}>
        <div className={styles.genresContainer}>
          <div className={styles.genresList}>
            <button
              className={styles.genreButton}
              onClick={() => {
                console.log(audioRef.current.currentSrc);
              }}
            >
              CLASSICAL
            </button>
            <button className={styles.genreButton}>CONTEMPORARY</button>
            <button className={styles.genreButton}>VINTAGE</button>
            <button className={styles.genreButton}>ELECTRONIC</button>
            <button className={styles.genreButton}>DARK</button>
            <button className={styles.genreButton}>FOLK</button>
            <button className={styles.genreButton}>CHAMBER</button>
            <button className={styles.genreButton}>BORROQUE</button>
          </div>
          <img className={styles.logo} src={logoSrc} alt="logo" />
        </div>
      </div>
      <audio
        preload="none"
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onCanPlay={() => {
          setIsLoading(false);
        }}
        onWaiting={() => {
          setIsLoading(true);
        }}
      >
        <source src="" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className={styles.trackListSection}>
        <AudioElement
          index={0}
          name={"REVIVAL OF THE UNKNOWN"}
          link={mp3Src}
          duration={duration}
          elapsedTime={elapsedTime}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isActive={0 === activeAudio}
          setActiveAudio={setActiveAudio}
          ref={audioRef}
        />
        <AudioElement
          index={1}
          name={"REVIVAL OF THE UNKNOWN"}
          link={mp3Src2}
          duration={duration}
          elapsedTime={elapsedTime}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isActive={1 === activeAudio}
          setActiveAudio={setActiveAudio}
          ref={audioRef}
        />
      </div>
    </div>
  );
}

export default Portfolio;
