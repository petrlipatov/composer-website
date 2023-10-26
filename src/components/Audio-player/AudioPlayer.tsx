// import React, { useEffect, useRef } from "react";
// import styles from "./Portfolio.module.css";
// import mp3 from "../../assets/Theory-of-Light-Master.mp3";

function Portfolio2() {
  //   const audioRef = useRef(null);

  //   useEffect(() => {
  //     if (audioRef.current && "MediaSource" in window) {
  //       const mediaSource = new MediaSource();
  //       audioRef.current.src = URL.createObjectURL(mediaSource);

  //       mediaSource.addEventListener("sourceopen", () => {
  //         const sourceBuffer = mediaSource.addSourceBuffer(
  //           'video/mp4; codecs="mp4a.40.2"'
  //         );
  //         const audioUrl = mp3; // URL вашего аудиофайла в формате MP4 с AAC аудио

  //         fetch(audioUrl)
  //           .then((response) => response.arrayBuffer())
  //           .then((data) => {
  //             sourceBuffer.appendBuffer(data);
  //             audioRef.current.play();
  //           });
  //       });
  //     } else {
  //       console.error("MediaSource not supported.");
  //     }
  //   }, []);

  //   return (
  //     <div className={styles.container}>
  //       <audio ref={audioRef} controls>
  //         Your browser does not support the audio element.
  //       </audio>
  //     </div>
  //   );
  return <div>Your browser does not support the audio element.</div>;
}

export default Portfolio2;
