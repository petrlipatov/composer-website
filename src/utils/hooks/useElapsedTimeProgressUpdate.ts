import { useEffect } from "react";

const useElapsedTimeProgressUpdate = (
  progressBar: HTMLInputElement,
  elapsedTime: number,
  duration: number
) => {
  useEffect(() => {
    function updateElapsedProgress() {
      if (progressBar) {
        const max = duration;
        const progressValue = elapsedTime;
        const relativeProgressVal = ((progressValue / +max) * 100).toFixed(1);
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
