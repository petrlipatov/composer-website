import { useEffect, useState } from "react";

import Modal from "../../../../components/Modal/Modal.tsx";

import {
  GALLERY_IMAGES,
  GALLERY_IMAGES_COUNT_MOBILE,
  GALLERY_IMAGES_COUNT_DESKTOP,
} from "../../_constants.ts";

import s from "./Gallery.module.css";
import useIsMobile from "../../../../utils/hooks/useIsMobile.ts";
import LazyImage from "../../../../components/LazyImage/LazyImage.tsx";

function Gallery() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [imagesSlice, setImagesSlice] = useState<typeof GALLERY_IMAGES>([]);
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>();
  const [selectedImage, setSelectedImage] = useState({ img: "", desc: "" });

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

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < pagesCount) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  const handleImageClick = (img, desc) => {
    setSelectedImage({ img, desc });
    setIsPopupOpened(true);
  };

  return (
    <section className={s.gallery}>
      <div className={s.imagesGrid}>
        {imagesSlice.map((el) => (
          <div
            className={s.container}
            key={el.image}
            onClick={() => handleImageClick(el.image, el.desc)}
          >
            {/* <img className={s.image} src={el.image} /> */}
            <LazyImage
              src={el.image}
              containerClassName={s.imageContainer}
              className={s.image}
              alt={"album image"}
            />
            <div className={s.caption}>{el.desc}</div>
          </div>
        ))}
      </div>
      <div className={s.pagesCountContainer}>
        <button className={s.button} onClick={goToPreviousPage}>
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
          {/* <Suspense fallback={<Preloader content={"🐥"} />}> */}
          <div>
            <img className={s.popupImage} src={selectedImage.img} />
            <div className={s.popupCaption}>{selectedImage.desc}</div>
          </div>
          {/* </Suspense> */}
        </Modal>
      )}
    </section>
  );
}

export default Gallery;
