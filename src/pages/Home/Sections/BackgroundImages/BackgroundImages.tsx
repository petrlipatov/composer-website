import useIsMobile from "../../../../utils/hooks/useIsMobile";
import s from "./BackgroundImages.module.css";

const IMAGES_MOBILE = [
  "/images/home/flower1_414x753.webp",
  "/images/home/flower2_414x753.webp",
  "/images/home/flower3_414x753.webp",
];

const IMAGES_DESKTOP = ["/images/home/img.png"];

const BackgroundImages = () => {
  const isMobile = useIsMobile();

  const images = isMobile ? IMAGES_MOBILE : IMAGES_DESKTOP;

  return images.map((src, index) => (
    <div
      key={index}
      className={s.image}
      style={{ backgroundImage: `url(${src})` }}
    />
  ));
};

export default BackgroundImages;
