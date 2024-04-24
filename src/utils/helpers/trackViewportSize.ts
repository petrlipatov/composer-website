import { Dispatch, SetStateAction } from "react";

type TrackViewportSizeArgs = {
  height: number;
  width: number;
};

export function trackViewportSize(
  stateSetter: Dispatch<SetStateAction<TrackViewportSizeArgs>>
) {
  const handleResize = () => {
    const { innerHeight, innerWidth } = window;
    stateSetter({ height: innerHeight, width: innerWidth });
  };
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}
