import style from "./Preloader.module.css";

export default function Preloader({ content }) {
  return (
    <h1 className={style.emoji}>
      <p>{content}</p>
    </h1>
  );
}
