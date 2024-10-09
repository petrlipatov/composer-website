import {
  createContext,
  Dispatch,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { ContextTypes, PlayerAction, trackData } from "../../_types";
import { PIECES, DEFAULT_CONTEXT } from "../../_constants";
import { PLAYER_STATUS } from "@/utils/constants";
import { piecesReducer as reducer } from "@/utils/reducers/pieces.reducer";

export const PlayerContext = createContext<ContextTypes>(DEFAULT_CONTEXT);
export const PlayerDispatchContext = createContext<Dispatch<PlayerAction>>(
  () => {}
);

export const PiecesContext = ({ children }) => {
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
        {children}
      </PlayerDispatchContext.Provider>
    </PlayerContext.Provider>
  );
};
