import { useState } from "react";
import Logo from "../../../components/Logo/Logo";
import { GENRES_PIECES, PIECES } from "../../../utils/constants";
import s from "./PiecesMobile.module.css";
import Tag from "../../../components/Tag/Tag";
// import { Link } from "react-router-dom";
// import nameSrc from "../../../assets/images/name.svg";
// import titleSrc from "../../../assets/images/title.svg";
// import logoSrc from "../../../assets/images/logo_vertical.png";
// import Toggler from "./Toggler/Toggler";
// import AudioTrack from "../../../components/AudioTrack/AudioTrack";
// import mp3Src from "../../../assets/Theory-of-Light-Master.mp3";
// import mp3Src2 from "../../../assets/Free_Test_Data_2MB_MP3.mp3";

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
              <div className={s.trackContainer}>
                <div
                  className={s.track}
                  key={i}
                  style={{ backgroundImage: `url(${track.src})` }}
                />
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
