import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";
import { updateBufferedAndElapsedTime } from "../helpers/audioPlayer";
import { PLAYER_ACTION_TYPE, PlayerAction } from "../../pages/Pieces/_types";

const useAudioPlayerEvents = (
  audioPlayerRef: MutableRefObject<HTMLAudioElement>,
  setDuration: Dispatch<SetStateAction<number>>,
  setElapsed: Dispatch<SetStateAction<number>>,
  setBuffered: Dispatch<SetStateAction<number>>,
  dispatchPlayerAction: Dispatch<PlayerAction>
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
};

export default useAudioPlayerEvents;
