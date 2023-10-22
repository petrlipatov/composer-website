import React, { useEffect, useRef } from "react";
import styles from "./Portfolio.module.css";

function Portfolio() {
  const audioRef = useRef(null);

  useEffect(() => {
    if (
      audioRef.current &&
      "MediaSource" in window &&
      MediaSource.isTypeSupported("audio/mpeg")
    ) {
      const mediaSource = new MediaSource();
      audioRef.current.src = URL.createObjectURL(mediaSource);

      mediaSource.addEventListener("sourceopen", () => {
        const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
        const audioUrl =
          "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"; // Ваш URL аудиофайла

        fetch(audioUrl)
          .then((response) => response.arrayBuffer())
          .then((data) => {
            sourceBuffer.appendBuffer(data);
            audioRef.current.play();
          });
      });
    } else {
      console.error("MediaSource or MP3 not supported.");
    }
  }, []);

  return (
    <div className={styles.container}>
      <audio ref={audioRef} controls>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default Portfolio;
