import {
  useState,
  createContext,
  useEffect,
  useReducer,
  useMemo,
  Dispatch,
} from "react";

import AudioPlayer from "./Sections/AudioPlayer/AudioPlayer";
import Header from "../../components/Header/Header";
import VideoPopup from "../../components/VideoPopup/VideoPopup";

import Tags from "./Sections/Tags/Tags";
import AudioTracks from "./Sections/AudioTracks/AudioTracks";

import { PAGES, PLAYER_STATUS } from "../../utils/constants";
import { PIECES, DEFAULT_CONTEXT } from "./_constants";

import { trackData, ContextTypes, PlayerState, PlayerAction } from "./_types";

import s from "./Pieces.module.css";

export const PlayerContext = createContext<ContextTypes>(DEFAULT_CONTEXT);
export const PlayerDispatchContext = createContext<Dispatch<PlayerAction>>(
  () => {}
);

function reducer(state: PlayerState, action: PlayerAction) {
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

function Pieces() {
  const [videoID, setVideoID] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredPieces, setFilteredPieces] = useState<trackData[]>([]);
  const [isVideoPopupOpened, setIsVideoPopupOpened] = useState(false);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(null);

  const [player, dispatchPlayerAction] = useReducer(reducer, {
    status: PLAYER_STATUS.PAUSED,
    data: null,
    isOpened: false,
  });

  const contextValue = useMemo(
    () => ({
      videoID,
      selectedTags,
      filteredPieces,
      isVideoPopupOpened,
      selectedTrackIndex,
      player,
      setVideoID,
      setSelectedTags,
      setIsVideoPopupOpened,
      setSelectedTrackIndex,
      dispatchPlayerAction,
    }),
    [
      player,
      filteredPieces,
      isVideoPopupOpened,
      selectedTags,
      selectedTrackIndex,
      videoID,
    ]
  );

  useEffect(
    function filterPiecesByTags() {
      const filteredPieces = PIECES.filter((piece) =>
        selectedTags.every((tag) => piece.tags.includes(tag))
      );
      setFilteredPieces(filteredPieces);
    },
    [selectedTags]
  );

  return (
    <PlayerContext.Provider value={contextValue}>
      <PlayerDispatchContext.Provider value={dispatchPlayerAction}>
        <div className={s.page}>
          <div className={s.content}>
            <Header>{PAGES.pieces}</Header>
            <Tags />
            <AudioTracks />
          </div>

          {player.isOpened && <AudioPlayer />}

          {isVideoPopupOpened && (
            <VideoPopup
              videoID={videoID}
              setIsVideoPopupOpened={setIsVideoPopupOpened}
            />
          )}
        </div>
      </PlayerDispatchContext.Provider>
    </PlayerContext.Provider>
  );
}

export default Pieces;
