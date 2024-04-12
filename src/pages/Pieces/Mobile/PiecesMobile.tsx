import { Suspense, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";

import AudioPlayer from "../../../components/AudioPlayer/AudioPlayer";
import AudioTrack from "../../../components/AudioTrack/AudioTrack";
import Logo from "../../../components/Logo/Logo";
import Modal from "../../../components/Modal/Modal";
import Preloader from "../../../components/Preloader/Preloader";
import Tag from "../../../components/Tag/Tag";
import YouTubePlayer from "../../../components/YoutubePlayer/YoutubePlayer";
import { AudioTrackData } from "../../../types";

import {
  GENRES_PIECES,
  PIECES,
  NO_TRACKS_FOUND_WARNING,
} from "../../../utils/constants";
import closeIconSrc from "../../../assets/images/close-icon.svg";

import s from "./PiecesMobile.module.css";

export type PlayingAudioData = {
  index: number;
  name: string;
  imageSource: string;
  videoSource: string;
};

function PiecesMobile() {
  const [videoId, setVideoId] = useState<string>("");
  const [isVideoPopupOpened, setVideoPopupState] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<number>(null);

  const [isPlayerOpened, setIsPlayerOpened] = useState(false);
  const [playingAudioData, setPlayingAudioData] = useState<
    PlayingAudioData | undefined
  >();

  const audioPlayerRef = useRef<HTMLAudioElement>();

  const filteredPieces = useMemo(
    () => filterPiecesByTags(selectedTags, PIECES),
    [selectedTags]
  );

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  function handleClearTagsClick() {
    setSelectedTrack(null);
    setSelectedTags([]);
  }

  const isTagSelected = (tag: string) => {
    return selectedTags.includes(tag);
  };

  const isTagDisabled = (tag: string) => {
    return !filteredPieces.some((piece) => piece.tags.includes(tag));
  };

  function filterPiecesByTags(
    selectedTags: string[],
    pieces: AudioTrackData[]
  ) {
    return pieces.filter((piece) => {
      return selectedTags.every((tag) => piece.tags.includes(tag));
    });
  }

  function openVideoPopup() {
    setVideoPopupState(true);
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
            <div className={s.tagsButton} onClick={handleClearTagsClick}>
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
          {filteredPieces.length > 0 ? (
            filteredPieces.map((track, index) => (
              <AudioTrack
                index={index}
                data={track}
                setPlayingAudioData={setPlayingAudioData}
                setVideoId={setVideoId}
                openPopup={openVideoPopup}
                setIsPlayerOpened={setIsPlayerOpened}
                isSelected={selectedTrack === index}
                setSelectedTrack={setSelectedTrack}
                ref={audioPlayerRef}
                key={index}
              />
            ))
          ) : (
            <div>{NO_TRACKS_FOUND_WARNING}</div>
          )}
        </div>
      </div>

      <AudioPlayer
        isPlayerOpened={isPlayerOpened}
        setIsPlayerOpened={setIsPlayerOpened}
        playingAudioData={playingAudioData}
        setPlayingAudioData={setPlayingAudioData}
        setSelectedTrack={setSelectedTrack}
        setVideoId={setVideoId}
        openPopup={openVideoPopup}
        filteredPieces={filteredPieces}
        ref={audioPlayerRef}
      />

      {isVideoPopupOpened && (
        <Modal setPopupState={setVideoPopupState}>
          <Suspense fallback={<Preloader content={"🐥"} />}>
            <YouTubePlayer videoId={videoId} />
          </Suspense>
        </Modal>
      )}
    </div>
  );
}

export default PiecesMobile;
