import { useContext, useEffect, useState } from "react";
import { PiecesContext } from "../../Pieces";
import ProgressBar from "./ProgressBar/ProgressBar";

import s from "./AudioPlayer.module.css";
import ControlButtons from "../../../../components/AudioPlayer/Shared/ControlButtons/ControlButtons";
import Title from "../../../../components/AudioPlayer/Simple/Title/Title";
import Artwork from "../../../../components/AudioPlayer/Simple/Artwork/Artwork";
import VideoButton from "../../../../components/AudioPlayer/Simple/VideoButton/VideoButton";
import CloseButton from "../../../../components/AudioPlayer/Simple/CloseButton/CloseButton";

const AudioPlayer = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [promise, setPromise] = useState("promise");

  const {
    filteredPieces,
    currentAudioData,
    audioPlayerRef,
    setIsPlayerOpened,
    setCurrentAudioData,
    setVideoID,
    setIsVideoPopupOpened,
  } = useContext(PiecesContext);

  const audioPlayer = audioPlayerRef.current;
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

      if (audioPlayer) {
        audioPlayer.addEventListener("playing", onPlayingHandler);
        audioPlayer.addEventListener("ended", onEndedHandler);
      }

      return () => {
        if (audioPlayerRef) {
          audioPlayer.removeEventListener("playing", onPlayingHandler);
          audioPlayer.removeEventListener("ended", onEndedHandler);
        }
      };
    },
    [audioPlayer, audioPlayerRef]
  );

  const handlePlayPauseClick = () => {
    if (isAudioPlaying) {
      audioPlayer.pause();
    } else {
      setPromise("pending");
      audioPlayer
        .play()
        .then(() => {
          setPromise("success");
        })
        .catch(() => {
          setPromise("error");
        });
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
      audioPlayer.src = nextTrack.audioSrc;
      setCurrentAudioData({
        index: filteredPieces.indexOf(nextTrack),
        ...nextTrack,
      });
    }
    if (nextTrack && isAudioPlaying) {
      setPromise("pending");
      audioPlayer
        .play()
        .then(() => {
          setPromise("success");
        })
        .catch(() => {
          setPromise("error");
        });
    }
  };

  const handleVideoClick = () => {
    setIsPlayerOpened(false);
    setVideoID(currentAudioData.videoSrc);
    audioPlayer.pause();
    audioPlayer.src = "";
    setIsVideoPopupOpened(true);
  };

  const handleCloseClick = () => {
    audioPlayer.pause();
    audioPlayer.src = "";
    setIsAudioPlaying(false);
    setIsPlayerOpened(false);
  };

  return (
    <div className={s.player}>
      <div className={s.content}>
        <Artwork src={currentAudioData?.imageSrc} />

        {/* <div className={s.promise}>{promise}</div> */}

        <div className={s.playerControls}>
          <Title>{currentAudioData?.name}</Title>
          <ControlButtons
            handlePlayPauseClick={handlePlayPauseClick}
            handlePlayNextClick={handlePlayNextClick}
            isAudioPlaying={isAudioPlaying}
          />
          <ProgressBar />
        </div>
        <VideoButton handleVideoClick={handleVideoClick} />
        <CloseButton handleCloseClick={handleCloseClick} />
      </div>
    </div>
  );
};

export default AudioPlayer;
