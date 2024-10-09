import { memo } from "react";
import s from "./Artwork.module.css";

export const Artwork = memo(function Artwork({ src }: { src: string }) {
  return <img className={s.artwork} src={src} />;
});
