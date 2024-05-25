import { forwardRef } from "react";
import s from "./BufferedBar.module.css";

const BufferedBar = forwardRef<HTMLInputElement>((_, ref) => (
  <div className={s.bufferedBar} ref={ref} />
));

export default BufferedBar;
