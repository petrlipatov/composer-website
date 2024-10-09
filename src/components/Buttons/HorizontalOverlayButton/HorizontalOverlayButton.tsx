import s from "./HorizontalOverlayButton.module.css";

export function HorizontalOverlayButton({ children, onClick }) {
  return (
    <div className={s.trackButton} onClick={onClick}>
      <div className={s.container}>{children}</div>
    </div>
  );
}
