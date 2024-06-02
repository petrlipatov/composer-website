import s from "./BackgroundImages.module.css";
import { useEffect, useState } from "react";

const imageSources = [
  "/images/home/flower1_414x753.webp",
  "/images/home/flower2_414x753.webp",
  "/images/home/flower3_414x753.webp",
];

const Background = () => {
  const [loadedImages, setLoadedImages] = useState([false, false, false]);

  useEffect(() => {
    imageSources.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages((prevLoadedImages) => {
          const newLoadedImages = [...prevLoadedImages];
          newLoadedImages[index] = true;
          return newLoadedImages;
        });
      };
    });
  }, []);

  return imageSources.map((src, index) => (
    <div
      key={index}
      className={`${s.image} ${loadedImages[index] ? s.fadeIn : ""}`}
      style={{ backgroundImage: `url(${src})` }}
    />
  ));
};

export default Background;
