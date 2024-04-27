import s from "./Gallery.module.css";
import { GALLERY_IMAGES } from "../../../../utils/constants/index.ts";

function Gallery() {
  const pagesCount = GALLERY_IMAGES.length / 6;

  return (
    <div className={s.section}>
      <div className={s.imagesGrid}>
        {GALLERY_IMAGES.map((el, i) => {
          return (
            <div className={s.container} key={i}>
              <img className={s.image} src={el.src} />
              <div className={s.caption}>{el.desc}</div>
            </div>
          );
        })}
      </div>
      <div className={s.pagesCountContainer}>
        <div className={s.pagesCount}>{`${pagesCount}/${pagesCount}`}</div>
      </div>
    </div>
  );
}

export default Gallery;
