import s from "./AudioPlayingLoader.module.css";
import cn from "classnames";

function AudioPlayingLoader({ isActive }) {
  const equalizerClasses = cn(s.equalizer, {
    [s.equalizerActive]: isActive,
  });

  return (
    <div className={equalizerClasses}>
      <span className={cn(s.playing__bar, s.playing__bar1)} />
      <span className={cn(s.playing__bar, s.playing__bar2)} />
      <span className={cn(s.playing__bar, s.playing__bar3)} />
    </div>
  );
}

export default AudioPlayingLoader;
