import { PLAYER_STATE } from "../../pages/Pieces/_constants";
import {
  playerState,
  playerStateSetter,
  trackData,
} from "../../pages/Pieces/_types";

export const setIsLoading = (stateSetter: playerStateSetter) => {
  stateSetter((prev) => {
    return { ...prev, status: PLAYER_STATE.Loading };
  });
};

export const setIsPlaying = (stateSetter: playerStateSetter) => {
  stateSetter((prev) => {
    return { ...prev, status: PLAYER_STATE.Playing };
  });
};

export const playPauseTrack = (
  state: playerState,
  stateSetter: playerStateSetter
) => {
  if (state.status === PLAYER_STATE.Paused) {
    stateSetter({ ...state, status: PLAYER_STATE.Playing });
  } else {
    stateSetter({ ...state, status: PLAYER_STATE.Paused });
  }
};

export const setTrackAndPlay = (
  stateSetter: playerStateSetter,
  data: trackData,
  index: number
) => {
  stateSetter({
    status: PLAYER_STATE.Playing,
    src: data.audio,
    isOpened: true,
    data: { ...data, index },
  });
};

export const setNextTrack = (
  state: playerState,
  stateSetter: playerStateSetter,
  nextTrackIndex: number,
  nextTrackData: trackData
) => {
  stateSetter({
    ...state,
    src: nextTrackData.audio,
    data: { ...nextTrackData, index: nextTrackIndex },
  });
};

export const terminatePlayer = (stateSetter: playerStateSetter) => {
  stateSetter({
    status: PLAYER_STATE.Paused,
    src: "",
    data: null,
    isOpened: false,
  });
};
