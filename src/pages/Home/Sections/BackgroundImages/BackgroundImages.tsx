import useIsMobile from "../../../../utils/hooks/useIsMobile";
import { IMAGES_DESKTOP, IMAGES_MOBILE } from "../../_constants";
import s from "./BackgroundImages.module.css";

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
