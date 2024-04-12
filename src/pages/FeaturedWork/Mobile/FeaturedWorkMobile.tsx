import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../../components/Logo/Logo";
import Tag from "../../../components/Tag/Tag";

import { ProjectData } from "../../../types";

import { GENRES_PROJECTS, PROJECTS } from "../../../utils/constants";
import closeIconSrc from "../../../assets/images/close-icon.svg";

import s from "./FeaturedWork.module.css";
import Project from "../../../components/Project/Project";

function FeaturedWorkMobile() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [projectSelected, setSelectedProject] = useState<number>(null);

  const audioPlayerRef = useRef<HTMLAudioElement>();

  const filteredProjects = useMemo(
    () => filterProjectsByTags(selectedTags, PROJECTS),
    [selectedTags]
  );

  function filterProjectsByTags(
    selectedTags: string[],
    projects: ProjectData[]
  ) {
    return projects.filter((project) => {
      return selectedTags.every((tag) => project.tags.includes(tag));
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

  const isTagDisabled = (tag: string) => {
    return !filteredProjects.some((piece) => piece.tags.includes(tag));
  };

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

        <audio preload="none" ref={audioPlayerRef}>
          <source src={""} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <div className={s.projectsSection}>
          {filteredProjects.map((project, index) => (
            <Project
              data={project}
              isSelected={projectSelected === index}
              setSelectedProject={setSelectedProject}
              index={index}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedWorkMobile;
