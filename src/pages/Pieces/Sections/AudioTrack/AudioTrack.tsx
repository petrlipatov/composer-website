import { Dispatch, SetStateAction, useContext, useEffect, memo } from "react";
import cn from "classnames";

import AudioTitle from "./AudioTitle/AudioTitle";
import { PlayerContext, PlayerDispatchContext } from "../../Pieces";
import { PLAYER_ACTION_TYPE, trackData } from "../../_types";

import s from "./AudioTrack.module.css";
import TvIcon from "../../../../components/Icons/TvIcon/TvIcon";
import HeadphonesIcon from "../../../../components/Icons/HeadphonesIcon/HeadphonesIcon";
import HorizontalOverlayButton from "../../../../components/Buttons/HorizontalOverlayButton/HorizontalOverlayButton";
import { PLAYER_STATUS } from "../../../../utils/constants";
// import {
//   terminatePlayer,
//   setTrack,
//   openPlayer,
//   setPlaying,
// } from "../../../../utils/helpers/piecesPlayer";

type AudioTrackProps = {
  index: number;
  data: trackData;
  isSelected: boolean;
  extraStyles: any;
  setSelectedTrackIndex: Dispatch<SetStateAction<number>>;
};

const AudioTrack = memo(
  ({
    index,
    data,
    isSelected,
    extraStyles,
    setSelectedTrackIndex,
  }: AudioTrackProps) => {
    const { setVideoID, setIsVideoPopupOpened, player } =
      useContext(PlayerContext);

    const dispatchPlayerAction = useContext(PlayerDispatchContext);

    const isPlaying = () => {
      return (
        player.status === PLAYER_STATUS.PLAYING &&
        player.data?.audio === data.audio
      );
    };

    const isPaused = () => {
      return (
        player.status === PLAYER_STATUS.PAUSED &&
        player.data?.audio === data.audio
      );
    };

    const isLoading = () => {
      return (
        player.status === PLAYER_STATUS.LOADING &&
        player.data?.audio === data.audio
      );
    };

    useEffect(
      function clearTrackSelection() {
        if (isSelected) {
          const timer = setTimeout(() => {
            setSelectedTrackIndex(null);
          }, 5000);

          return () => clearTimeout(timer);
        }
      },
      [isSelected, setSelectedTrackIndex, index]
    );

    function handleTrackClick() {
      setSelectedTrackIndex(index);
    }

    function handleWatchButton() {
      dispatchPlayerAction({ type: PLAYER_ACTION_TYPE.PLAYER_TERMINATED });
      setVideoID(data.video);
      setIsVideoPopupOpened(true);
    }

    function handleListenButton() {
      dispatchPlayerAction({
        type: PLAYER_ACTION_TYPE.TRACK_DATA_SET,
        payload: { ...data, index },
      });
      dispatchPlayerAction({ type: PLAYER_ACTION_TYPE.PLAYER_OPENED });
      dispatchPlayerAction({ type: PLAYER_ACTION_TYPE.AUDIO_PLAYED });
    }

    const trackButtonsClasses = cn(s.trackButtons, {
      [s.trackButtonsActive]: isSelected,
    });

    return (
      <div className={s.track} style={{ ...extraStyles }}>
        <div className={s.artworkContainer} onClick={handleTrackClick}>
          <img className={s.artwork} src={data.image} />

          <div className={trackButtonsClasses}>
            <HorizontalOverlayButton onClick={handleListenButton}>
              <HeadphonesIcon className={s.Icon} />
              <div className={s.iconCaption}>Listen</div>
            </HorizontalOverlayButton>

            <HorizontalOverlayButton onClick={handleWatchButton}>
              <TvIcon className={s.Icon} />
              <div className={s.iconCaption}>Watch</div>
            </HorizontalOverlayButton>
          </div>
        </div>

        <AudioTitle
          isPlaying={isPlaying()}
          isLoading={isLoading()}
          isPaused={isPaused()}
          name={data.name}
        />
      </div>
    );
  }
);

export default AudioTrack;
