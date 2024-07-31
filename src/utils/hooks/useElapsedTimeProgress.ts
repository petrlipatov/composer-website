import { MutableRefObject, useEffect } from "react";

const useElapsedTimeProgress = (
  progressBarRef: MutableRefObject<HTMLDivElement>,
  elapsedTime: number,
  duration: number
) => {
  useEffect(() => {
    const progressBar = progressBarRef.current;
    function updateElapsedProgress() {
      if (!progressBar) return;

      const max = Number(duration);
      const progressValue = elapsedTime;
      const relativeProgressVal = ((progressValue / max) * 100).toFixed(1);

      progressBar.style.backgroundSize = `${relativeProgressVal}% 100%`;
    }

    updateElapsedProgress();

    return () => {
      if (progressBar) {
        progressBar.style.backgroundSize = "0% 100%";
      }
    };
  }, [elapsedTime, progressBarRef, duration]);
};

export default useElapsedTimeProgress;
