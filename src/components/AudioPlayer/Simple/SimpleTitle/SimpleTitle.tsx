import s from "./SimpleTitle.module.css";

export function SimpleTitle({ children }) {
  return <div className={s.title}>{children}</div>;
}
