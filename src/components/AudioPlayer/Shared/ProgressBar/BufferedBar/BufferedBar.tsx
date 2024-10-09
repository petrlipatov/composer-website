import { forwardRef, memo } from "react";
import { TRANSITION } from "@/utils/constants";
import s from "./BufferedBar.module.css";

export const BufferedBar = memo(
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
