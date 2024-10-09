import s from "./Content.module.css";

export const Content = ({ children }) => {
  return <div className={s.content}>{children}</div>;
};
