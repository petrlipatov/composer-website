import s from "./Title.module.css";

export function Title({ children }) {
  return <div className={s.title}>{children}</div>;
}
