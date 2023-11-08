import styles from "./Portfolio.module.css";
import { Link } from "react-router-dom";
import nameSrc from "../../assets/images/name.svg";
import titleSrc from "../../assets/images/title.svg";
import logoSrc from "../../assets/images/logo_vertical.png";

import Toggler from "./Toggler/Toggler";
import { useState, useRef } from "react";
import AudioTrack from "../../components/Audio-track/AudioTrack";
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

type playerState = {
  elapsedTime: number;
  duration: number;
  isLoading: boolean;
};

function Portfolio() {
  const [playingAudioTrack, setPlayingAudioTrack] = useState(undefined);
  const [playerState, setPlayerState] = useState<playerState>({
    elapsedTime: 0,
    duration: 0,
    isLoading: false,
  });

  // const [category, setCategory] = useState<Genres>(undefined);
  // const [genre, setGenre] = useState<Genres>(undefined);
  const audioRef = useRef<HTMLAudioElement>();

  const onTimeUpdate = () => {
    setPlayerState({
      ...playerState,
      elapsedTime: audioRef.current.currentTime,
    });
  };

  const onLoadedMetadata = () => {
    setPlayerState({ ...playerState, duration: audioRef.current.duration });
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
            <button className={styles.genreButton}>CLASSICAL</button>
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
        onPlaying={() => setPlayerState({ ...playerState, isLoading: false })}
        onWaiting={() => setPlayerState({ ...playerState, isLoading: true })}
      >
        <source src="" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className={styles.trackListSection}>
        <AudioTrack
          index={0}
          name={"REVIVAL OF THE UNKNOWN"}
          link={mp3Src}
          playerState={playerState}
          setPlayerState={setPlayerState}
          isAudioTrackPlaying={0 === playingAudioTrack}
          setPlayingAudioTrack={setPlayingAudioTrack}
          ref={audioRef}
        />
        <AudioTrack
          index={1}
          name={"Test"}
          link={mp3Src2}
          playerState={playerState}
          setPlayerState={setPlayerState}
          isAudioTrackPlaying={1 === playingAudioTrack}
          setPlayingAudioTrack={setPlayingAudioTrack}
          ref={audioRef}
        />
      </div>
    </div>
  );
}

export default Portfolio;
