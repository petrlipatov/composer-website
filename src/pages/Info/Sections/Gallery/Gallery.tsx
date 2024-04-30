import { useEffect, useState } from "react";
import s from "./Gallery.module.css";
import {
  GALLERY_IMAGES,
  GALLERY_IMAGES_ON_PAGE_MOBILE,
} from "../../../../utils/constants/index.ts";

function Gallery() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [imagesSlice, setImagesSlice] = useState<typeof GALLERY_IMAGES>([]);

  useEffect(() => {
    const rightIndex = pageNumber * GALLERY_IMAGES_ON_PAGE_MOBILE;
    const newSlice = GALLERY_IMAGES.slice(
      rightIndex - GALLERY_IMAGES_ON_PAGE_MOBILE,
      rightIndex
    );
    setImagesSlice(newSlice);
  }, [pageNumber]);

  const pagesCount = Math.ceil(
    GALLERY_IMAGES.length / GALLERY_IMAGES_ON_PAGE_MOBILE
  );

  return (
    <div className={s.section}>
      <div className={s.imagesGrid}>
        {imagesSlice.map((el, i) => {
          return (
            <div className={s.container} key={i}>
              <img className={s.image} src={el.src} />
              <div className={s.caption}>{el.desc}</div>
            </div>
          );
        })}
      </div>
      <div className={s.pagesCountContainer}>
        <div className={s.pagesCount}>{`< ${pageNumber} / ${Math.ceil(
          pagesCount
        )} >`}</div>
      </div>
    </div>
  );
}

export default Gallery;
