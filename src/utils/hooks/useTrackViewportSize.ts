import { useEffect } from "react";

type TrackViewportSizeArgs = {
  height: number;
  width: number;
};

export function useTrackViewportSize(
  stateSetter: React.Dispatch<React.SetStateAction<TrackViewportSizeArgs>>
) {
  useEffect(() => {
    const handleResize = () => {
      const { innerHeight, innerWidth } = window;
      stateSetter({ height: innerHeight, width: innerWidth });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [stateSetter]);
}
