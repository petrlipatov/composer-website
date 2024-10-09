import s from "./Equalizer.module.css";
import cn from "classnames";

export function Equalizer({ color }: { color?: string }) {
  let barColor;

  switch (color) {
    case "black":
      barColor = "#000000";
      break;

    default:
      barColor = "#e7397a";
      break;
  }

  return (
    <div className={s.equalizer}>
      <span
        className={cn(s.playing__bar, s.playing__bar1)}
        style={{ background: barColor }}
      />
      <span
        className={cn(s.playing__bar, s.playing__bar2)}
        style={{ background: barColor }}
      />
      <span
        className={cn(s.playing__bar, s.playing__bar3)}
        style={{ background: barColor }}
      />
    </div>
  );
}
