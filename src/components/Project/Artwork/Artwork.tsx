import { memo } from "react";
import s from "./Artwork.module.css";

export const Artwork = memo(({ src }: { src: string }) => {
  return <img className={s.artwork} src={src} alt="project artwork" />;
});
