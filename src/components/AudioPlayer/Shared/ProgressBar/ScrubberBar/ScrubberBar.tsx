import { ChangeEvent, forwardRef } from "react";
import s from "./ScrubberBar.module.css";
import { TRANSITION } from "../../../../../utils/constants";

type Props = {
  elapsedTime: number;
  duration: number;
  onScrubberChange: (e: ChangeEvent<HTMLInputElement>) => void;
  progressTransitionAnimation: boolean;
};

const Scrubber = forwardRef<HTMLInputElement, Props>(
  (
    { progressTransitionAnimation, elapsedTime, duration, onScrubberChange },
    ref
  ) => {
    return (
      <input
        className={s.timeScrubber}
        type="range"
        value={elapsedTime}
        min={0}
        max={duration}
        onChange={onScrubberChange}
        ref={ref}
        style={{
          transition: progressTransitionAnimation
            ? TRANSITION.smooth
            : TRANSITION.none,
        }}
      />
    );
  }
);

export default Scrubber;
