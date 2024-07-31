import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { PlayerContext, PlayerDispatchContext } from "../../Pieces";
// import ProgressBar from "./ProgressBar/ProgressBar";

import s from "./AudioPlayer.module.css";
import ControlButtons from "../../../../components/AudioPlayer/Shared/ControlButtons/ControlButtons";
import Title from "../../../../components/AudioPlayer/Simple/Title/Title";
import Artwork from "../../../../components/AudioPlayer/Simple/Artwork/Artwork";
import VideoButton from "../../../../components/AudioPlayer/Simple/VideoButton/VideoButton";
import CloseButton from "../../../../components/AudioPlayer/Simple/CloseButton/CloseButton";

import { PLAYER_STATUS } from "../../_constants";
import { PLAYER_ACTION_TYPE } from "../../_types";
import HTMLAudioTag from "../../../../components/HTMLAudioTag/HTMLAudioTag";
import TimeValue from "../../../../components/AudioPlayer/Shared/ProgressBar/TimeValue/TimeValue";
import { formatTime } from "../../../../utils/helpers/formatTime";

import BufferedBar from "../../../../components/AudioPlayer/Shared/ProgressBar/BufferedBar/BufferedBar";
import DurationBar from "../../../../components/AudioPlayer/Shared/ProgressBar/DurationBar/DurationBar";
import ScrubberLoader from "../../../../components/AudioPlayer/Shared/ProgressBar/ScrubberLoader/ScrubberLoader";
import ScrubberBar from "../../../../components/AudioPlayer/Shared/ProgressBar/ScrubberBar/ScrubberBar";
import useElapsedTimeProgress from "../../../../utils/hooks/useElapsedTimeProgress";
import useBufferedAudioProgress from "../../../../utils/hooks/useBufferedAudioProgress";
// import { updateBufferedAndElapsedTime } from "../../../../utils/helpers/audioPlayer";
import useAudioPlayerEvents from "../../../../utils/hooks/useAudioPlayerEvents";

const AudioPlayer = () => {
  const [buffered, setBuffered] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressTransitionAnimation, setProgressTransitionAnimation] =
    useState(false);

  const audioPlayerRef = useRef<HTMLAudioElement>();
  const progressBarRef = useRef<HTMLInputElement>();
  const bufferedBarRef = useRef<HTMLInputElement>();

  const {
    filteredPieces,
    player,
    setIsVideoPopupOpened,
    setSelectedTrackIndex,
    setVideoID,
  } = useContext(PlayerContext);

  const dispatchPlayerAction = useContext(PlayerDispatchContext);

  useEffect(
    function showTransitionAnimationWhenBuffered() {
      if (buffered !== 0) setProgressTransitionAnimation(true);
    },
    [buffered]
  );

  useEffect(
    function togglePlayerPlayPause() {
      switch (player.status) {
        case PLAYER_STATUS.PLAYING:
          if (!audioPlayerRef.current.src.includes(player.data.audio)) {
            audioPlayerRef.current.src = player.data.audio;
          }

          audioPlayerRef.current.play();
          break;
        case PLAYER_STATUS.PAUSED:
          audioPlayerRef.current.pause();
          break;
      }
    },
    [player]
  );

  useAudioPlayerEvents(
    audioPlayerRef,
    setDuration,
    setElapsed,
    setBuffered,
    dispatchPlayerAction
  );

  useElapsedTimeProgress(progressBarRef, elapsed, duration);
  useBufferedAudioProgress(bufferedBarRef, buffered, duration, elapsed);

  const onScrubberChange = useCallback((e) => {
    setProgressTransitionAnimation(false);
    const newTime = e.target.value;
    audioPlayerRef.current.currentTime = newTime;

    setTimeout(() => {
      setProgressTransitionAnimation(true);
    }, 300);
  }, []);

  const handlePlayPauseClick = useCallback(() => {
    dispatchPlayerAction({ type: PLAYER_ACTION_TYPE.AUDIO_TOGGLED });
  }, [dispatchPlayerAction]);

  const handlePlayNextClick = useCallback(
    (direction: "next" | "prev") => {
      let nextTrackIndex: number;

      switch (direction) {
        case "next":
          nextTrackIndex = player.data.index + 1;
          break;
        case "prev":
          nextTrackIndex = player.data.index - 1;
          break;
      }

      const nextTrackData = filteredPieces[nextTrackIndex];

      if (nextTrackData) {
        dispatchPlayerAction({
          type: PLAYER_ACTION_TYPE.TRACK_DATA_SET,
          payload: { ...nextTrackData, index: nextTrackIndex },
        });

        setSelectedTrackIndex(nextTrackIndex);
        setProgressTransitionAnimation(false);
      }
    },
    [
      setSelectedTrackIndex,
      dispatchPlayerAction,
      filteredPieces,
      player.data.index,
    ]
  );

  const handleVideoClick = () => {
    setVideoID(player.data.video);
    setIsVideoPopupOpened(true);
    dispatchPlayerAction({ type: PLAYER_ACTION_TYPE.PLAYER_TERMINATED });
  };

  const handleCloseClick = () => {
    dispatchPlayerAction({ type: PLAYER_ACTION_TYPE.PLAYER_TERMINATED });
  };

  return (
    <div className={s.player}>
      <div className={s.content}>
        <Artwork src={player.data.image} />
        <div className={s.playerControls}>
          <Title>{player.data.name}</Title>
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
                progressTransitionAnimation={progressTransitionAnimation}
                ref={progressBarRef}
              />
              <DurationBar />
              <BufferedBar
                progressTransitionAnimation={progressTransitionAnimation}
                ref={bufferedBarRef}
              />
            </div>

            <TimeValue> {formatTime(duration)}</TimeValue>
          </div>
        </div>
        <VideoButton handleVideoClick={handleVideoClick} />
        <CloseButton onClick={handleCloseClick} />
      </div>
      <HTMLAudioTag ref={audioPlayerRef} />
    </div>
  );
};

export default AudioPlayer;
