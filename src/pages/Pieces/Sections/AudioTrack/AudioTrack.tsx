import { Dispatch, SetStateAction, useContext, useEffect, memo } from "react";
import cn from "classnames";

import AudioTitle from "./AudioTitle/AudioTitle";
import { PiecesContext } from "../../Pieces";
import { trackData } from "../../_types";

import s from "./AudioTrack.module.css";
import TvIcon from "../../../../components/Icons/TvIcon/TvIcon";
import HeadphonesIcon from "../../../../components/Icons/HeadphonesIcon/HeadphonesIcon";
import HorizontalOverlayButton from "../../../../components/Buttons/HorizontalOverlayButton/HorizontalOverlayButton";
import {
  terminatePlayer,
  setTrackAndPlay,
} from "../../../../utils/helpers/piecesPlayer";
import { PLAYER_STATE } from "../../_constants";

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
    const { setVideoID, setIsVideoPopupOpened, setPlayer, player } =
      useContext(PiecesContext);

    const isPlaying = () => {
      return (
        player.status === PLAYER_STATE.Playing &&
        player.data?.audio === data.audio
      );
    };

    const isPaused = () => {
      return (
        player.status === PLAYER_STATE.Paused &&
        player.data?.audio === data.audio
      );
    };

    const isLoading = () => {
      return (
        player.status === PLAYER_STATE.Loading &&
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
      terminatePlayer(setPlayer);
      setVideoID(data.video);
      setIsVideoPopupOpened(true);
    }

    function handleListenButton() {
      setTrackAndPlay(setPlayer, data, index);
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
