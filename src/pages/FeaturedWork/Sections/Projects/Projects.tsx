import useIsMobile from "../../../../utils/hooks/useIsMobile";
import { FeaturedWorkContext } from "../../FeaturedWork";
import s from "./Projects.module.css";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import Project from "../Project/Project";

import {
  PROJECT_LEFT_PADDING_MOBILE,
  PROJECT_LEFT_PADDING_DESKTOP,
  TABLE_COLUMNS_MOBILE,
  TABLE_COLUMNS_DESKTOP,
  PROJECT_ASPECT_RATIO_MOBILE,
  PROJECT_ASPECT_RATIO_DESKTOP,
} from "../../_constants";
import useWidthResizeListener from "../../../../utils/hooks/useWidthResizeListener";

export default function Projects() {
  const [sectionWidth, setSectionWidth] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const {
    isPlayerOpened,
    filteredProjects,
    selectedProjectIndex,
    setSelectedProjectIndex,
  } = useContext(FeaturedWorkContext);

  const sectionRef = useRef<HTMLDivElement>(null);

  useWidthResizeListener(sectionRef, setSectionWidth);

  // Determine table configuration based on device type

  const isMobile = useIsMobile();

  const tableColumnsCount = isMobile
    ? TABLE_COLUMNS_MOBILE
    : TABLE_COLUMNS_DESKTOP;

  const tableColumnGaps = tableColumnsCount - 1;

  const projectLeftPadding = isMobile
    ? PROJECT_LEFT_PADDING_MOBILE
    : PROJECT_LEFT_PADDING_DESKTOP;

  const projectAspectRatio = isMobile
    ? PROJECT_ASPECT_RATIO_MOBILE
    : PROJECT_ASPECT_RATIO_DESKTOP;

  // Calculate project dimensions

  const projectWidth =
    (sectionWidth - projectLeftPadding * tableColumnGaps) / tableColumnsCount;
  const projectHeight = projectWidth / projectAspectRatio;

  const projectsTotalCount = filteredProjects.length;
  const contentHeight =
    Math.ceil(projectsTotalCount / tableColumnsCount) * projectHeight;

  const visibleRowsStartIndex = useMemo(
    () => Math.max(0, Math.floor(scrollTop / projectHeight)),
    [scrollTop, projectHeight]
  );
  const visibleRowsEndIndex = visibleRowsStartIndex + 3;

  const setSelectedProjectIndexCached = useCallback(setSelectedProjectIndex, [
    setSelectedProjectIndex,
  ]);

  const displayedProjects = useMemo(() => {
    const generateProjectElement = (
      project,
      projectIndex,
      offsetFromTop,
      isRightElement
    ) => (
      <Project
        index={projectIndex}
        data={project}
        isSelected={selectedProjectIndex === projectIndex}
        setSelectedProjectIndex={setSelectedProjectIndexCached}
        key={project.name}
        customStyles={{
          transform: `translateY(${offsetFromTop}px)`,
          width: `${projectWidth}px`,
          aspectRatio: `${projectAspectRatio}`,
          marginLeft: isRightElement ? `${projectLeftPadding - 2}px` : null,
        }}
      />
    );

    const generateProjectsForSingleRow = (rowIndex, offsetFromTop) => {
      const rowOfProjects = [];
      for (let colIndex = 0; colIndex < tableColumnsCount; colIndex++) {
        const projectIndex = rowIndex * tableColumnsCount + colIndex;
        if (projectIndex < projectsTotalCount) {
          const project = filteredProjects[projectIndex];
          const isRightElement = colIndex !== 0;
          rowOfProjects.push(
            generateProjectElement(
              project,
              projectIndex,
              offsetFromTop,
              isRightElement
            )
          );
        }
      }
      return rowOfProjects;
    };

    // loop itarates over rows
    // and generates Projects for each row with generateProjectsForSingleRow()

    const result = [];
    for (
      let rowIndex = visibleRowsStartIndex;
      rowIndex < visibleRowsEndIndex;
      rowIndex++
    ) {
      const offsetFromTop = visibleRowsStartIndex * projectHeight;
      result.push(...generateProjectsForSingleRow(rowIndex, offsetFromTop));
    }

    return result;
  }, [
    projectHeight,
    visibleRowsEndIndex,
    visibleRowsStartIndex,
    filteredProjects,
    projectAspectRatio,
    projectLeftPadding,
    projectWidth,
    projectsTotalCount,
    selectedProjectIndex,
    setSelectedProjectIndexCached,
    tableColumnsCount,
  ]);

  function onScroll(event) {
    setScrollTop(event.currentTarget.scrollTop);
  }

  return (
    <div
      className={s.section}
      onScroll={onScroll}
      ref={sectionRef}
      style={isMobile && isPlayerOpened ? { display: "none" } : {}}
    >
      <div
        className={s.contentContainer}
        style={{
          position: "relative",
          height: `${contentHeight}px`,
        }}
      >
        {displayedProjects}
      </div>
    </div>
  );
}
