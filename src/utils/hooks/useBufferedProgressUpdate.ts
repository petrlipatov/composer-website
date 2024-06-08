import { useEffect } from "react";

const useBufferedProgressUpdate = (
  bufferedBar: HTMLDivElement,
  buffered: number,
  duration: number,
  currentTime: number
) => {
  useEffect(() => {
    function updateBufferedOnScrubber() {
      if (bufferedBar) {
        const max = duration;
        const progressValue = buffered;
        const relativeProgressVal = ((progressValue / +max) * 100).toFixed(0);
        bufferedBar.style.backgroundSize = `${relativeProgressVal}% 100%`;
      }
    }

    updateBufferedOnScrubber();

    return () => {
      if (bufferedBar) {
        bufferedBar.style.backgroundSize = "0% 100%";
      }
    };
  }, [buffered, bufferedBar, duration, currentTime]);
};

export default useBufferedProgressUpdate;
