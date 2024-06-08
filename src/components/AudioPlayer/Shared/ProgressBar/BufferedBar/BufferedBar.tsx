import { forwardRef, memo } from "react";
import s from "./BufferedBar.module.css";

const BufferedBar = memo(
  forwardRef<HTMLDivElement>((_, ref) => (
    <div className={s.bufferedBar} ref={ref} />
  ))
);

export default BufferedBar;
