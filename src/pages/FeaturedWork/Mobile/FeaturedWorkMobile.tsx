import Logo from "../../../components/Logo/Logo";
import { GENRES_WORK, PIECES } from "../../../utils/constants";
import s from "./FeaturedWork.module.css";
// import React, { useRef, RefObject, useState, Suspense } from "react";
import { Suspense, useState } from "react";

import Tag from "../../../components/Tag/Tag";
import AudioTrack from "../../../components/AudioTrack/AudioTrack";
import Modal from "../../../components/Modal/Modal";
import YouTubePlayer from "../../../components/YoutubePlayer/YoutubePlayer";
import Preloader from "../../../components/Preloader/Preloader";

function FeaturedWorkMobile() {
  const [isPopupOpened, setPopupState] = useState(false);
  const [videoId, setVideoId] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<number>(null);

  function filterPiecesByTags(selectedTags, pieces) {
    return pieces.filter((piece) => {
      return selectedTags.every((tag) => piece.tags.includes(tag));
    });
  }

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
            {GENRES_WORK.map((genre, i) => (
              <Tag
                name={genre}
                isSelected={isTagSelected(genre)}
                onClick={() => handleTagClick(genre)}
                key={i}
              />
            ))}
            <button className={s.tagsButton} onClick={clearTags}>
              Clear all
            </button>
          </div>
        </div>

        <div className={s.tracksSection}>
          {filteredPieces.map((track, index) => (
            <AudioTrack
              name={track.name}
              imageSource={track.src}
              openPopup={openPopup}
              setSelectedTrack={setSelectedTrack}
              selectedTrack={selectedTrack}
              index={index}
              key={index}
              setVideoId={setVideoId}
              youtubeId={"u0dBG0AL3Cs"}
            />
          ))}
        </div>
      </div>
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

export default FeaturedWorkMobile;
