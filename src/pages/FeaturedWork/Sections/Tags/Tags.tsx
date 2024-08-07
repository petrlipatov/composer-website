import { useContext } from "react";

import {
  FeaturedWorkContext,
  FeaturedWorkDispatchContext,
} from "../../FeaturedWork";

import { PROJECTS_GENRES } from "../../_constants";

import s from "./Tags.module.css";
import Tag from "../../../../components/Tags/Tag/Tag";
import ClearButton from "../../../../components/Tags/ClearButton/ClearButton";
import { EXTENDED_PLAYER_ACTION_TYPE } from "../../_types";

function Tags() {
  const {
    selectedTags,
    filteredProjects,
    setSelectedTags,
    setSelectedProjectIndex,
  } = useContext(FeaturedWorkContext);

  const dispatchPlayerAction = useContext(FeaturedWorkDispatchContext);

  const handleTagClick = (tag: string) => {
    setSelectedProjectIndex(null);
    dispatchPlayerAction({
      type: EXTENDED_PLAYER_ACTION_TYPE.PLAYER_TERMINATED,
    });
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
    return !filteredProjects.some((project) => project.tags.includes(tag));
  };

  return (
    <section className={s.tags}>
      <div className={s.tagsList}>
        {PROJECTS_GENRES.map((genre, i) => (
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
