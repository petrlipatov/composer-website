import { useContext } from "react";
import { FeaturedWorkPageContext } from "../../FeaturedWork";
import s from "./Projects.module.css";
import Project from "../../../../components/Project/Project";

function Projects() {
  const { isPlayerOpened, filteredProjects, selectedProjectIndex } = useContext(
    FeaturedWorkPageContext
  );

  return (
    <div
      className={s.projectsSection}
      style={isPlayerOpened ? { display: "none" } : {}}
    >
      {filteredProjects.map((project, index) => (
        <Project
          data={project}
          isSelected={selectedProjectIndex === index}
          index={index}
          key={index}
        />
      ))}
    </div>
  );
}

export default Projects;
