import s from "./Logo.module.css";
import { Link } from "react-router-dom";
import cn from "classnames";

export default function Logo({ noTitle = false }) {
  return (
    <Link to="/" className={s.titleContainer}>
      <div className={s.name}>Liza Tikhonova</div>
      <div className={cn(s.job, noTitle ? s.jobHidden : "")}>composer</div>
    </Link>
  );
}
