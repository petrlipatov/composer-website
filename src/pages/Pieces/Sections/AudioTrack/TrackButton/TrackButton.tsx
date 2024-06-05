import s from "./TrackButton.module.css";

function TrackButton({ children, onClick }) {
  return (
    <div className={s.trackButton} onClick={onClick}>
      <div className={s.container}>{children}</div>
    </div>
  );
}

export default TrackButton;
