import styles from "./Portfolio.module.css";
import { Link } from "react-router-dom";
import nameSrc from "../../assets/images/name.svg";
import titleSrc from "../../assets/images/title.svg";
import logoSrc from "../../assets/images/logo_vertical.png";

import Toggler from "./Toggler/Toggler";
// import { useState } from "react";
import AudioElement from "../../components/Audio-element/AudioElement";
import mp3Src from "../../assets/Theory-of-Light-Master.mp3";

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
  // const [category, setCategory] = useState<Genres>(undefined);
  // const [genre, setGenre] = useState<Genres>(undefined);

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
      <div className={styles.trackListSection}>
        <AudioElement
          index={0}
          name={"REVIVAL OF THE UNKNOWN"}
          audio={mp3Src}
        />
        <AudioElement
          index={1}
          name={"REVIVAL OF THE UNKNOWN"}
          audio={mp3Src}
        />
        <AudioElement
          index={2}
          name={"REVIVAL OF THE UNKNOWN"}
          audio={mp3Src}
        />
      </div>
    </div>
  );
}

export default Portfolio;
