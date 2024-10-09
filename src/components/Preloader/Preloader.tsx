import s from "./Preloader.module.css";

export function Preloader({ content }) {
  return (
    <h1 className={s.emoji}>
      <p>{content}</p>
    </h1>
  );
}
