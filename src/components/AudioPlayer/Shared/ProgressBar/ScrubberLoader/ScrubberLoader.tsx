import cn from "classnames";
import s from "./ScrubberLoader.module.css";

const Loader = ({ isLoading }) => (
  <div className={cn(s.loader, isLoading ? s.active : "")}></div>
);

export default Loader;
