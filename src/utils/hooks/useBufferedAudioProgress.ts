import { MutableRefObject, useEffect } from "react";

export const useBufferedAudioProgress = (
  bufferedBarRef: MutableRefObject<HTMLDivElement>,
  buffered: number,
  duration: number,
  currentTime: number
) => {
  useEffect(() => {
    const bufferedBar = bufferedBarRef.current;
    function updateBufferedOnScrubber() {
      if (bufferedBar) {
        const max = Number(duration);

        const progressValue = buffered;
        const relativeProgressVal = ((progressValue / max) * 100).toFixed(0);

        bufferedBar.style.backgroundSize = `${relativeProgressVal}% 100%`;
      }
    }

    updateBufferedOnScrubber();

    return () => {
      if (bufferedBar) {
        bufferedBar.style.backgroundSize = "0% 100%";
      }
    };
  }, [buffered, bufferedBarRef, duration, currentTime]);
};
