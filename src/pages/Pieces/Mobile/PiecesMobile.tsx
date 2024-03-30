import { useState } from "react";
import Logo from "../../../components/Logo/Logo";
import { GENRES_PIECES, PIECES } from "../../../utils/constants";
import s from "./PiecesMobile.module.css";
import Tag from "../../../components/Tag/Tag";
import img from "./../../../../public/images/track.webp";

function PiecesMobile() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
          </div>

          <div className={s.tracksSection}>
            {filteredPieces.map((track, i) => (
              <div className={s.trackContainer} key={i}>
                <img className={s.track} src={track.src} />
                <div>{track.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PiecesMobile;
