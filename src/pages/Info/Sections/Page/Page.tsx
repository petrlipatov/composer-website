import s from "./Page.module.css";
export const Page = ({ children }) => {
  return <div className={s.page}>{children}</div>;
};
