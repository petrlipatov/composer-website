import { memo } from "react";

import { useIsMobile } from "@/utils/hooks/useIsMobile";
import { MobileProject } from "./Mobile/MobileProject";
import { DesktopProject } from "./Desktop/DesktopProject";
import { ProjectProps } from "./types";

import s from "./Project.module.css";

export const Project = memo(
  ({
    index,
    data,
    isSelected,
    customStyles,
    setSelectedProjectIndex,
  }: ProjectProps) => {
    const isMobile = useIsMobile();

    return (
      <div className={s.project} style={{ ...customStyles }}>
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
