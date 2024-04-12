import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../../components/Logo/Logo";
import Tag from "../../../components/Tag/Tag";

import { GENRES_PROJECTS, PROJECTS } from "../../../utils/constants";
import closeIconSrc from "../../../assets/images/close-icon.svg";

import s from "./FeaturedWork.module.css";

function FeaturedWorkMobile() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredPieces = useMemo(
    () => filterPiecesByTags(selectedTags, PROJECTS),
    [selectedTags]
  );

  function filterPiecesByTags(
    selectedTags: string[],
    pieces: AudioTrackData[]
  ) {
    return pieces.filter((piece) => {
      return selectedTags.every((tag) => piece.tags.includes(tag));
    });
  }

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  function handleClearTagsClick() {
    setSelectedTags([]);
  }

  const isTagSelected = (tag: string) => {
    return selectedTags.includes(tag);
  };

  //   const isTagDisabled = (tag: string) => {
  //     return !filteredPieces.some((piece) => piece.tags.includes(tag));
  //   };

  return (
    <div className={s.page}>
      <div className={s.content}>
        <div className={s.nav}>
          <Link to="/" className={s.pageTitle}>
            Projects
          </Link>
          <Logo />
        </div>

        <div className={s.tagsSection}>
          <div className={s.tagsList}>
            {GENRES_PROJECTS.map((genre, i) => (
              <Tag
                name={genre}
                isSelected={isTagSelected(genre)}
                isDisabled={false}
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

        <div className={s.projectsSection}>
          {PROJECTS.map((project, index) => (
            <div className={s.projectContainer} key={index}>
              <img
                className={s.projectImage}
                src={project.imageSrc}
                alt="project artwork"
              />
              <div className={s.projectTitle}>{project.name}</div>
              <div className={s.projectDescription}>{project.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedWorkMobile;
