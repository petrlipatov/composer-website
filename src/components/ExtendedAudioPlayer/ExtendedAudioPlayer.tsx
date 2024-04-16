import cn from "classnames";
import { forwardRef, useEffect, useState } from "react";
import { Dispatch, RefObject, SetStateAction } from "react";
// import { AudioTrackData } from "../../types";
// import { PlayingAudioData } from "../../pages/Pieces/Mobile/PiecesMobile";
import ProgressBar from "./ProgressBar/ProgressBar";
import playSrc from "../../assets/images/play.svg";
import pauseSrc from "../../assets/images/pause.svg";
import closeIcon from "../../assets/images/close-icon_black.svg";
import videoIcon from "../../assets/images/tv.svg";
import s from "./ExtendedAudioPlayer.module.css";

import { ProjectData } from "../../types";

type AudioPlayerProps = {
  //   filteredPieces: AudioTrackData[];
  isPlayerOpened: boolean;
  playingProjectData: ProjectData;
  setIsPlayerOpened: Dispatch<SetStateAction<boolean>>;
  //   playingAudioData: PlayingAudioData;
  //   setPlayingAudioData: Dispatch<SetStateAction<PlayingAudioData>>;

  //   setSelectedTrack: Dispatch<SetStateAction<number>>;
  //   openPopup: () => void;
  //   setVideoId: Dispatch<SetStateAction<string>>;
};

const ExtendedAudioPlayer = forwardRef(
  (
    {
      //   filteredPieces,
      isPlayerOpened,
      playingProjectData,

      //   playingAudioData,
      //   setPlayingAudioData,
      setIsPlayerOpened,
    }: //   setSelectedTrack,
    //   setVideoId,
    //   openPopup,
    AudioPlayerProps,
    ref: RefObject<HTMLAudioElement>
  ) => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const audioPlayerRef = ref.current;

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

    // const handlePlayNextClick = (prevOrNext) => {
    //   let nextSongIndex = 0;

    //   prevOrNext === "next"
    //     ? (nextSongIndex = playingAudioData.index + 1)
    //     : (nextSongIndex = playingAudioData.index - 1);

    //   const nextTrack = filteredPieces[nextSongIndex];

    //   if (nextTrack) {
    //     audioPlayerRef.src = nextTrack.audioSrc;
    //     setSelectedTrack(nextSongIndex);
    //     setPlayingAudioData({
    //       index: filteredPieces.indexOf(nextTrack),
    //       name: nextTrack.name,
    //       imageSource: nextTrack.imageSrc,
    //       videoSource: nextTrack.videoSrc,
    //     });
    //   }
    //   if (nextTrack && isAudioPlaying) audioPlayerRef.play();
    // };

    // const handleVideoClick = (e) => {
    //   e.stopPropagation();
    //   setIsPlayerOpened(false);
    //   setVideoId(playingAudioData.videoSource);
    //   audioPlayerRef.pause();
    //   audioPlayerRef.src = "";
    //   openPopup();
    // };

    const handleCloseClick = () => {
      audioPlayerRef.pause();
      audioPlayerRef.src = "";
      setIsAudioPlaying(false);
      setIsPlayerOpened(false);
    };

    const playerClasses = cn(s.playerSection, {
      [s.playerSectionActive]: isPlayerOpened == true,
    });

    return (
      <div className={playerClasses}>
        <img
          className={s.closeIcon}
          src={closeIcon}
          onClick={handleCloseClick}
        />
        <div className={s.trackList}>
          {playingProjectData?.tracks.map((track, i) => {
            return (
              <div className={s.track} key={i}>
                <span>{i + 1}</span>
                <span className={s.trackTitle}>{track.name}</span>
                <span>{track.duration}</span>
              </div>
            );
          })}
        </div>

        <div className={s.playerContainer}>
          <div className={s.title}>{"Audio Title"}</div>

          <div className={s.buttonsContainer}>
            <button
              type="button"
              className={s.playPreviousButton}
              // onClick={() => handlePlayNextClick("prev")}
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
              // onClick={() => handlePlayNextClick("next")}
            />
          </div>

          <ProgressBar ref={ref} />

          <img
            className={s.videoIcon}
            src={videoIcon}
            //   onClick={handleVideoClick}
          />
          <img className={s.artwork} src={playingProjectData?.imageSrc} />
        </div>
      </div>
    );
  }
);

export default ExtendedAudioPlayer;
