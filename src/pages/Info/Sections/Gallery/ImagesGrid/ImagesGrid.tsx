import LazyImage from "@/components/LazyImage/LazyImage";
import s from "./ImagesGrid.module.css";

export const ImagesGrid = ({ imagesSlice, handleImageClick }) => {
  return (
    <div className={s.imagesGrid}>
      {imagesSlice.map((el, i) => (
        <div
          className={s.container}
          key={el.hires}
          onClick={() => handleImageClick(i)}
        >
          <LazyImage
            src={el.lowres}
            containerClassName={s.imageContainer}
            className={s.image}
            alt={"album image"}
          />
          <div className={s.caption}>{el.desc}</div>
        </div>
      ))}
    </div>
  );
};
