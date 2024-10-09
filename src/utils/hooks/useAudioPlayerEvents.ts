import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";
import { updateBufferedAndElapsedTime } from "../helpers/audioPlayer";
import {
  PLAYER_ACTION_TYPE,
  PlayerAction,
  PlayerState,
} from "../../pages/Pieces/_types";
import { ExtendedPlayerAction } from "../../pages/FeaturedWork/_types";

type PlayerActions = PlayerAction | ExtendedPlayerAction;

export const useAudioPlayerEvents = (
  isPlayerOpen: boolean,
  audioPlayerRef: MutableRefObject<HTMLAudioElement>,
  setDuration: Dispatch<SetStateAction<number>>,
  setElapsed: Dispatch<SetStateAction<number>>,
  setBuffered: Dispatch<SetStateAction<number>>,
  dispatchPlayerAction: Dispatch<PlayerActions>
) => {
  useEffect(() => {
    const audioPlayer = audioPlayerRef.current;

    if (audioPlayer) {
      audioPlayer.onloadedmetadata = () => {
        setElapsed(0);
        setBuffered(0);
        setDuration(audioPlayer.duration);
      };

      audioPlayer.ontimeupdate = () =>
        updateBufferedAndElapsedTime(audioPlayer, setBuffered, setElapsed);
      audioPlayer.onwaiting = () =>
        dispatchPlayerAction({ type: PLAYER_ACTION_TYPE.AUDIO_LOADING });
      audioPlayer.onplaying = () =>
        dispatchPlayerAction({ type: PLAYER_ACTION_TYPE.AUDIO_PLAYED });
      audioPlayer.onpause = () =>
        dispatchPlayerAction({ type: PLAYER_ACTION_TYPE.AUDIO_PAUSED });
    }

    return () => {
      if (audioPlayer) {
        audioPlayer.onloadedmetadata = null;
        audioPlayer.ontimeupdate = null;
        audioPlayer.onwaiting = null;
        audioPlayer.onplaying = null;
      }
    };
  }, [
    isPlayerOpen,
    setDuration,
    setElapsed,
    setBuffered,
    dispatchPlayerAction,
  ]);
};
