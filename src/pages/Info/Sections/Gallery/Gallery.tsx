import s from "./Gallery.module.css";
import { GALLERY_IMAGES } from "../../../../utils/constants/index.ts";

function Gallery() {
  return (
    <div className={s.section}>
      {GALLERY_IMAGES.map((el, i) => {
        return (
          <div className={s.container} key={i}>
            <img className={s.image} src={el.src} />
            <div className={s.caption}>{el.desc}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Gallery;
