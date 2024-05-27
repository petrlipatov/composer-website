import { useCallback, useContext } from "react";
import { FeaturedWorkContext } from "../../FeaturedWork";
import s from "./Projects.module.css";
import Project from "../Project/Project";
import useIsMobile from "../../../../utils/hooks/useIsMobile";

function Projects() {
  const {
    isPlayerOpened,
    filteredProjects,
    selectedProjectIndex,
    setSelectedProjectIndex,
  } = useContext(FeaturedWorkContext);
  const isMobile = useIsMobile();

  const setSelectedProjectIndexCached = useCallback(setSelectedProjectIndex, [
    setSelectedProjectIndex,
  ]);

  return (
    <div
      className={s.section}
      style={isMobile && isPlayerOpened ? { display: "none" } : {}}
    >
      {filteredProjects.map((project, index) => (
        <Project
          index={index}
          data={project}
          isSelected={selectedProjectIndex === index}
          setSelectedProjectIndex={setSelectedProjectIndexCached}
          key={project.name}
        />
      ))}
    </div>
  );
}

export default Projects;
