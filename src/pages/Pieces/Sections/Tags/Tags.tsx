import { useContext } from "react";

import { PiecesContext } from "../../Pieces";

import { PIECES_GENRES } from "../../../../utils/constants";
import closeIconSrc from "../../../../assets/images/close-icon.svg";

import s from "./Tags.module.css";
import Tag from "../../../../components/Tag/Tag";

function Tags() {
  const { selectedTags, filteredPieces, setIsPlayerOpened, setSelectedTags } =
    useContext(PiecesContext);

  const handleTagClick = (tag: string) => {
    setIsPlayerOpened(false);
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleClearTagsClick = () => {
    setSelectedTags([]);
  };

  const isTagSelected = (tag: string) => {
    return selectedTags.includes(tag);
  };

  const isTagDisabled = (tag: string) => {
    return !filteredPieces.some((project) => project.tags.includes(tag));
  };

  return (
    <div className={s.tagsSection}>
      <div className={s.tagsList}>
        {PIECES_GENRES.map((genre, i) => (
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
  );
}

export default Tags;
