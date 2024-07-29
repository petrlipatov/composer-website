import { useEffect } from "react";

const useElapsedTimeProgressUpdate = (
  progressBar: HTMLInputElement,
  elapsedTime: number,
  duration: number,
  isUserScrubbing: boolean
) => {
  useEffect(() => {
    function updateElapsedProgress() {
      if (!progressBar) return;

      const max = Number(duration);
      const progressValue = elapsedTime;
      const relativeProgressVal = ((progressValue / max) * 100).toFixed(1);

      // if (elapsedTime === 0 || isUserScrubbing) {
      //   progressBar.style.transition = "none";
      // } else {
      //   progressBar.style.transition = "background-size 2s ease";
      // }

      progressBar.style.backgroundSize = `${relativeProgressVal}% 100%`;
    }

    updateElapsedProgress();

    return () => {
      if (progressBar) {
        progressBar.style.backgroundSize = "0% 100%";
      }
    };
  }, [elapsedTime, progressBar, duration, isUserScrubbing]);
};

export default useElapsedTimeProgressUpdate;
