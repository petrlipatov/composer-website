import { useEffect } from "react";

const useTransitionOnProgressBarWhenBuffered = (
  buffered,
  setProgressTransitionAnimation
) => {
  useEffect(() => {
    if (buffered !== 0) {
      // setProgressTransitionAnimation(true);
    }
  }, [buffered, setProgressTransitionAnimation]);
};

export default useTransitionOnProgressBarWhenBuffered;
