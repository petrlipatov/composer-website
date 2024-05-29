import { useCallback, useContext, useMemo, useRef, useState } from "react";

import AudioTrack from "../AudioTrack/AudioTrack";

import { PiecesContext } from "../../Pieces";

import s from "./Tracks.module.css";
import useElementWidthListener from "../../../../utils/hooks/useWidthResizeListener";
import useIsMobile from "../../../../utils/hooks/useIsMobile";
import {
  TABLE_COLUMNS_MOBILE,
  TABLE_COLUMNS_DESKTOP,
  TRACK_LEFT_MARGIN_MOBILE,
  TRACK_LEFT_MARGIN_DESKTOP,
  TRACK_ASPECT_RATIO,
  TRACK_TOP_MARGIN_MOBILE,
  TRACK_TOP_MARGIN_DESKTOP,
} from "../../_constants";

const Tracks = () => {
  const [sectionWidth, setSectionWidth] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(null);
  const { filteredPieces } = useContext(PiecesContext);

  const sectionRef = useRef<HTMLDivElement>(null);

  useElementWidthListener(sectionRef, setSectionWidth);

  // Determine table configuration based on device type

  const isMobile = useIsMobile();

  const tableColumnsCount = isMobile
    ? TABLE_COLUMNS_MOBILE
    : TABLE_COLUMNS_DESKTOP;

  const tableColumnGaps = tableColumnsCount - 1;

  const trackLeftMargin = isMobile
    ? TRACK_LEFT_MARGIN_MOBILE
    : TRACK_LEFT_MARGIN_DESKTOP;

  const trackTopMargin = isMobile
    ? TRACK_TOP_MARGIN_MOBILE
    : TRACK_TOP_MARGIN_DESKTOP;

  // Calculate track dimensions

  const trackWidth =
    (sectionWidth - trackLeftMargin * tableColumnGaps) / tableColumnsCount;

  const trackHeight = trackWidth / TRACK_ASPECT_RATIO + trackTopMargin;

  const tracksTotalCount = filteredPieces.length;
  const contentHeight =
    Math.ceil(tracksTotalCount / tableColumnsCount) * trackHeight;

  const visibleRowsStartIndex = useMemo(
    () => Math.max(0, Math.floor(scrollTop / trackHeight)),
    [scrollTop, trackHeight]
  );
  const visibleRowsEndIndex = visibleRowsStartIndex + 3;

  const setSelectedTrackIndexCached = useCallback(setSelectedTrackIndex, [
    setSelectedTrackIndex,
  ]);

  const displayedTracks = useMemo(() => {
    const generateTrackElement = (
      track,
      trackIndex,
      offsetFromTop,
      isRightElement
    ) => (
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
    );

    const generateTracksForSingleRow = (rowIndex, offsetFromTop) => {
      const rowOfElements = [];
      for (let colIndex = 0; colIndex < tableColumnsCount; colIndex++) {
        const trackIndex = rowIndex * tableColumnsCount + colIndex;
        if (trackIndex < tracksTotalCount) {
          const track = filteredPieces[trackIndex];
          const isRightElement = colIndex !== 0;
          rowOfElements.push(
            generateTrackElement(
              track,
              trackIndex,
              offsetFromTop,
              isRightElement
            )
          );
        }
      }
      return rowOfElements;
    };

    // loop itarates over rows
    // and generates AudioTracks for each row with generateProjectsForSingleRow()

    const result = [];
    for (
      let rowIndex = visibleRowsStartIndex;
      rowIndex < visibleRowsEndIndex;
      rowIndex++
    ) {
      const offsetFromTop = visibleRowsStartIndex * trackHeight;
      result.push(...generateTracksForSingleRow(rowIndex, offsetFromTop));
    }

    return result;
  }, [
    trackHeight,
    visibleRowsEndIndex,
    visibleRowsStartIndex,
    filteredPieces,
    trackLeftMargin,
    trackWidth,
    tracksTotalCount,
    selectedTrackIndex,
    tableColumnsCount,
    trackTopMargin,
    // loadingTrackIndex,
    // playingTrackIndex,
    // pausedTrackIndex,
    setSelectedTrackIndexCached,
    // setPausedTrackIndexCached,
    // setPlayingTrackIndexCached,
    // setLoadingTrackIndexCached,
  ]);

  function onScroll(event) {
    setScrollTop(event.currentTarget.scrollTop);
  }

  return (
    <div className={s.tracksSection} onScroll={onScroll} ref={sectionRef}>
      <div
        className={s.tracksContainer}
        style={{
          height: `${contentHeight}px`,
        }}
      >
        {displayedTracks}
      </div>
    </div>
  );
};

export default Tracks;
