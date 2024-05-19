import s from "./Artwork.module.css";

function Artwork({ src }: { src: string }) {
  return <img className={s.artwork} src={src} alt="project artwork" />;
}

export default Artwork;
