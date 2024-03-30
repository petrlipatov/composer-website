import { useState } from "react";
import Logo from "../../../components/Logo/Logo";
import { GENRES_PIECES, PIECES } from "../../../utils/constants";
import s from "./PiecesMobile.module.css";
import Tag from "../../../components/Tag/Tag";
import AudioTrack from "../../../components/AudioTrack/AudioTrack";

function PiecesMobile() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<number>(null);

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
    setSelectedTags([]);
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
              Clear All
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

export default PiecesMobile;
