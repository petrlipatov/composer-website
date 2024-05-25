import { Suspense, lazy } from "react";
import Preloader from "../../../../components/Preloader/Preloader";

const Projects = lazy(() => import("../Projects/Projects"));

const ProjectsSuspensed = () => {
  return (
    <Suspense fallback={<Preloader content={"🐝"} />}>
      <Projects />
    </Suspense>
  );
};

export default ProjectsSuspensed;
