import { MutableRefObject, useEffect } from "react";
import { PLAYER_STATUS } from "../../utils/constants";
import { ExtendedPlayerState } from "../../pages/FeaturedWork/_types";
import { PlayerState } from "../../pages/Pieces/_types";

export const usePlayPauseToggler = (
  audioPlayerRef: MutableRefObject<HTMLAudioElement>,
  player: PlayerState | ExtendedPlayerState
) => {
  useEffect(() => {
    if (audioPlayerRef.current) {
      const isExtendedPlayer = "selectedTrackIndex" in player;

      const getAudioSrc = () =>
        isExtendedPlayer
          ? player.data.tracks[player.selectedTrackIndex].audio
          : player.data.audio;

      const updateAudioSourceIfDifferent = (audioSrc) => {
        if (!audioPlayerRef.current.src.includes(audioSrc)) {
          audioPlayerRef.current.src = audioSrc;
        }
      };

      switch (player.status) {
        case PLAYER_STATUS.PLAYING:
          updateAudioSourceIfDifferent(getAudioSrc());
          audioPlayerRef.current.play();
          break;
        case PLAYER_STATUS.PAUSED:
          audioPlayerRef.current.pause();
          break;
      }
    }
  }, [player, audioPlayerRef]);
};
