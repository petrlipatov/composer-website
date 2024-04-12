import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../../components/Logo/Logo";
import Tag from "../../../components/Tag/Tag";

import { GENRES_PROJECTS, PROJECTS } from "../../../utils/constants";
import closeIconSrc from "../../../assets/images/close-icon.svg";
import tvIconSrc from "../../../assets/images/tv.svg";
import hedphonesIconSrc from "../../../assets/images/headphone50.svg";
// import hedphonesIconSrc from "../../assets/images/headphone50.svg";

import cn from "classnames";
import s from "./FeaturedWork.module.css";
import Project from "../../../components/Project/Project";

function FeaturedWorkMobile() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [projectSelected, setSelectedProject] = useState<number>(null);

  const audioPlayerRef = useRef<HTMLAudioElement>();
  // const filteredPieces = useMemo(
  //   () => filterPiecesByTags(selectedTags, PROJECTS),
  //   [selectedTags]
  // );

  // function filterPiecesByTags(
  //   selectedTags: string[],
  //   pieces: AudioTrackData[]
  // ) {
  //   return pieces.filter((piece) => {
  //     return selectedTags.every((tag) => piece.tags.includes(tag));
  //   });
  // }

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

        <audio preload="none" ref={audioPlayerRef}>
          <source src={""} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <div className={s.projectsSection}>
          {PROJECTS.map((project, index) => (
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
