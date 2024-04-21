import cn from "classnames";
import { forwardRef, useEffect, useState } from "react";
import { Dispatch, RefObject, SetStateAction } from "react";
// import { AudioTrackData } from "../../types";
// import { PlayingAudioData } from "../../pages/Pieces/Mobile/PiecesMobile";
import ProgressBar from "./ProgressBar/ProgressBar";
import AudioPlayingLoader from "../AudioPlayingLoader/AudioPlayingLoader";
import playSrc from "../../assets/images/play.svg";
import pauseSrc from "../../assets/images/pause.svg";
import closeIcon from "../../assets/images/close-icon_black.svg";
import videoIcon from "../../assets/images/tv.svg";
import s from "./ExtendedAudioPlayer.module.css";

import { ProjectData } from "../../types";

type AudioPlayerProps = {
  isPlayerOpened: boolean;
  playingProjectData: ProjectData;
  setIsPlayerOpened: Dispatch<SetStateAction<boolean>>;
};

const ExtendedAudioPlayer = forwardRef(
  (
    { isPlayerOpened, playingProjectData, setIsPlayerOpened }: AudioPlayerProps,
    ref: RefObject<HTMLAudioElement>
  ) => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [playingTrackIndex, setPlayingTrackIndex] = useState<number>(0);
    const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(0);
    const audioPlayerRef = ref.current;

    useEffect(() => {
      if (isPlayerOpened) {
        setPlayingTrackIndex(0);
        setSelectedTrackIndex(0);
        audioPlayerRef.src = playingProjectData.tracks[0].audioSrc;
        audioPlayerRef.play();
      }
    }, [isPlayerOpened]);

    useEffect(
      function togglePlayingStatus() {
        const onPlayingHandler = () => setIsAudioPlaying(true);
        const onPauseHandler = () => setIsAudioPlaying(false);
        const onEndedHandler = () => setIsAudioPlaying(false);

        if (audioPlayerRef) {
          audioPlayerRef.addEventListener("playing", onPlayingHandler);
          audioPlayerRef.addEventListener("pause", onPauseHandler);
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

    const isTrackPlaying = (index) => {
      return isAudioPlaying && playingTrackIndex === index;
    };

    const isTrackSelected = (index) => {
      return selectedTrackIndex === index;
    };

    // const handleVideoClick = (e) => {
    //   e.stopPropagation();
    //   setIsPlayerOpened(false);
    //   setVideoId(playingAudioData.videoSource);
    //   audioPlayerRef.pause();
    //   audioPlayerRef.src = "";
    //   openPopup();
    // };

    const handlePlayNextClick = (prevOrNext) => {
      const tracksMaxIndex = playingProjectData.tracks.length - 1;
      let nextTrackIndex;

      if (prevOrNext === "next") {
        playingTrackIndex + 1 > tracksMaxIndex
          ? (nextTrackIndex = 0)
          : (nextTrackIndex = playingTrackIndex + 1);
      }

      if (prevOrNext === "prev") {
        playingTrackIndex - 1 < 0
          ? (nextTrackIndex = tracksMaxIndex)
          : (nextTrackIndex = playingTrackIndex - 1);
      }

      setSelectedTrackIndex(nextTrackIndex);
      setPlayingTrackIndex(nextTrackIndex);
      audioPlayerRef.src = playingProjectData.tracks[nextTrackIndex].audioSrc;
      audioPlayerRef.currentTime = 0;

      if (isAudioPlaying) {
        audioPlayerRef.play();
      }
    };

    const handleTrackClick = (audioSrc: string, index: number) => {
      setSelectedTrackIndex(index);
      setPlayingTrackIndex(index);
      audioPlayerRef.src = audioSrc;
      audioPlayerRef.play();
    };

    const handlePlayPauseClick = () => {
      if (selectedTrackIndex === null) {
        audioPlayerRef.src = playingProjectData.tracks[0].audioSrc;
        setSelectedTrackIndex(0);
        setPlayingTrackIndex(0);
      }

      if (isAudioPlaying) {
        audioPlayerRef.pause();
      } else {
        audioPlayerRef.play();
      }
    };

    const handleCloseClick = () => {
      audioPlayerRef.pause();
      // audioPlayerRef.src = " ";
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
        <div className={s.projectInfoSection}>
          <img className={s.artwork} src={playingProjectData?.imageSrc} />
          <div className={s.projectInfoContainer}>
            <div className={s.projectDetailsBlock}>
              <div>{playingProjectData?.name}</div>
              <div>{playingProjectData?.genre}</div>
              <div>{playingProjectData?.year}</div>
            </div>
            <img
              className={s.videoIcon}
              src={videoIcon}
              //   onClick={handleVideoClick}
            />
          </div>
        </div>

        <div className={s.trackList}>
          {playingProjectData?.tracks.map((track, i) => {
            return (
              <div
                className={cn(
                  s.track,
                  isTrackSelected(i) ? s.trackPlaying : ""
                )}
                key={i}
                onClick={() => handleTrackClick(track.audioSrc, i)}
              >
                {isTrackPlaying(i) ? (
                  <AudioPlayingLoader color={"black"} />
                ) : (
                  <div className={s.trackIndex}>{i + 1}</div>
                )}
                <span className={s.trackTitle}>{track.name}</span>
                <span>{track.duration}</span>
              </div>
            );
          })}
        </div>

        <div className={s.playerContainer}>
          <div className={s.title}>
            {selectedTrackIndex === undefined
              ? playingProjectData?.tracks[0].name
              : playingProjectData?.tracks[selectedTrackIndex]?.name}
          </div>

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
        </div>
      </div>
    );
  }
);

export default ExtendedAudioPlayer;
