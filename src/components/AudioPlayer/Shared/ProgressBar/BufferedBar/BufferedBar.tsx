import { forwardRef, memo } from "react";
import s from "./BufferedBar.module.css";
import { TRANSITION } from "../../../../../utils/constants";

const BufferedBar = memo(
  forwardRef<HTMLDivElement, { progressTransitionAnimation: boolean }>(
    ({ progressTransitionAnimation }, ref) => {
      return (
        <div
          className={s.bufferedBar}
          ref={ref}
          style={{
            transition: progressTransitionAnimation
              ? TRANSITION.smooth
              : TRANSITION.none,
          }}
        />
      );
    }
  )
);

export default BufferedBar;
