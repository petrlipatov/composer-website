import { useCallback, useContext, useRef, useState } from "react";

import { HTMLAudioTag } from "@/components/HTMLAudioTag";
import {
  TimeValue,
  ScrubberBar,
  ScrubberLoader,
  BufferedBar,
  DurationBar,
  CloseButton,
  Scrollbar,
  Info,
  AudioTrack,
  ExtendedTitle,
  ControlButtons,
} from "@/components/AudioPlayer";

import { getNextTrackIndex } from "../_helpers";
import {
  FeaturedWorkContext,
  FeaturedWorkDispatchContext,
} from "../../FeaturedWorkContext";

import { PLAYER_CONTROLS, PLAYER_STATUS } from "@/utils/constants";
import { formatTime } from "@/utils/helpers/formatTime";
import { useAudioPlayerEvents } from "@/utils/hooks/useAudioPlayerEvents";
import { useElapsedTimeProgress } from "@/utils/hooks/useElapsedTimeProgress";
import { useBufferedAudioProgress } from "@/utils/hooks/useBufferedAudioProgress";
import { useScrollSelectedTrackIntoView } from "@/utils/hooks/useScrollSelectedTrackIntoView";
import { usePlayPauseToggler } from "@/utils/hooks/usePlayPauseToggler";
import { handleScrubberChange } from "@/utils/helpers/audioPlayer";

import { EXTENDED_PLAYER_ACTION_TYPE } from "../../../_types";
import s from "./MobileAudioPlayer.module.css";

const MobileAudioPlayer = () => {
  const [buffered, setBuffered] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isTransitionProgressBar, setIsTransitionOnProgressBar] =
    useState(true);

  const { setVideoID, setIsVideoPopupOpened, player } =
    useContext(FeaturedWorkContext);

  const dispatchPlayerAction = useContext(FeaturedWorkDispatchContext);

  const progressBarRef = useRef<HTMLInputElement>();
  const bufferedBarRef = useRef<HTMLDivElement>();
  const audioPlayerRef = useRef<HTMLAudioElement>();
  const tracksContainerRef = useRef(null);
  const tracksRefs = useRef([]);

  usePlayPauseToggler(audioPlayerRef, player);

  useAudioPlayerEvents(
    player.isOpened,
    audioPlayerRef,
    setDuration,
    setElapsed,
    setBuffered,
    dispatchPlayerAction
  );

  useElapsedTimeProgress(progressBarRef, elapsed, duration);
  useBufferedAudioProgress(bufferedBarRef, buffered, duration, elapsed);

  useScrollSelectedTrackIntoView(
    player.selectedTrackIndex,
    tracksRefs,
    tracksContainerRef
  );

  const onScrubberChange = useCallback((e) => {
    handleScrubberChange(e, audioPlayerRef);
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
        <ExtendedTitle
          selectedTrackIndex={player.selectedTrackIndex}
          currentProject={player.data}
        />

        <ControlButtons
          handlePlayPauseClick={handlePlayPauseClick}
          handlePlayNextClick={handlePlayNextClick}
          isAudioPlaying={player.status === PLAYER_STATUS.PLAYING}
        />

        <div className={s.progressBarContainer} key={player.selectedTrackIndex}>
          <TimeValue> {formatTime(elapsed)}</TimeValue>

          <div className={s.progressBar}>
            <ScrubberLoader
              isLoading={player.status === PLAYER_STATUS.LOADING}
            />
            <ScrubberBar
              elapsedTime={elapsed}
              duration={duration}
              onScrubberChange={onScrubberChange}
              // onMouseUp={() => {
              //   handleMouseUp(setIsTransitionOnProgressBar);
              // }}
              // onMouseDown={() => {
              //   handleMouseDown(setIsTransitionOnProgressBar);
              // }}
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
