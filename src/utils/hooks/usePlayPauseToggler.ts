import { MutableRefObject, useEffect } from "react";

import { PlayerState } from "../../pages/Pieces/_types";
import { PLAYER_STATUS } from "../../pages/Pieces/_constants";

const usePlayPauseToggler = (
  audioPlayerRef: MutableRefObject<HTMLAudioElement>,
  player: PlayerState
) => {
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
    [player, audioPlayerRef]
  );
};

export default usePlayPauseToggler;
