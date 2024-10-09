import { useCallback, useContext, useRef, useState } from "react";

import { HTMLAudioTag } from "@/components/HTMLAudioTag";
import {
  TimeValue,
  ScrubberBar,
  ScrubberLoader,
  BufferedBar,
  DurationBar,
  CloseButton,
  ControlButtons,
  VideoButton,
  SimpleTitle,
  Artwork,
} from "@/components/AudioPlayer";

import {
  FeaturedWorkContext,
  FeaturedWorkDispatchContext,
} from "../../FeaturedWorkContext";
import { getNextTrackIndex } from "../_helpers";

import { formatTime } from "@/utils/helpers/formatTime";
import { useElapsedTimeProgress } from "@/utils/hooks/useElapsedTimeProgress";
import { useBufferedAudioProgress } from "@/utils/hooks/useBufferedAudioProgress";
import { usePlayPauseToggler } from "@/utils/hooks/usePlayPauseToggler";
import { useAudioPlayerEvents } from "@/utils/hooks/useAudioPlayerEvents";
import {
  handleMouseDown,
  handleScrubberChange,
} from "@/utils/helpers/audioPlayer";
import {
  FIRST_TRACK_INDEX,
  PLAYER_CONTROLS,
  PLAYER_STATUS,
} from "@/utils/constants";

import { EXTENDED_PLAYER_ACTION_TYPE } from "../../../_types";
import s from "./DesktopAudioPlayer.module.css";

const DesktopAudioPlayer = () => {
  const [buffered, setBuffered] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isTransitionProgressBar, setIsTransitionOnProgressBar] =
    useState(true);

  const { player, setVideoID, setIsVideoPopupOpened, setSelectedProjectIndex } =
    useContext(FeaturedWorkContext);

  const dispatchPlayerAction = useContext(FeaturedWorkDispatchContext);

  const progressBarRef = useRef<HTMLInputElement>();
  const bufferedBarRef = useRef<HTMLDivElement>();
  const audioPlayerRef = useRef<HTMLAudioElement>();

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
  };

  const handleCloseClick = () => {
    setSelectedProjectIndex(null);
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
      <Artwork src={player.data.image} />
      <div className={s.playerControls}>
        <SimpleTitle>
          {
            player.data?.tracks[player.selectedTrackIndex || FIRST_TRACK_INDEX]
              .name
          }
        </SimpleTitle>
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
              onMouseDown={() => {
                handleMouseDown(setIsTransitionOnProgressBar);
              }}
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
