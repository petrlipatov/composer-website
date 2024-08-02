import { useCallback, useContext, useEffect, useRef, useState } from "react";

// import ProgressBar from "../ProgressBar/ProgressBar";
import ControlButtons from "../../../../../components/AudioPlayer/Shared/ControlButtons/ControlButtons";
import Title from "../../../../../components/AudioPlayer/Simple/Title/Title";
import Artwork from "../../../../../components/AudioPlayer/Simple/Artwork/Artwork";
import CloseButton from "../../../../../components/AudioPlayer/Simple/CloseButton/CloseButton";
import VideoButton from "../../../../../components/AudioPlayer/Simple/VideoButton/VideoButton";
import HTMLAudioTag from "../../../../../components/HTMLAudioTag/HTMLAudioTag";
import DurationBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/DurationBar/DurationBar";
import BufferedBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/BufferedBar/BufferedBar";
import ScrubberLoader from "../../../../../components/AudioPlayer/Shared/ProgressBar/ScrubberLoader/ScrubberLoader";
import ScrubberBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/ScrubberBar/ScrubberBar";

import { FeaturedWorkContext } from "../../../FeaturedWork";

import { getNextTrackIndex } from "../_helpers";

import { EXTENDED_PLAYER_ACTION_TYPE } from "../../../_types";
import {
  FIRST_TRACK_INDEX,
  PLAYER_CONTROLS,
  PLAYER_STATUS,
} from "../../../../../utils/constants";

import s from "./DesktopAudioPlayer.module.css";
import TimeValue from "../../../../../components/AudioPlayer/Shared/ProgressBar/TimeValue/TimeValue";
import { formatTime } from "../../../../../utils/helpers/formatTime";
import useElapsedTimeProgress from "../../../../../utils/hooks/useElapsedTimeProgress";
import useBufferedAudioProgress from "../../../../../utils/hooks/useBufferedAudioProgress";
import {
  handleScrubberChange,
  updateBufferedAndElapsedTime,
} from "../../../../../utils/helpers/audioPlayer";
import usePlayPauseToggler from "../../../../../utils/hooks/usePlayPauseToggler";
import useTransitionOnProgressBarWhenBuffered from "../../../../../utils/hooks/useTransitionOnProgressBarWhenBuffered";

const DesktopAudioPlayer = () => {
  const [buffered, setBuffered] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isTransitionProgressBar, setIsTransitionOnProgressBar] =
    useState(false);

  const {
    player,
    dispatchPlayerAction,
    // setVideoID,
    // setIsVideoPopupOpened,
    setSelectedProjectIndex,
  } = useContext(FeaturedWorkContext);

  const progressBarRef = useRef<HTMLInputElement>();
  const bufferedBarRef = useRef<HTMLDivElement>();
  const audioPlayerRef = useRef<HTMLAudioElement>();

  usePlayPauseToggler(audioPlayerRef, player);

  useEffect(() => {
    const audioPlayer = audioPlayerRef.current;
    if (audioPlayer) {
      audioPlayer.onloadedmetadata = () => {
        setElapsed(0);
        setBuffered(0);
        setDuration(audioPlayer.duration);
      };

      audioPlayer.ontimeupdate = () =>
        updateBufferedAndElapsedTime(
          audioPlayerRef.current,
          setBuffered,
          setElapsed
        );
      audioPlayer.onwaiting = () =>
        dispatchPlayerAction({
          type: EXTENDED_PLAYER_ACTION_TYPE.AUDIO_LOADING,
        });
      audioPlayer.onplaying = () =>
        dispatchPlayerAction({
          type: EXTENDED_PLAYER_ACTION_TYPE.AUDIO_PLAYED,
        });
      audioPlayer.onpause = () =>
        dispatchPlayerAction({
          type: EXTENDED_PLAYER_ACTION_TYPE.AUDIO_PAUSED,
        });
      // audioPlayer.onstalled = () => setIsLoading(false);
      // audioPlayer.onerror = () => setIsLoading(false);
      // audioPlayer.onended = () => setElapsed(0);
    }

    return () => {
      if (audioPlayer) {
        audioPlayer.onloadedmetadata = null;
        audioPlayer.ontimeupdate = null;
        audioPlayer.onwaiting = null;
        audioPlayer.onplaying = null;
        audioPlayer.onstalled = null;
        audioPlayer.onerror = null;
        audioPlayer.onended = null;
      }
    };
  }, [
    audioPlayerRef,
    setDuration,
    setElapsed,
    setBuffered,
    dispatchPlayerAction,
  ]);

  useElapsedTimeProgress(progressBarRef, elapsed, duration);
  useBufferedAudioProgress(bufferedBarRef, buffered, duration, elapsed);

  useTransitionOnProgressBarWhenBuffered(
    buffered,
    setIsTransitionOnProgressBar
  );

  const onScrubberChange = useCallback((e) => {
    handleScrubberChange(e, audioPlayerRef, setIsTransitionOnProgressBar);
  }, []);

  const handlePlayPauseClick = () => {
    if (player.selectedTrackIndex === null) {
      dispatchPlayerAction({
        type: EXTENDED_PLAYER_ACTION_TYPE.TRACK_SELECTED,
        payload: FIRST_TRACK_INDEX,
      });
    }
    dispatchPlayerAction({ type: EXTENDED_PLAYER_ACTION_TYPE.AUDIO_TOGGLED });
  };

  const handlePlayNextClick = (direction: PLAYER_CONTROLS) => {
    const nextTrackIndex = getNextTrackIndex(
      direction,
      player.selectedTrackIndex,
      player.data.tracks.length - 1
    );

    dispatchPlayerAction({
      type: EXTENDED_PLAYER_ACTION_TYPE.TRACK_SELECTED,
      payload: nextTrackIndex,
    });
    setIsTransitionOnProgressBar(false);
  };

  const handleCloseClick = () => {
    setSelectedProjectIndex(null);
    dispatchPlayerAction({
      type: EXTENDED_PLAYER_ACTION_TYPE.PLAYER_TERMINATED,
    });
  };

  const handleVideoClick = () => {
    // watchVideoCallback(
    //   audioPlayer,
    //   currentProject,
    //   setIsPlayerOpened,
    //   setVideoID,
    //   setIsVideoPopupOpened
    // );
  };

  return (
    <section className={s.player}>
      <Artwork src={player.data.image} />
      <div className={s.playerControls}>
        <Title>
          {
            player.data?.tracks[player.selectedTrackIndex || FIRST_TRACK_INDEX]
              .name
          }
        </Title>
        <ControlButtons
          handlePlayPauseClick={handlePlayPauseClick}
          handlePlayNextClick={handlePlayNextClick}
          isAudioPlaying={player.status === PLAYER_STATUS.PLAYING}
        />

        <div className={s.progressBarContainer} key={player.data.name}>
          <TimeValue> {formatTime(elapsed)}</TimeValue>

          <div className={s.progressBar} key={player.selectedTrackIndex}>
            <ScrubberLoader
              isLoading={player.status === PLAYER_STATUS.LOADING}
            />
            <ScrubberBar
              elapsedTime={elapsed}
              duration={duration}
              onScrubberChange={onScrubberChange}
              progressTransitionAnimation={isTransitionProgressBar}
              ref={progressBarRef}
            />
            <DurationBar />
            <BufferedBar
              progressTransitionAnimation={isTransitionProgressBar}
              ref={bufferedBarRef}
            />
          </div>

          <TimeValue> {formatTime(duration)}</TimeValue>
        </div>
      </div>
      <VideoButton handleVideoClick={handleVideoClick} />
      <CloseButton onClick={handleCloseClick} />
      <HTMLAudioTag ref={audioPlayerRef} />
    </section>
  );
};

export default DesktopAudioPlayer;
