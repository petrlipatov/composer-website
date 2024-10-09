import {
  ExtendedPlayerAction,
  ExtendedPlayerState,
  ProjectData,
  SelectedTrackIndex,
} from "../../pages/FeaturedWork/_types";
import { PLAYER_STATUS } from "../constants";

export function featuredReducer(
  state: ExtendedPlayerState,
  action: ExtendedPlayerAction
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
    case "PROJECT_DATA_SET": {
      return {
        ...state,
        data: action.payload as ProjectData,
      };
    }
    case "TRACK_SELECTED": {
      return {
        ...state,
        selectedTrackIndex: action.payload as SelectedTrackIndex,
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
        selectedTrackIndex: null,
      };
    }
  }
}
