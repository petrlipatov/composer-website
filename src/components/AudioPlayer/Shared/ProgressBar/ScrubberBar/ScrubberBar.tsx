import { ChangeEvent, forwardRef } from "react";
import { TRANSITION } from "@/utils/constants";
import s from "./ScrubberBar.module.css";

type Props = {
  elapsedTime: number;
  duration: number;
  onScrubberChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  // onMouseDown?: () => void;
  // onMouseUp?: (e) => void;
  progressTransitionAnimation: boolean;
};

export const ScrubberBar = forwardRef<HTMLInputElement, Props>(
  (
    {
      // progressTransitionAnimation,
      elapsedTime,
      duration,
      // onMouseDown,
      // onMouseUp,
      onScrubberChange,
    },
    ref
  ) => {
    return (
      <input
        className={s.timeScrubber}
        type="range"
        value={elapsedTime}
        min={0}
        max={duration}
        onInput={onScrubberChange}
        // onMouseDown={onMouseDown}
        // onTouchStart={onMouseDown}
        // onMouseUp={onMouseUp}
        // onTouchEnd={onMouseUp}
        ref={ref}
        // style={{
        //   transition: progressTransitionAnimation
        //     ? TRANSITION.smooth
        //     : TRANSITION.none,
        // }}
      />
    );
  }
);
