import { memo } from "react";

import MobileProject from "./Mobile/MobileProject";
import DesktopProject from "./Desktop/DesktopProject";

import useIsMobile from "../../../../utils/hooks/useIsMobile";

import { ProjectProps } from "./types";

const Project = memo(
  ({
    index,
    data,
    isSelected,
    styles,
    setSelectedProjectIndex,
  }: ProjectProps) => {
    const isMobile = useIsMobile();

    return (
      <div style={{ ...styles }}>
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
