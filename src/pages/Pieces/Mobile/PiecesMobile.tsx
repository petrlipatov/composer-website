import { Suspense, useState } from "react";
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

function PiecesMobile() {
  const [isPlayerOpened, setIsPlayerOpened] = useState(false);
  const [isPopupOpened, setPopupState] = useState(false);
  const [videoId, setVideoId] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<number>(null);
  const [selectedTrackAudioSrc, setSelectedTrackAudioSrc] =
    useState<number>(null);

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

  function openPopup() {
    setPopupState(true);
  }

  const filteredPieces = filterPiecesByTags(selectedTags, PIECES);

  return (
    <div className={s.page}>
      <div className={s.content}>
        <Logo />
        <div className={s.tagsSection}>
          <div className={s.tagsList}>
            {GENRES_PIECES.map((genre, i) => (
              <Tag
                name={genre}
                isSelected={isTagSelected(genre)}
                onClick={() => handleTagClick(genre)}
                key={i}
              />
            ))}
            <button className={s.tagsButton} onClick={clearTags}>
              <img className={s.closeIcon} src={closeIconSrc} />
              No filter
            </button>
          </div>
        </div>
        <div className={s.tracksSection}>
          {filteredPieces.map((track, index) => (
            <AudioTrack
              name={track.name}
              imageSource={track.src}
              setSelectedTrack={setSelectedTrack}
              setIsPlayerOpened={setIsPlayerOpened}
              selectedTrack={selectedTrack}
              setVideoId={setVideoId}
              openPopup={openPopup}
              index={index}
              key={index}
              youtubeId={"u0dBG0AL3Cs"}
              setSelectedTrackAudioSrc={setSelectedTrackAudioSrc}
            />
          ))}
        </div>
      </div>
      <AudioPlayer
        isPlayerOpened={isPlayerOpened}
        setIsPlayerOpened={setIsPlayerOpened}
        audioSrc={selectedTrackAudioSrc}
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
