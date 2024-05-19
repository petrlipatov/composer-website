import { memo } from "react";

import MobileProject from "./Mobile/MobileProject";
import DesktopProject from "./Desktop/DesktopProject";

import useIsMobile from "../../../../utils/hooks/useIsMobile";

import { ProjectProps } from "./types";

const Project = memo(
  ({ index, data, isSelected, setSelectedProjectIndex }: ProjectProps) => {
    const isMobile = useIsMobile();

    return (
      <div>
        {isMobile ? (
          <MobileProject
            index={index}
            data={data}
            isSelected={isSelected}
            setSelectedProjectIndex={setSelectedProjectIndex}
          />
        ) : (
          <DesktopProject
            index={index}
            data={data}
            isSelected={isSelected}
            setSelectedProjectIndex={setSelectedProjectIndex}
          />
        )}
      </div>
    );
  }
);

export default Project;
