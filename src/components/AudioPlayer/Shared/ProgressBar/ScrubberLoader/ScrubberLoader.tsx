import cn from "classnames";
import s from "./ScrubberLoader.module.css";

export const ScrubberLoader = ({ isLoading }) => (
  <div className={cn(s.loader, isLoading ? s.active : "")}></div>
);
