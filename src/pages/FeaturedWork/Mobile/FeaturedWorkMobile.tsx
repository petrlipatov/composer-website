import Logo from "../../../components/Logo/Logo";
import { GENRES_WORK, PIECES } from "../../../utils/constants";
import s from "./FeaturedWork.module.css";
// import React, { useRef, RefObject, useState, Suspense } from "react";
import { useState } from "react";

import Tag from "../../../components/Tag/Tag";
import AudioTrack from "../../../components/AudioTrack/AudioTrack";

function FeaturedWorkMobile() {
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
              setSelectedTrack={setSelectedTrack}
              selectedTrack={selectedTrack}
              index={index}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedWorkMobile;
