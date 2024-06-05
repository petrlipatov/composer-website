import s from "./HorizontalOverlayButton.module.css";

function HorizontalOverlayButton({ children, onClick }) {
  return (
    <div className={s.trackButton} onClick={onClick}>
      <div className={s.container}>{children}</div>
    </div>
  );
}

export default HorizontalOverlayButton;
