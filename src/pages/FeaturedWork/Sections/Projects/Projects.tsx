import useIsMobile from "../../../../utils/hooks/useIsMobile";
import { FeaturedWorkContext } from "../../FeaturedWork";
import s from "./Projects.module.css";
import {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Project from "../Project/Project";

export default function Projects() {
  const [width, setWidth] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const {
    isPlayerOpened,
    filteredProjects,
    selectedProjectIndex,
    setSelectedProjectIndex,
  } = useContext(FeaturedWorkContext);

  const setSelectedProjectIndexCached = useCallback(setSelectedProjectIndex, [
    setSelectedProjectIndex,
  ]);

  const count = filteredProjects.length;
  const isMobile = useIsMobile();
  const itemWidth = (width - 5) / 2;
  const itemHeight = itemWidth / 0.66089965397;
  const columns = 2;
  const rowHeight = itemHeight;
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (ref.current) {
      const elementWidth = ref.current.offsetWidth;
      setWidth(elementWidth);
    }
  }, []);

  const contentHeight = Math.ceil(count / columns) * rowHeight;

  const startIndex = useMemo(
    () => Math.max(0, Math.floor(scrollTop / rowHeight)),
    [scrollTop, rowHeight]
  );

  const rows = startIndex + 3;

  function displayMovieItems() {
    const displayedItems = [];

    for (let rowIndex = startIndex; rowIndex < rows; rowIndex++) {
      const offsetFromTop = startIndex * rowHeight;

      for (let colIndex = 0; colIndex < columns; colIndex++) {
        const projectIndex = rowIndex * columns + colIndex;

        if (projectIndex < count) {
          const project = filteredProjects[projectIndex];
          displayedItems.push(
            <Project
              index={projectIndex}
              data={project}
              isSelected={selectedProjectIndex === projectIndex}
              setSelectedProjectIndex={setSelectedProjectIndexCached}
              key={project.name}
              styles={{
                transform: `translate(${0}px, ${offsetFromTop}px)`,
                width: `${width / columns - 5}px`,
                height: "auto",
                position: "relative",
                display: "inline-block",
                aspectRatio: 191 / 289,
                border: "1px solid red",
                overflow: "hidden",
              }}
            />
          );
        }
      }
    }

    return displayedItems;
  }

  function onScroll(event) {
    setScrollTop(event.currentTarget.scrollTop);
  }

  return (
    <div
      className={s.outerbox}
      onScroll={onScroll}
      ref={ref}
      style={isMobile && isPlayerOpened ? { display: "none" } : {}}
    >
      <div>{`scrollTop: ${scrollTop}`}</div>
      <div>{`itemHeight: ${itemHeight}`}</div>
      <div>{`itemWidth: ${width / 2}`}</div>
      <div
        className={s.innerbox}
        style={{
          position: "relative",
          height: `${contentHeight}px`,
        }}
      >
        {displayMovieItems()}
      </div>
    </div>
  );
}
