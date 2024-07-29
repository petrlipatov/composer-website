import { useCallback, useContext } from "react";

import Tag from "../../../../components/Tags/Tag/Tag";
import ClearButton from "../../../../components/Tags/ClearButton/ClearButton";

import { PlayerContext, PlayerDispatchContext } from "../../Pieces";

import { PIECES_GENRES } from "../../_constants";
import { PLAYER_ACTION_TYPE } from "../../_types";

import s from "./Tags.module.css";

function Tags() {
  const {
    selectedTags,
    filteredPieces,
    setSelectedTags,
    setSelectedTrackIndex,
  } = useContext(PlayerContext);

  const dispatchPlayerAction = useContext(PlayerDispatchContext);

  const handleTagClick = (tag: string) => {
    dispatchPlayerAction({ type: PLAYER_ACTION_TYPE.PLAYER_TERMINATED });
    setSelectedTrackIndex(null);
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleClearTagsClick = useCallback(() => {
    setSelectedTags([]);
  }, [setSelectedTags]);

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
