import { useEffect } from "react";

const useElapsedTimeProgressUpdate = (
  progressBar: HTMLInputElement,
  elapsedTime: number,
  duration: number,
  isUserScrubbing: boolean
) => {
  useEffect(() => {
    function updateElapsedProgress() {
      if (progressBar) {
        const max = Number(duration);

        if (elapsedTime === 0 || isUserScrubbing) {
          progressBar.style.transition = "none";
        }

        if (elapsedTime > 0 && !isUserScrubbing) {
          progressBar.style.transition = "background-size 2s ease";
        }

        const progressValue = elapsedTime;
        const relativeProgressVal = ((progressValue / max) * 100).toFixed(1);
        progressBar.style.backgroundSize = `${relativeProgressVal}% 100%`;
      }
    }

    updateElapsedProgress();

    return () => {
      if (progressBar) {
        progressBar.style.backgroundSize = "0% 100%";
      }
    };
  }, [elapsedTime, progressBar, duration]);
};

export default useElapsedTimeProgressUpdate;
