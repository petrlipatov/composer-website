import { PlayerAction, PlayerState } from "../../pages/Pieces/_types";
import { PLAYER_STATUS } from "../constants";

export default function piecesReducer(
  state: PlayerState,
  action: PlayerAction
) {
  switch (action.type) {
    case "AUDIO_PLAYED": {
      return {
        ...state,
        status: PLAYER_STATUS.PLAYING,
      };
    }
    case "AUDIO_PAUSED": {
      return {
        ...state,
        status: PLAYER_STATUS.PAUSED,
      };
    }
    case "AUDIO_LOADING": {
      return {
        ...state,
        status: PLAYER_STATUS.LOADING,
      };
    }
    case "AUDIO_TOGGLED": {
      return {
        ...state,
        status:
          state.status === PLAYER_STATUS.PLAYING
            ? PLAYER_STATUS.PAUSED
            : PLAYER_STATUS.PLAYING,
      };
    }

    case "TRACK_DATA_SET": {
      return {
        ...state,
        data: action.payload,
      };
    }
    case "PLAYER_OPENED": {
      return {
        ...state,
        isOpened: true,
      };
    }

    case "PLAYER_TERMINATED": {
      return {
        status: PLAYER_STATUS.PAUSED,
        data: null,
        isOpened: false,
      };
    }
  }
}
