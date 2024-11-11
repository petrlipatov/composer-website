import { useCallback, useContext, useMemo, useRef, useState } from "react";

import { Project } from "../Project";
import { FeaturedWorkContext } from "../FeaturedWorkContext";

import {
  generateElementsForSingleRow,
  getContentHeight,
  getElementHeight,
  getElementWidth,
} from "@/utils/helpers/virtualizedList";
import { useIsMobile } from "@/utils/hooks/useIsMobile";
import { useWidthResizeListener } from "@/utils/hooks/useWidthResizeListener";

import {
  PROJECT_LEFT_MARGIN_MOBILE,
  PROJECT_LEFT_MARGIN_DESKTOP,
  TABLE_COLUMNS_MOBILE,
  TABLE_COLUMNS_DESKTOP,
  PROJECT_ASPECT_RATIO_MOBILE,
  PROJECT_ASPECT_RATIO_DESKTOP,
  PROJECT_TOP_MARGIN_MOBILE,
  PROJECT_TOP_MARGIN_DESKTOP,
  SCROLL_WIDTH_MOBILE,
  SCROLL_WIDTH_DESKTOP,
} from "../../_constants";

import s from "./Projects.module.css";

export function Projects() {
  const [sectionWidth, setSectionWidth] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const {
    player,
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

  const tableColumnGapsCount = tableColumnsCount - 1;

  const projectAspectRatio = isMobile
    ? PROJECT_ASPECT_RATIO_MOBILE
    : PROJECT_ASPECT_RATIO_DESKTOP;

  const projectLeftMargin = isMobile
    ? PROJECT_LEFT_MARGIN_MOBILE
    : PROJECT_LEFT_MARGIN_DESKTOP;

  const projectTopMargin = isMobile
    ? PROJECT_TOP_MARGIN_MOBILE
    : PROJECT_TOP_MARGIN_DESKTOP;

  const scrollWidth = isMobile ? SCROLL_WIDTH_MOBILE : SCROLL_WIDTH_DESKTOP;

  const sectionWidthWithoutScroll = sectionWidth - scrollWidth;

  // Calculate project dimensions

  const projectWidth = getElementWidth(
    sectionWidthWithoutScroll,
    projectLeftMargin,
    tableColumnGapsCount,
    tableColumnsCount
  );

  const projectHeight = getElementHeight(
    projectWidth,
    projectAspectRatio,
    projectTopMargin
  );

  // Calculate content dimensions

  const projectsTotalCount = filteredProjects.length;

  const contentHeight = getContentHeight(
    projectsTotalCount,
    projectHeight,
    tableColumnsCount
  );

  // Calculate visible content dimensions

  const visibleRowsSliceStartIndex = useMemo(
    () => Math.max(0, Math.floor(scrollTop / projectHeight)),
    [scrollTop, projectHeight]
  );

  const visibleRowsSliceEndIndex = visibleRowsSliceStartIndex + 3;

  const setSelectedProjectIndexCached = useCallback(setSelectedProjectIndex, [
    setSelectedProjectIndex,
  ]);

  const generateProjectElement = useCallback(
    (project, projectIndex, offsetFromTop, isRightElement) => (
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
          marginLeft: isRightElement ? `${projectLeftMargin}px` : null,
          marginTop: projectTopMargin,
        }}
      />
    ),
    [
      projectAspectRatio,
      projectLeftMargin,
      projectWidth,
      projectTopMargin,
      selectedProjectIndex,
      setSelectedProjectIndexCached,
    ]
  );

  const displayedProjects = useMemo(() => {
    // loop itarates over rows
    // and generates Projects for each row with generateProjectsForSingleRow()

    const result = [];
    for (
      let rowIndex = visibleRowsSliceStartIndex;
      rowIndex < visibleRowsSliceEndIndex;
      rowIndex++
    ) {
      const offsetFromTop = visibleRowsSliceStartIndex * projectHeight;
      result.push(
        ...generateElementsForSingleRow(
          rowIndex,
          offsetFromTop,
          tableColumnsCount,
          projectsTotalCount,
          filteredProjects,
          generateProjectElement
        )
      );
    }

    return result;
  }, [
    visibleRowsSliceEndIndex,
    visibleRowsSliceStartIndex,
    filteredProjects,
    projectHeight,
    projectsTotalCount,
    tableColumnsCount,
    generateProjectElement,
  ]);

  const handleScroll = (e) => setScrollTop(e.currentTarget.scrollTop);

  return (
    <section
      className={s.projects}
      onScroll={handleScroll}
      style={isMobile && player.isOpened ? { display: "none" } : {}}
    >
      <div
        className={s.projectsContainer}
        style={{
          position: "relative",
          height: `${contentHeight}px`,
        }}
        ref={sectionRef}
      >
        {displayedProjects}
      </div>
    </section>
  );
}
