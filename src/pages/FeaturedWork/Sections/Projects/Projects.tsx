import { useCallback, useContext, useState } from "react";
import { FeaturedWorkContext } from "../../FeaturedWork";
import s from "./Projects.module.css";
import Project from "../../../../components/Project/Project";

function Projects() {
  const [selectedProjectIndex, setSelectedProjectIndex] =
    useState<number>(null);

  const { isPlayerOpened, filteredProjects } = useContext(FeaturedWorkContext);

  const setSelectedProjectIndexCached = useCallback(setSelectedProjectIndex, [
    setSelectedProjectIndex,
  ]);

  return (
    <div
      className={s.projectsSection}
      style={isPlayerOpened ? { display: "none" } : {}}
    >
      {filteredProjects.map((project, index) => (
        <Project
          data={project}
          isSelected={selectedProjectIndex === index}
          setSelectedProjectIndex={setSelectedProjectIndexCached}
          index={index}
          key={project.name}
        />
      ))}
    </div>
  );
}

export default Projects;
