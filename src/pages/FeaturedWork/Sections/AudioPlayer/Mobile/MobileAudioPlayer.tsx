import { useCallback, useContext, useEffect, useRef, useState } from "react";

// import ProgressBar from "../ProgressBar/ProgressBar";
import ControlButtons from "../../../../../components/AudioPlayer/Shared/ControlButtons/ControlButtons";
import Title from "../../../../../components/AudioPlayer/Extended/Title/Title";
import AudioTrack from "../../../../../components/AudioPlayer/Extended/AudioTrack/AudioTrack";
import Info from "../../../../../components/AudioPlayer/Extended/Info/Info";
import Scrollbar from "../../../../../components/AudioPlayer/Extended/Scrollbar/Scrollbar";
import CloseButton from "../../../../../components/AudioPlayer/Simple/CloseButton/CloseButton";
import HTMLAudioTag from "../../../../../components/HTMLAudioTag/HTMLAudioTag";

import DurationBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/DurationBar/DurationBar";
import BufferedBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/BufferedBar/BufferedBar";
import ScrubberLoader from "../../../../../components/AudioPlayer/Shared/ProgressBar/ScrubberLoader/ScrubberLoader";
import ScrubberBar from "../../../../../components/AudioPlayer/Shared/ProgressBar/ScrubberBar/ScrubberBar";
import TimeValue from "../../../../../components/AudioPlayer/Shared/ProgressBar/TimeValue/TimeValue";

import {
  FeaturedWorkContext,
  FeaturedWorkDispatchContext,
} from "../../../FeaturedWork";

import { PLAYER_CONTROLS, PLAYER_STATUS } from "../../../../../utils/constants";

import { getNextTrackIndex } from "../_helpers";
import { EXTENDED_PLAYER_ACTION_TYPE } from "../../../_types";
import { formatTime } from "../../../../../utils/helpers/formatTime";
import useElapsedTimeProgress from "../../../../../utils/hooks/useElapsedTimeProgress";
import useBufferedAudioProgress from "../../../../../utils/hooks/useBufferedAudioProgress";
import {
  handleScrubberChange,
  updateBufferedAndElapsedTime,
} from "../../../../../utils/helpers/audioPlayer";
import useScrollSelectedTrackIntoView from "../../../../../utils/hooks/useScrollSelectedTrackIntoView";
import useTransitionOnProgressBarWhenBuffered from "../../../../../utils/hooks/useTransitionOnProgressBarWhenBuffered";
import usePlayPauseToggler from "../../../../../utils/hooks/usePlayPauseToggler";

import s from "./MobileAudioPlayer.module.css";

const MobileAudioPlayer = () => {
  const [buffered, setBuffered] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isTransitionProgressBar, setIsTransitionOnProgressBar] =
    useState(false);

  const { setVideoID, setIsVideoPopupOpened, player } =
    useContext(FeaturedWorkContext);

  const dispatchPlayerAction = useContext(FeaturedWorkDispatchContext);

  const progressBarRef = useRef<HTMLInputElement>();
  const bufferedBarRef = useRef<HTMLDivElement>();
  const audioPlayerRef = useRef<HTMLAudioElement>();
  const tracksContainerRef = useRef(null);
  const tracksRefs = useRef([]);

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

  useScrollSelectedTrackIntoView(
    player.selectedTrackIndex,
    tracksRefs,
    tracksContainerRef
  );

  const onScrubberChange = useCallback((e) => {
    handleScrubberChange(e, audioPlayerRef, setIsTransitionOnProgressBar);
  }, []);

  const isTrackPlaying = (i) => {
    return (
      player.status === PLAYER_STATUS.PLAYING && player.selectedTrackIndex === i
    );
  };

  const isTrackSelected = (i) => {
    return player.selectedTrackIndex === i;
  };

  const handlePlayPauseClick = useCallback(() => {
    dispatchPlayerAction({ type: EXTENDED_PLAYER_ACTION_TYPE.AUDIO_TOGGLED });
  }, [dispatchPlayerAction]);

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

  const handleTrackClick = (index: number) => {
    dispatchPlayerAction({
      type: EXTENDED_PLAYER_ACTION_TYPE.TRACK_SELECTED,
      payload: index,
    });
  };

  const handleCloseClick = () => {
    dispatchPlayerAction({
      type: EXTENDED_PLAYER_ACTION_TYPE.PLAYER_TERMINATED,
    });
  };

  const handleVideoClick = () => {
    dispatchPlayerAction({
      type: EXTENDED_PLAYER_ACTION_TYPE.PLAYER_TERMINATED,
    });
    setVideoID(player.data.video);
    setIsVideoPopupOpened(true);
  };

  return (
    <section className={s.player}>
      <CloseButton onClick={handleCloseClick} />
      <Info data={player.data} handleVideoClick={handleVideoClick} />
      <Scrollbar ref={tracksContainerRef}>
        {player.data.tracks.map((track, i) => {
          return (
            <AudioTrack
              key={i}
              index={i}
              track={track}
              isTrackPlaying={isTrackPlaying(i)}
              isTrackSelected={isTrackSelected(i)}
              handleTrackClick={handleTrackClick}
              ref={(el) => (tracksRefs.current[i] = el)}
            />
          );
        })}
      </Scrollbar>

      <div className={s.playerContainer}>
        <Title
          selectedTrackIndex={player.selectedTrackIndex}
          currentProject={player.data}
        />

        <ControlButtons
          handlePlayPauseClick={handlePlayPauseClick}
          handlePlayNextClick={handlePlayNextClick}
          isAudioPlaying={player.status === PLAYER_STATUS.PLAYING}
        />

        <div className={s.progressBarContainer} key={player.data.name}>
          <TimeValue> {formatTime(elapsed)}</TimeValue>

          <div className={s.progressBar}>
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
      <HTMLAudioTag ref={audioPlayerRef} />
    </section>
  );
};

export default MobileAudioPlayer;
