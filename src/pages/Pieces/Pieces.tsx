import {
  useState,
  useRef,
  useMemo,
  createContext,
  useEffect,
  useCallback,
} from "react";

import AudioPlayer from "./Sections/AudioPlayer/AudioPlayer";
import Header from "../../components/Header/Header";
import HTMLAudioTag from "../../components/HTMLAudioTag/HTMLAudioTag";
import VideoPopup from "../../components/VideoPopup/VideoPopup";

import Tags from "./Sections/Tags/Tags";
import AudioTracks from "./Sections/AudioTracks/AudioTracks";

import { PIECES, DEFAULT_CONTEXT, PLAYER_STATE } from "./_constants";

import { trackData, ContextTypes, playerState } from "./_types";

import s from "./Pieces.module.css";
import { PAGES } from "../../utils/constants";
import { setIsLoading, setIsPlaying } from "../../utils/helpers/piecesPlayer";

export const PiecesContext = createContext<ContextTypes>(DEFAULT_CONTEXT);

function Pieces() {
  const [videoID, setVideoID] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredPieces, setFilteredPieces] = useState<trackData[]>([]);
  const [isVideoPopupOpened, setIsVideoPopupOpened] = useState(false);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(null);
  const [isUserScrubbing, setIsUserScrubbing] = useState<boolean>(false);

  const [buffered, setBuffered] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  const [player, setPlayer] = useState<playerState>({
    status: PLAYER_STATE.Paused,
    src: "",
    data: null,
    isOpened: false,
  });

  const audioPlayerRef = useRef<HTMLAudioElement>();

  const onScrubberChange = useCallback((e) => {
    setIsUserScrubbing(true);
    const newTime = e.target.value;
    audioPlayerRef.current.currentTime = newTime;
    setTimeout(() => {
      setIsUserScrubbing(false);
    }, 300);
  }, []);

  const contextValue = useMemo(
    () => ({
      videoID,
      selectedTags,
      filteredPieces,
      isVideoPopupOpened,
      selectedTrackIndex,
      player,
      buffered,
      elapsed,
      duration,
      isUserScrubbing,
      setVideoID,
      setSelectedTags,
      setIsVideoPopupOpened,
      setSelectedTrackIndex,
      setPlayer,
      onScrubberChange,
    }),
    [
      videoID,
      selectedTags,
      filteredPieces,
      isVideoPopupOpened,
      selectedTrackIndex,
      player,
      buffered,
      elapsed,
      duration,
      isUserScrubbing,
      setPlayer,
      setVideoID,
      setSelectedTags,
      setIsVideoPopupOpened,
      setSelectedTrackIndex,
      onScrubberChange,
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

  useEffect(
    function togglePlayerPlayPause() {
      switch (player.status) {
        case PLAYER_STATE.Playing:
          if (!audioPlayerRef.current.src.includes(player.src)) {
            audioPlayerRef.current.src = player.src;
          }
          audioPlayerRef.current.play();
          break;
        case PLAYER_STATE.Paused:
          audioPlayerRef.current.pause();
          break;
      }
    },
    [player]
  );

  useEffect(function listenBufferedAndElapsedProgress() {
    const audioPlayer = audioPlayerRef.current;

    function updateBufferedAndElapsedTime() {
      const currentTime = Math.round(audioPlayer.currentTime);
      const bufferedRanges = audioPlayer.buffered;
      const hasBufferedRanges = bufferedRanges && bufferedRanges.length > 0;

      if (hasBufferedRanges) {
        const lastBufferedIndex = bufferedRanges.length - 1;
        const bufferedEndTime = Math.round(
          bufferedRanges.end(lastBufferedIndex)
        );
        if (currentTime <= bufferedEndTime) {
          setBuffered(bufferedEndTime);
          setElapsed(currentTime);
        } else {
          audioPlayer.currentTime = bufferedEndTime;
          setElapsed(bufferedEndTime);
          setBuffered(bufferedEndTime);
        }
      }
    }

    if (audioPlayer) {
      audioPlayer.onloadedmetadata = () => {
        setDuration(audioPlayer.duration);
        setElapsed(0);
        setBuffered(0);
      };
      audioPlayer.ontimeupdate = updateBufferedAndElapsedTime;
      audioPlayer.onwaiting = () => setIsLoading(setPlayer);
      audioPlayer.onplaying = () => setIsPlaying(setPlayer);
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
  }, []);

  return (
    <PiecesContext.Provider value={contextValue}>
      <div className={s.page}>
        <div className={s.content}>
          <Header>{PAGES.pieces}</Header>
          <Tags />
          <AudioTracks />
        </div>

        <HTMLAudioTag ref={audioPlayerRef} />

        {player.isOpened && <AudioPlayer />}

        {isVideoPopupOpened && (
          <VideoPopup
            videoID={videoID}
            setIsVideoPopupOpened={setIsVideoPopupOpened}
          />
        )}
      </div>
    </PiecesContext.Provider>
  );
}

export default Pieces;
