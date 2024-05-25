import { ChangeEvent, forwardRef } from "react";
import s from "./ScrubberBar.module.css";

type Props = {
  elapsedTime: number;
  duration: number;
  onScrubberChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Scrubber = forwardRef<HTMLInputElement, Props>(
  ({ elapsedTime, duration, onScrubberChange }, ref) => (
    <input
      className={s.timeScrubber}
      type="range"
      value={elapsedTime}
      min={0}
      max={duration}
      onChange={onScrubberChange}
      ref={ref}
    />
  )
);

export default Scrubber;
