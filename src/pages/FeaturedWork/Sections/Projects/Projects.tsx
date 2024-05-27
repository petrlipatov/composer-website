import useIsMobile from "../../../../utils/hooks/useIsMobile";
import { FeaturedWorkContext } from "../../FeaturedWork";
import s from "./Projects.module.css";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Project from "../Project/Project";
import { PORTRAIT_PROJECT_ASPECT_RATIO } from "../../../../utils/constants";
import {
  PROJECT_LEFT_PADDING_MOBILE,
  PROJECT_LEFT_PADDING_DESKTOP,
  TABLE_COLUMNS_MOBILE,
  TABLE_COLUMNS_DESKTOP,
} from "../../_constants";

export default function Projects() {
  const [sectionWidth, setSectionWidth] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const sectionRef = useRef(null);

  useEffect(function calculateSectionWidthOnMount() {
    if (sectionRef.current) {
      setSectionWidth(sectionRef.current.offsetWidth);
    }
  }, []);

  const {
    isPlayerOpened,
    filteredProjects,
    selectedProjectIndex,
    setSelectedProjectIndex,
  } = useContext(FeaturedWorkContext);

  const isMobile = useIsMobile();

  const tableColumnsCount = isMobile
    ? TABLE_COLUMNS_MOBILE
    : TABLE_COLUMNS_DESKTOP;

  const tableColumnGaps = tableColumnsCount - 1;

  const projectLeftPadding = isMobile
    ? PROJECT_LEFT_PADDING_MOBILE
    : PROJECT_LEFT_PADDING_DESKTOP;

  // const projectAspectRatio = isMobile
  //   ? PORTRAIT_PROJECT_ASPECT_RATIO
  //   : PORTRAIT_PROJECT_ASPECT_RATIO;

  const projectsCount = filteredProjects.length;

  const projectWidth =
    (sectionWidth - projectLeftPadding * tableColumnGaps) / tableColumnsCount;
  const projectHeight = projectWidth / PORTRAIT_PROJECT_ASPECT_RATIO;

  const contentHeight =
    Math.ceil(projectsCount / tableColumnsCount) * projectHeight;

  const visibleRowsStartIndex = useMemo(
    () => Math.max(0, Math.floor(scrollTop / projectHeight)),
    [scrollTop, projectHeight]
  );
  const visibleRowsEndIndex = visibleRowsStartIndex + 3;

  const setSelectedProjectIndexCached = useCallback(setSelectedProjectIndex, [
    setSelectedProjectIndex,
  ]);

  const displayedProjects = useMemo(() => {
    const result = [];

    // loop through table rows (filteredProjects / 2)
    for (
      let rowIndex = visibleRowsStartIndex;
      rowIndex < visibleRowsEndIndex;
      rowIndex++
    ) {
      const offsetFromTop = visibleRowsStartIndex * projectHeight;

      // for every row loop through each column
      // and map filteredProjects array to table(matrix) structure

      for (let colIndex = 0; colIndex < tableColumnsCount; colIndex++) {
        const projectIndex = rowIndex * tableColumnsCount + colIndex;
        const isRightElement = colIndex !== 0;
        // if project exists, push it to result array

        if (projectIndex < projectsCount) {
          const project = filteredProjects[projectIndex];
          result.push(
            <Project
              index={projectIndex}
              data={project}
              isSelected={selectedProjectIndex === projectIndex}
              setSelectedProjectIndex={setSelectedProjectIndexCached}
              key={project.name}
              styles={{
                transform: `translateY(${offsetFromTop}px)`,
                width: `${projectWidth}px`,
                aspectRatio: `${PORTRAIT_PROJECT_ASPECT_RATIO}`,
                marginLeft: isRightElement
                  ? `${projectLeftPadding - 2}px`
                  : null,
              }}
            />
          );
        }
      }
    }
    return result;
  }, [
    projectLeftPadding,
    tableColumnsCount,
    visibleRowsStartIndex,
    visibleRowsEndIndex,
    projectsCount,
    projectHeight,
    projectWidth,
    filteredProjects,
    selectedProjectIndex,
    setSelectedProjectIndexCached,
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
