import { MutableRefObject, useEffect } from "react";
// import { PlayerState } from "../../pages/Pieces/_types";
import { PLAYER_STATUS } from "../../utils/constants";
import { ExtendedPlayerState } from "../../pages/FeaturedWork/_types";
import { PlayerState } from "../../pages/Pieces/_types";

const usePlayPauseToggler = (
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
      if (player.status === PLAYER_STATUS.PLAYING) {
        updateAudioSourceIfDifferent(getAudioSrc());
        audioPlayerRef.current.play();
      } else if (player.status === PLAYER_STATUS.PAUSED) {
        audioPlayerRef.current.pause();
      }
      // switch (player.status) {
      //   case PLAYER_STATUS.PLAYING:
      //     if (
      //       !audioPlayerRef.current.src.includes(
      //         player.data.tracks[player.selectedTrackIndex].audio
      //       )
      //     ) {
      //       audioPlayerRef.current.src =
      //         player.data.tracks[player.selectedTrackIndex].audio;
      //     }
      //     audioPlayerRef.current.play();
      //     break;
      //   case PLAYER_STATUS.PAUSED:
      //     audioPlayerRef.current.pause();
      //     break;
      // }
    }
  }, [player, audioPlayerRef]);
};

export default usePlayPauseToggler;
