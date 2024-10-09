import { useCallback, useContext, useMemo, useRef, useState } from "react";

import { AudioTrack } from "../AudioTrack";
import { PlayerContext } from "../PiecesContext/PiecesContext";

import { useWidthResizeListener } from "@/utils/hooks/useWidthResizeListener";
import { useIsMobile } from "@/utils/hooks/useIsMobile";
import {
  generateElementsForSingleRow,
  getContentHeight,
  getElementHeight,
  getElementWidth,
} from "@/utils/helpers/virtualizedList";

import {
  TABLE_COLUMNS_MOBILE,
  TABLE_COLUMNS_DESKTOP,
  TRACK_LEFT_MARGIN_MOBILE,
  TRACK_LEFT_MARGIN_DESKTOP,
  TRACK_ASPECT_RATIO,
  TRACK_TOP_MARGIN_MOBILE,
  TRACK_TOP_MARGIN_DESKTOP,
  SCROLL_WIDTH_MOBILE,
  SCROLL_WIDTH_DESKTOP,
} from "../../_constants";

import s from "./AudioTracks.module.css";

export const AudioTracks = () => {
  const [sectionWidth, setSectionWidth] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const { filteredPieces, selectedTrackIndex, setSelectedTrackIndex } =
    useContext(PlayerContext);

  const sectionRef = useRef<HTMLDivElement>(null);

  useWidthResizeListener(sectionRef, setSectionWidth);

  // Determine table configuration based on device type

  const isMobile = useIsMobile();

  const tableColumnsCount = isMobile
    ? TABLE_COLUMNS_MOBILE
    : TABLE_COLUMNS_DESKTOP;

  const tableColumnGapsCount = tableColumnsCount - 1;

  const trackLeftMargin = isMobile
    ? TRACK_LEFT_MARGIN_MOBILE
    : TRACK_LEFT_MARGIN_DESKTOP;

  const trackTopMargin = isMobile
    ? TRACK_TOP_MARGIN_MOBILE
    : TRACK_TOP_MARGIN_DESKTOP;

  const scrollWidth = isMobile ? SCROLL_WIDTH_MOBILE : SCROLL_WIDTH_DESKTOP;

  const sectionWidthWithoutScroll = sectionWidth - scrollWidth;

  // Calculate track dimensions

  const trackWidth = getElementWidth(
    sectionWidthWithoutScroll,
    trackLeftMargin,
    tableColumnGapsCount,
    tableColumnsCount
  );

  const trackHeight = getElementHeight(
    trackWidth,
    TRACK_ASPECT_RATIO,
    trackTopMargin
  );

  const tracksTotalCount = filteredPieces.length;

  const contentHeight = getContentHeight(
    tracksTotalCount,
    trackHeight,
    tableColumnsCount
  );

  const visibleRowsStartIndex = useMemo(
    () => Math.max(0, Math.floor(scrollTop / trackHeight)),
    [scrollTop, trackHeight]
  );

  const visibleRowsEndIndex = visibleRowsStartIndex + 3;

  const setSelectedTrackIndexCached = useCallback(setSelectedTrackIndex, [
    setSelectedTrackIndex,
  ]);

  const generateTrackElement = useCallback(
    (track, trackIndex, offsetFromTop, isRightElement) => (
      <AudioTrack
        index={trackIndex}
        data={track}
        key={track.name}
        isSelected={selectedTrackIndex === trackIndex}
        setSelectedTrackIndex={setSelectedTrackIndexCached}
        extraStyles={{
          transform: `translateY(${offsetFromTop}px)`,
          width: `${trackWidth}px`,
          aspectRatio: `${TRACK_ASPECT_RATIO}`,
          marginLeft: isRightElement ? `${trackLeftMargin}px` : null,
          marginTop: trackTopMargin,
        }}
      />
    ),
    [
      trackLeftMargin,
      trackWidth,
      selectedTrackIndex,
      trackTopMargin,
      setSelectedTrackIndexCached,
    ]
  );

  const displayedTracks = useMemo(() => {
    // loop itarates over rows
    // and generates AudioTracks for each row with generateElementsForSingleRow

    const result = [];
    for (
      let rowIndex = visibleRowsStartIndex;
      rowIndex < visibleRowsEndIndex;
      rowIndex++
    ) {
      const offsetFromTop = visibleRowsStartIndex * trackHeight;
      result.push(
        ...generateElementsForSingleRow(
          rowIndex,
          offsetFromTop,
          tableColumnsCount,
          tracksTotalCount,
          filteredPieces,
          generateTrackElement
        )
      );
    }

    return result;
  }, [
    trackHeight,
    visibleRowsEndIndex,
    visibleRowsStartIndex,
    filteredPieces,
    tableColumnsCount,
    tracksTotalCount,
    generateTrackElement,
  ]);

  function onScroll(event) {
    setScrollTop(event.currentTarget.scrollTop);
  }

  return (
    <section className={s.tracks} onScroll={onScroll} ref={sectionRef}>
      <div
        className={s.tracksContainer}
        style={{
          height: `${contentHeight}px`,
        }}
      >
        {displayedTracks}
      </div>
    </section>
  );
};
