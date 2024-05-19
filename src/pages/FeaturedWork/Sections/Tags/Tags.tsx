import { useContext } from "react";

import { FeaturedWorkContext } from "../../FeaturedWork";

import { PROJECTS_GENRES } from "../../../../utils/constants";
import closeIconSrc from "../../../../assets/images/close-icon.svg";

import s from "./Tags.module.css";
import Tag from "../../../../components/Tag/Tag";

function Tags() {
  const { selectedTags, filteredProjects, setIsPlayerOpened, setSelectedTags } =
    useContext(FeaturedWorkContext);

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
    return !filteredProjects.some((project) => project.tags.includes(tag));
  };

  return (
    <div className={s.section}>
      <div className={s.tagsList}>
        {PROJECTS_GENRES.map((genre, i) => (
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
