import { useEffect, useState } from "react";
import s from "./Gallery.module.css";
import {
  GALLERY_IMAGES,
  GALLERY_IMAGES_ON_PAGE_MOBILE,
} from "../../../../utils/constants/index.ts";
import Modal from "../../../../components/Modal/Modal.tsx";

function Gallery() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [imagesSlice, setImagesSlice] = useState<typeof GALLERY_IMAGES>([]);
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>();
  const [selectedImage, setSelectedImage] = useState({ img: "", desc: "" });

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
    <div className={s.section}>
      <div className={s.imagesGrid}>
        {imagesSlice.map((el, i) => {
          return (
            <div
              className={s.container}
              key={i}
              onClick={() => handleImageClick(el.src, el.desc)}
            >
              <img className={s.image} src={el.src} />
              <div className={s.caption}>{el.desc}</div>
            </div>
          );
        })}
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
    </div>
  );
}

export default Gallery;
