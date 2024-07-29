import { useEffect } from "react";

const useBufferedProgressUpdate = (
  bufferedBar: HTMLDivElement,
  buffered: number,
  duration: number,
  currentTime: number,
  isUserScrubbing: boolean
) => {
  useEffect(() => {
    function updateBufferedOnScrubber() {
      if (bufferedBar) {
        const max = Number(duration);

        // if (buffered === 0 || isUserScrubbing) {
        //   bufferedBar.style.transition = "none";
        // }

        // if (buffered > 0 && !isUserScrubbing) {
        //   bufferedBar.style.transition = "background-size 2s ease";
        // }

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
  }, [buffered, bufferedBar, duration, currentTime, isUserScrubbing]);
};

export default useBufferedProgressUpdate;
