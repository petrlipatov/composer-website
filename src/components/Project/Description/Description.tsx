import s from "./Description.module.css";

function Description({ children }) {
  return <div className={s.desc}>{children}</div>;
}

export default Description;
