import { useMemo, useRef, useState, Suspense } from "react";
import { Link } from "react-router-dom";

import Logo from "../../components/Logo/Logo";
import Tag from "../../components/Tag/Tag";
import Project from "../../components/Project/Project";
import ExtendedAudioPlayer from "../../components/ExtendedAudioPlayer/ExtendedAudioPlayer";
import Modal from "../../components/Modal/Modal";
import Preloader from "../../components/Preloader/Preloader";
import YouTubePlayer from "../../components/YoutubePlayer/YoutubePlayer";

import { ProjectData } from "../../types";

import { PROJECTS, PROJECTS_GENRES } from "../../utils/constants";
import closeIconSrc from "../../assets/images/close-icon.svg";

import s from "./FeaturedWork.module.css";

function FeaturedWork() {
  const [videoId, setVideoId] = useState<string>("");
  const [isVideoPopupOpened, setVideoPopupState] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<number>(null);
  const [projectData, setProjectData] = useState<ProjectData | undefined>();
  const [isPlayerOpened, setIsPlayerOpened] = useState(false);

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
    setIsPlayerOpened(false);
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  function handleClearTagsClick() {
    setSelectedTags([]);
  }

  function openVideoModal() {
    setVideoPopupState(true);
  }

  const isTagSelected = (tag: string) => {
    return selectedTags.includes(tag);
  };

  const isTagDisabled = (tag: string) => {
    return !filteredProjects.some((project) => project.tags.includes(tag));
  };

  return (
    <div className={s.page}>
      <div
        className={s.content}
        style={
          isPlayerOpened
            ? { gridTemplateRows: "min-content min-content", height: "auto" }
            : {}
        }
      >
        <div className={s.nav}>
          <Link to="/" className={s.pageTitle}>
            Featured Work
          </Link>
          <Logo />
        </div>

        <div className={s.tagsSection}>
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

        <audio preload="metadata" ref={audioPlayerRef}>
          <source src={""} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <div
          className={s.projectsSection}
          style={isPlayerOpened ? { display: "none" } : {}}
        >
          {filteredProjects.map((project, index) => (
            <Project
              data={project}
              isSelected={selectedProject === index}
              setSelectedProject={setSelectedProject}
              setProjectData={setProjectData}
              setIsPlayerOpened={setIsPlayerOpened}
              setVideoId={setVideoId}
              openVideoModal={openVideoModal}
              index={index}
              key={index}
            />
          ))}
        </div>
      </div>

      {isPlayerOpened && (
        <ExtendedAudioPlayer
          isPlayerOpened={isPlayerOpened}
          projectData={projectData}
          setIsPlayerOpened={setIsPlayerOpened}
          setVideoId={setVideoId}
          openVideoModal={openVideoModal}
          ref={audioPlayerRef}
        />
      )}

      {isVideoPopupOpened && (
        <Modal setPopupState={setVideoPopupState}>
          <Suspense fallback={<Preloader content={"🐥"} />}>
            <YouTubePlayer videoId={videoId} />
          </Suspense>
        </Modal>
      )}
    </div>
  );
}

export default FeaturedWork;
