import { useEffect } from "react";

export const useScrollSelectedTrackIntoView = (
  selectedTrackIndex,
  tracksRefs,
  tracksContainerRef
) => {
  useEffect(() => {
    const tracksContainer = tracksContainerRef.current;
    const selectedTrack = tracksRefs.current[selectedTrackIndex];

    if (selectedTrack && tracksContainer) {
      const { top, bottom } = selectedTrack.getBoundingClientRect();
      const { top: containerTop, bottom: containerBottom } =
        tracksContainer.getBoundingClientRect();
      const isTrackVisible = top >= containerTop && bottom <= containerBottom;
      if (!isTrackVisible) {
        selectedTrack.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [selectedTrackIndex, tracksRefs, tracksContainerRef]);
};
