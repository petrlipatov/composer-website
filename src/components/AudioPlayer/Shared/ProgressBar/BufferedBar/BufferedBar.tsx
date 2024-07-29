import { forwardRef, memo } from "react";
import s from "./BufferedBar.module.css";
import { TRANSITION } from "../../../../../utils/constants";

const BufferedBar = memo(
  forwardRef<HTMLDivElement, { isUserScrubbing: boolean }>(
    ({ isUserScrubbing }, ref) => {
      return (
        <div
          className={s.bufferedBar}
          ref={ref}
          style={{
            transition: isUserScrubbing ? TRANSITION.none : TRANSITION.smooth,
          }}
        />
      );
    }
  )
);

export default BufferedBar;
