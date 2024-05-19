import s from "./Title.module.css";

function Title({ children }) {
  return <div className={s.title}>{children}</div>;
}

export default Title;
