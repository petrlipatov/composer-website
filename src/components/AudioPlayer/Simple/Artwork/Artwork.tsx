import { memo } from "react";
import s from "./Artwork.module.css";

const MemoizedArtwork = memo(function Artwork({ src }: { src: string }) {
  return <img className={s.artwork} src={src} />;
});

export default MemoizedArtwork;
