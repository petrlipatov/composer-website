import { useState } from "react";
import Logo from "../../../components/Logo/Logo";
import { GENRES_PIECES, PIECES } from "../../../utils/constants";
import s from "./PiecesMobile.module.css";
import Tag from "../../../components/Tag/Tag";
import tvIconSrc from "../../../assets/images/tv.svg";
import hedphonesIconSrc from "../../../assets/images/headphones.svg";

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
              <div className={s.track} key={i}>
                <div className={s.trackImageContainer}>
                  <img className={s.trackImage} src={track.src} />
                  <div className={s.trackImageMask}>
                    <div className={s.imageMaskButtonLeft}>
                      <img className={s.imageMaskIcon} src={hedphonesIconSrc} />
                      <div>Listen</div>
                    </div>
                    <div className={s.imageMaskButtonRight}>
                      <img className={s.imageMaskIcon} src={tvIconSrc} />
                      <div>Watch</div>
                    </div>
                  </div>
                </div>
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
