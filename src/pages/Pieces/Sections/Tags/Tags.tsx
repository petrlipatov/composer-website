import { useContext } from "react";

import Tag from "../../../../components/Tags/Tag/Tag";
import ClearButton from "../../../../components/Tags/ClearButton/ClearButton";

import { PiecesContext } from "../../Pieces";

import { PIECES_GENRES } from "../../_constants";

import s from "./Tags.module.css";
import { terminatePlayer } from "../../../../utils/helpers/piecesPlayer";

function Tags() {
  const {
    selectedTags,
    filteredPieces,
    setSelectedTags,
    setSelectedTrackIndex,
    setPlayer,
  } = useContext(PiecesContext);

  const handleTagClick = (tag: string) => {
    setSelectedTrackIndex(null);
    terminatePlayer(setPlayer);
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleClearTagsClick = () => {
    setSelectedTags([]);
  };

  const isButtonDisabled = (selectedTags) => {
    return selectedTags.length === 0;
  };

  const isTagSelected = (tag: string) => {
    return selectedTags.includes(tag);
  };

  const isTagDisabled = (tag: string) => {
    return !filteredPieces.some((project) => project.tags.includes(tag));
  };

  return (
    <section className={s.tags}>
      <div className={s.tagsList}>
        {PIECES_GENRES.map((genre, i) => (
          <Tag
            isSelected={isTagSelected(genre)}
            isDisabled={isTagDisabled(genre)}
            onClick={() => handleTagClick(genre)}
            key={i}
          >
            {genre}
          </Tag>
        ))}
        <ClearButton
          isDisabled={isButtonDisabled(selectedTags)}
          handleClearTagsClick={handleClearTagsClick}
        />
      </div>
    </section>
  );
}

export default Tags;
