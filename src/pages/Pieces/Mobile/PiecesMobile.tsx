import { Suspense, useState, useRef, createContext } from "react";
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
import chevronIconSrc from "../../../assets/images/chevron-down.svg";

export const PlayerContext = createContext(undefined);

function PiecesMobile() {
  const [videoId, setVideoId] = useState<string>("");
  const [isPopupOpened, setPopupState] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<number>(null);

  const [isPlayerOpened, setIsPlayerOpened] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playingAudioTitle, setPlayingAudioTitle] = useState<string>("");
  const [duration, setDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const audioPlayerRef = useRef<HTMLAudioElement>();

  // tags controllers

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

  function filterPiecesByTags(selectedTags, pieces) {
    return pieces.filter((piece) => {
      return selectedTags.every((tag) => piece.tags.includes(tag));
    });
  }

  function clearTags() {
    setSelectedTrack(null);
    setSelectedTags([]);
  }

  // video popup

  function openPopup() {
    setPopupState(true);
  }

  // audio player controllers

  const onLoadedMetadata = () => {
    setDuration(audioPlayerRef.current.duration);
  };

  const onTimeUpdate = () => {
    if (elapsedTime <= duration) {
      setElapsedTime(audioPlayerRef.current.currentTime);
    }
  };

  const onEnded = () => {
    setElapsedTime(0);
    // setIsPlaying(!isPlaying);
  };

  const filteredPieces = filterPiecesByTags(selectedTags, PIECES);

  const isTagDisables = (tag: string) => {
    for (const piece of filteredPieces) {
      if (piece.tags.includes(tag)) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className={s.page}>
      <div className={s.content}>
        <div className={s.nav}>
          <div className={s.pageTitleContainer}>
            <div className={s.pageTitle}>Pieces</div>
            {/* <img
              className={s.pageTitleIcon}
              src={chevronIconSrc}
              alt="chevron-down"
            /> */}
          </div>
          <Logo />
        </div>

        <div className={s.tagsSection}>
          <div className={s.tagsList}>
            {GENRES_PIECES.map((genre, i) => (
              <Tag
                name={genre}
                isSelected={isTagSelected(genre)}
                isDisabled={isTagDisables(genre)}
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
          onPlaying={() => setIsLoading(false)}
          onWaiting={() => setIsLoading(true)}
          onEnded={onEnded}
        >
          <source src={"/audio/Theory-of-Light-Master.mp3"} type="audio/mpeg" />
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
              setPlayingAudioTitle={setPlayingAudioTitle}
              setIsPlayerOpened={setIsPlayerOpened}
              selectedTrack={selectedTrack}
              setVideoId={setVideoId}
              openPopup={openPopup}
              isAudioPlaying={isAudioPlaying}
              playingAudioTitle={playingAudioTitle}
              setIsAudioPlaying={setIsAudioPlaying}
              index={index}
              key={index}
              ref={audioPlayerRef}
            />
          ))}
        </div>
      </div>

      <AudioPlayer
        duration={duration}
        elapsedTime={elapsedTime}
        isLoading={isLoading}
        playingAudioTitle={playingAudioTitle}
        isPlayerOpened={isPlayerOpened}
        setIsPlayerOpened={setIsPlayerOpened}
        isAudioPlaying={isAudioPlaying}
        setIsAudioPlaying={setIsAudioPlaying}
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
