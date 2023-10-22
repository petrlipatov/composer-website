import styles from "./Portfolio.module.css";

function Portfolio() {
  return (
    <div className={styles.container}>
      <audio controls>
        <source
          src="https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default Portfolio;
