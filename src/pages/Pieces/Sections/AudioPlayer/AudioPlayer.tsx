import { forwardRef, useContext, useEffect, useState } from "react";
import { RefObject } from "react";
import { PiecesContext } from "../../Pieces";
import ProgressBar from "./ProgressBar/ProgressBar";
import playSrc from "../../../../assets/images/play.svg";
import pauseSrc from "../../../../assets/images/pause.svg";
import closeIcon from "../../../../assets/images/close-icon_black.svg";
import videoIcon from "../../../../assets/images/tv.svg";
import s from "./AudioPlayer.module.css";

const AudioPlayer = forwardRef((props, ref: RefObject<HTMLAudioElement>) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const {
    filteredPieces,
    currentAudioData,
    setIsPlayerOpened,
    setCurrentAudioData,
    setVideoID,
    setIsVideoPopupOpened,
  } = useContext(PiecesContext);

  const audioPlayerRef = ref.current;
  // const bufferedRef = useRef<HTMLSpanElement>();

  // useEffect(() => {
  //   if (audioPlayerRef && audioPlayerRef) {
  //     const audio = audioPlayerRef;

  //     if (audio.buffered && audio.buffered.length > 0) {
  //       // Получаем доступ к окончанию последнего буфера, если он существует
  //       const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
  //       // Получаем продолжительность аудиофайла
  //       const duration = audio.duration;
  //       // Вычисляем прогресс буферизации в процентах
  //       const bufferedProgress = (bufferedEnd / duration) * 100;
  //       // Выводим прогресс в консоль
  //       console.log("Buffered progress:", bufferedProgress);
  //     }
  //   }
  // }, [audioPlayerRef]);

  useEffect(
    function togglePlayingStatus() {
      const onPlayingHandler = () => setIsAudioPlaying(true);
      const onEndedHandler = () => setIsAudioPlaying(false);

      if (audioPlayerRef) {
        audioPlayerRef.addEventListener("playing", onPlayingHandler);
        audioPlayerRef.addEventListener("ended", onEndedHandler);
      }

      return () => {
        if (audioPlayerRef) {
          audioPlayerRef.removeEventListener("playing", onPlayingHandler);
          audioPlayerRef.removeEventListener("ended", onEndedHandler);
        }
      };
    },
    [audioPlayerRef]
  );

  const handlePlayPauseClick = () => {
    if (isAudioPlaying) {
      audioPlayerRef.pause();
    } else {
      audioPlayerRef.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  const handlePlayNextClick = (prevOrNext) => {
    let nextSongIndex = 0;

    prevOrNext === "next"
      ? (nextSongIndex = currentAudioData.index + 1)
      : (nextSongIndex = currentAudioData.index - 1);

    const nextTrack = filteredPieces[nextSongIndex];

    if (nextTrack) {
      audioPlayerRef.src = nextTrack.audioSrc;
      setCurrentAudioData({
        index: filteredPieces.indexOf(nextTrack),
        ...nextTrack,
      });
    }
    if (nextTrack && isAudioPlaying) audioPlayerRef.play();
  };

  const handleVideoClick = (e) => {
    e.stopPropagation();
    setIsPlayerOpened(false);
    setVideoID(currentAudioData.videoSrc);
    audioPlayerRef.pause();
    audioPlayerRef.src = "";
    setIsVideoPopupOpened(true);
  };

  const handleCloseClick = () => {
    audioPlayerRef.pause();
    audioPlayerRef.src = "";
    setIsAudioPlaying(false);
    setIsPlayerOpened(false);
  };

  return (
    <div className={s.playerSection}>
      <div className={s.title}>{currentAudioData?.name}</div>

      <div className={s.buttonsContainer}>
        <button
          type="button"
          className={s.playPreviousButton}
          onClick={() => handlePlayNextClick("prev")}
        />

        <button
          type="button"
          className={s.playButton}
          onClick={handlePlayPauseClick}
        >
          <img
            className={s.playIcon}
            src={pauseSrc}
            alt="pause-button"
            style={isAudioPlaying ? {} : { display: "none" }}
          />

          <img
            className={s.playIcon}
            src={playSrc}
            alt="play-button"
            style={isAudioPlaying ? { display: "none" } : {}}
          />
        </button>

        <button
          type="button"
          className={s.playNextButton}
          onClick={() => handlePlayNextClick("next")}
        />
      </div>

      <ProgressBar ref={ref} />

      {/* <div className={s.buffered}>
          <span ref={bufferedRef} className={s.bufferedAmount} />
        </div> */}

      <img className={s.videoIcon} src={videoIcon} onClick={handleVideoClick} />
      <img className={s.closeIcon} src={closeIcon} onClick={handleCloseClick} />
      <img className={s.artwork} src={currentAudioData?.imageSrc} />
    </div>
  );
});

export default AudioPlayer;
