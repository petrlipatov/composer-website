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

export type PlayingAudioData = {
  index: number;
  name: string;
  imageSource: string;
  videoSource: string;
};

function PiecesMobile() {
  const [videoId, setVideoId] = useState<string>("");
  const [isPopupOpened, setPopupState] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<number>(null);

  const [isPlayerOpened, setIsPlayerOpened] = useState(false);
  const [playingAudioData, setPlayingAudioData] = useState<PlayingAudioData>();

  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlayerOpened: false,
    isLoading: false,
    isAudioPlaying: false,
    duration: 0,
    elapsedTime: 0,
    playingAudioIndex: 0,
    playingAudioTitle: "",
    playingAudioImageSrc: "",
  });

  const filteredPieces = useMemo(
    () => filterPiecesByTags(selectedTags, PIECES),
    [selectedTags]
  );
  const audioPlayerRef = useRef<HTMLAudioElement>();

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

  const isTagDisabled = (tag: string) => {
    for (const piece of filteredPieces) {
      if (piece.tags.includes(tag)) {
        return false;
      }
    }
    return true;
  };

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

        <audio preload="none" ref={audioPlayerRef}>
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
              setPlayingAudioData={setPlayingAudioData}
              setVideoId={setVideoId}
              openPopup={openPopup}
              playerState={playerState}
              setPlayerState={setPlayerState}
              setIsPlayerOpened={setIsPlayerOpened}
              selectedTrack={selectedTrack}
              setSelectedTrack={setSelectedTrack}
              index={index}
              key={index}
              ref={audioPlayerRef}
            />
          ))}
        </div>
      </div>

      <AudioPlayer
        isPlayerOpened={isPlayerOpened}
        setIsPlayerOpened={setIsPlayerOpened}
        playingAudioData={playingAudioData}
        setPlayingAudioData={setPlayingAudioData}
        setSelectedTrack={setSelectedTrack}
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
