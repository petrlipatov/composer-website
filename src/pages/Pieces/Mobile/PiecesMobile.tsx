import { Suspense, useState, useRef, useMemo } from "react";
import Logo from "../../../components/Logo/Logo";
import { GENRES_PIECES, PIECES } from "../../../utils/constants";
import s from "./PiecesMobile.module.css";
import Tag from "../../../components/Tag/Tag";
import AudioTrack from "../../../components/AudioTrack/AudioTrack";
import Modal from "../../../components/Modal/Modal";
import YouTubePlayer from "../../../components/YoutubePlayer/YoutubePlayer";
import Preloader from "../../../components/Preloader/Preloader";
import AudioPlayer from "../../../components/AudioPlayer/AudioPlayer";
import closeIconSrc from "../../../assets/images/close-icon.svg";
import { AudioTrackData } from "../../../types";
import { Link } from "react-router-dom";

export type PlayerState = {
  isPlayerOpened: boolean;
  isLoading: boolean;
  isAudioPlaying: boolean;
  duration: number;
  elapsedTime: number;
  playingAudioTitle: string;
  playingAudioIndex: number;
  playingAudioImageSrc: string;
};

function PiecesMobile() {
  const [videoId, setVideoId] = useState<string>("");
  const [isPopupOpened, setPopupState] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<number>(null);

  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlayerOpened: false,
    isLoading: false,
    isAudioPlaying: false,
    duration: 0,
    elapsedTime: 0,
    playingAudioTitle: "",
    playingAudioIndex: 0,
    playingAudioImageSrc: "",
  });

  const audioPlayerRef = useRef<HTMLAudioElement>();

  // tags handlers & methods

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const isTagSelected = (tag: string) => {
    return selectedTags.includes(tag);
  };

  function clearTags() {
    setSelectedTrack(null);
    setSelectedTags([]);
  }

  function filterPiecesByTags(
    selectedTags: string[],
    pieces: AudioTrackData[]
  ) {
    return pieces.filter((piece) => {
      return selectedTags.every((tag) => piece.tags.includes(tag));
    });
  }

  const filteredPieces = useMemo(
    () => filterPiecesByTags(selectedTags, PIECES),
    [selectedTags]
  );

  const isTagDisabled = (tag: string) => {
    for (const piece of filteredPieces) {
      if (piece.tags.includes(tag)) {
        return false;
      }
    }
    return true;
  };

  // audio player event handlers

  const onLoadedMetadata = () => {
    setPlayerState({
      ...playerState,
      duration: audioPlayerRef.current.duration,
    });
  };

  const onTimeUpdate = () => {
    setPlayerState({
      ...playerState,
      elapsedTime: audioPlayerRef.current.currentTime,
    });
  };

  const onEnded = () => {
    setPlayerState({
      ...playerState,
      elapsedTime: 0,
    });
  };

  // video popup

  function openPopup() {
    setPopupState(true);
  }

  return (
    <div className={s.page}>
      <div className={s.content}>
        <div className={s.nav}>
          <Link to="/" className={s.pageTitle}>
            Pieces
          </Link>
          <Logo />
        </div>
        <div>{`${playerState.isAudioPlaying}`}</div>
        <div className={s.tagsSection}>
          <div className={s.tagsList}>
            {GENRES_PIECES.map((genre, i) => (
              <Tag
                name={genre}
                isSelected={isTagSelected(genre)}
                isDisabled={isTagDisabled(genre)}
                onClick={() => handleTagClick(genre)}
                key={i}
              />
            ))}
            <div className={s.tagsButton} onClick={clearTags}>
              <img className={s.closeIcon} src={closeIconSrc} />
              No filter
            </div>
          </div>
        </div>

        <audio
          preload="none"
          ref={audioPlayerRef}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onPlaying={() =>
            setPlayerState({
              ...playerState,
              isLoading: false,
            })
          }
          onWaiting={() =>
            setPlayerState({
              ...playerState,
              isLoading: true,
            })
          }
          onEnded={onEnded}
        >
          <source src={""} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <div className={s.tracksSection}>
          {filteredPieces.map((track, index) => (
            <AudioTrack
              name={track.name}
              imageSource={track.imageSrc}
              audioSource={track.audioSrc}
              videoSource={track.videoSrc}
              setSelectedTrack={setSelectedTrack}
              selectedTrack={selectedTrack}
              setVideoId={setVideoId}
              openPopup={openPopup}
              playerState={playerState}
              setPlayerState={setPlayerState}
              index={index}
              key={index}
              ref={audioPlayerRef}
            />
          ))}
        </div>
      </div>

      <AudioPlayer
        playerState={playerState}
        setPlayerState={setPlayerState}
        filteredPieces={filteredPieces}
        ref={audioPlayerRef}
      />

      {isPopupOpened && (
        <Modal setPopupState={setPopupState}>
          <Suspense fallback={<Preloader content={"🐥"} />}>
            <YouTubePlayer videoId={videoId} />
          </Suspense>
        </Modal>
      )}
    </div>
  );
}

export default PiecesMobile;
