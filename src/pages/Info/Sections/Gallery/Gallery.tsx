import { useEffect, useState } from "react";

import Modal from "@/components/Modal/Modal.tsx";
import LazyImage from "@/components/LazyImage/LazyImage.tsx";

import { useIsMobile } from "@/utils/hooks/useIsMobile.ts";
import {
  GALLERY_IMAGES,
  GALLERY_IMAGES_COUNT_MOBILE,
  GALLERY_IMAGES_COUNT_DESKTOP,
} from "../../_constants.ts";

import s from "./Gallery.module.css";

export function Gallery() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [imagesSlice, setImagesSlice] = useState<typeof GALLERY_IMAGES>([]);
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(null);

  const isMobile = useIsMobile();

  const imagesCount = isMobile
    ? GALLERY_IMAGES_COUNT_MOBILE
    : GALLERY_IMAGES_COUNT_DESKTOP;

  useEffect(() => {
    const rightIndex = pageNumber * imagesCount;
    const newSlice = GALLERY_IMAGES.slice(rightIndex - imagesCount, rightIndex);
    setImagesSlice(newSlice);
  }, [pageNumber, imagesCount]);

  const pagesCount = Math.ceil(GALLERY_IMAGES.length / imagesCount);

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < pagesCount) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsPopupOpened(true);
  };

  let touchStartX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX - touchEndX;

    if (distance > 50) {
      selectedImageIndex < GALLERY_IMAGES.length - 1
        ? setSelectedImageIndex(selectedImageIndex + 1)
        : setSelectedImageIndex(0);
    } else if (distance < -50) {
      selectedImageIndex > 0
        ? setSelectedImageIndex(selectedImageIndex - 1)
        : setSelectedImageIndex(GALLERY_IMAGES.length - 1);
    }
  };

  return (
    <section className={s.gallery}>
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
      <div className={s.pagesCountContainer}>
        <button className={s.button} onClick={goToPrevPage}>
          &lt;
        </button>
        <div className={s.pagesCount}>{`${pageNumber} / ${Math.ceil(
          pagesCount
        )}`}</div>
        <button className={s.button} onClick={goToNextPage}>
          &gt;
        </button>
      </div>

      {isPopupOpened && (
        <Modal setPopupState={setIsPopupOpened}>
          <div
            className={s.popupImageContainer}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              className={s.popupImage}
              src={GALLERY_IMAGES[selectedImageIndex].hires}
            />
            <div className={s.popupCaption}>
              {GALLERY_IMAGES[selectedImageIndex].desc}
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
