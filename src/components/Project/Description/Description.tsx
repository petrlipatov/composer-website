import s from "./Description.module.css";

export function Description({ children }) {
  return <div className={s.desc}>{children}</div>;
}
