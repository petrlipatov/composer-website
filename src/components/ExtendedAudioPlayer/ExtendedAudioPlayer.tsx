import cn from "classnames";
import {
  forwardRef,
  useEffect,
  useState,
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
} from "react";
import ProgressBar from "./ProgressBar/ProgressBar";
import AudioPlayingLoader from "../AudioPlayingLoader/AudioPlayingLoader";
import playSrc from "../../assets/images/play.svg";
import pauseSrc from "../../assets/images/pause.svg";
import closeIcon from "../../assets/images/close-icon_black.svg";
import videoIcon from "../../assets/images/tv.svg";
import s from "./ExtendedAudioPlayer.module.css";

import { ProjectData } from "../../types";
import Scrollbar from "../Scrollbar/Scrollbar";

type AudioPlayerProps = {
  isPlayerOpened: boolean;
  projectData: ProjectData;
  setIsPlayerOpened: Dispatch<SetStateAction<boolean>>;
  setVideoId: Dispatch<SetStateAction<string>>;
  openVideoModal: () => void;
};

const ExtendedAudioPlayer = forwardRef(
  (
    {
      isPlayerOpened,
      projectData,
      setIsPlayerOpened,
      setVideoId,
      openVideoModal,
    }: AudioPlayerProps,
    ref: RefObject<HTMLAudioElement>
  ) => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [playingTrackIndex, setPlayingTrackIndex] = useState<number>(null);
    const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(null);
    const audioPlayerRef = ref.current;

    const playFirstTrack = useCallback(async () => {
      try {
        setPlayingTrackIndex(0);
        setSelectedTrackIndex(0);
        audioPlayerRef.src = projectData.tracks[0].audioSrc;

        await new Promise((resolve, reject) => {
          audioPlayerRef.oncanplaythrough = resolve;
          audioPlayerRef.onerror = reject;
        });

        audioPlayerRef.play();
      } catch (err) {
        console.log("Error", err);
      }
    }, [audioPlayerRef, projectData.tracks]);

    useEffect(
      function playWhenComponentIsMounted() {
        if (
          isPlayerOpened &&
          playingTrackIndex === null &&
          selectedTrackIndex === null
        ) {
          playFirstTrack();
        }
      },
      [isPlayerOpened, selectedTrackIndex, playingTrackIndex, playFirstTrack]
    );

    useEffect(
      function setListenersOnPlayerStates() {
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
            audioPlayerRef.removeEventListener("pause", onPauseHandler);
            audioPlayerRef.removeEventListener("ended", onEndedHandler);
          }
        };
      },
      [audioPlayerRef]
    );

    const isTrackPlaying = (i) => {
      return isAudioPlaying && playingTrackIndex === i;
    };

    const isTrackSelected = (i) => {
      return selectedTrackIndex === i;
    };

    const handlePlayPauseClick = () => {
      if (isAudioPlaying) {
        audioPlayerRef.pause();
      } else {
        audioPlayerRef.play();
      }
    };

    const handlePlayNextClick = (prevOrNext) => {
      const tracksMaxIndex = projectData.tracks.length - 1;
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
      audioPlayerRef.src = projectData.tracks[nextTrackIndex].audioSrc;

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

    const handleCloseClick = () => {
      audioPlayerRef.pause();
      setIsPlayerOpened(false);
      setPlayingTrackIndex(null);
      setSelectedTrackIndex(null);
    };

    const handleVideoClick = (e) => {
      e.stopPropagation();
      setIsPlayerOpened(false);
      setVideoId(projectData.videoSrc);
      audioPlayerRef.src = "";
      openVideoModal();
    };

    return (
      <div className={s.playerSection}>
        <img
          className={s.closeIcon}
          src={closeIcon}
          onClick={handleCloseClick}
        />
        <div className={s.projectInfoSection}>
          <img className={s.artwork} src={projectData?.imageSrc} />
          <div className={s.projectInfoContainer}>
            <div className={s.projectDetailsBlock}>
              <div>{projectData?.name}</div>
              <div>{projectData?.genre}</div>
              <div>{projectData?.year}</div>
            </div>
            <div className={s.videoButtonContainer} onClick={handleVideoClick}>
              <img className={s.videoIcon} src={videoIcon} />
              <div>watch</div>
            </div>
          </div>
        </div>

        <Scrollbar>
          {projectData?.tracks.map((track, i) => {
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
        </Scrollbar>

        <div className={s.playerContainer}>
          <div className={s.title}>
            {selectedTrackIndex === undefined
              ? projectData?.tracks[0].name
              : projectData?.tracks[selectedTrackIndex]?.name}
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
