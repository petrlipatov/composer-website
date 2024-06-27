import { useContext } from "react";

import { FeaturedWorkContext } from "../../FeaturedWork";

import { PROJECTS_GENRES } from "../../_constants";

import s from "./Tags.module.css";
import Tag from "../../../../components/Tags/Tag/Tag";
import ClearButton from "../../../../components/Tags/ClearButton/ClearButton";

function Tags() {
  const {
    selectedTags,
    filteredProjects,
    audioPlayerRef,
    setIsPlayerOpened,
    setSelectedTags,
    setSelectedTrackIndex,
    setSelectedProjectIndex,
  } = useContext(FeaturedWorkContext);

  const audioPlayer = audioPlayerRef.current;

  const handleTagClick = (tag: string) => {
    audioPlayer.pause();
    setSelectedProjectIndex(null);
    setSelectedTrackIndex(null);
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
