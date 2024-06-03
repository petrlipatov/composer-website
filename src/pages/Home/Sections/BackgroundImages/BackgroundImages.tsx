import s from "./BackgroundImages.module.css";

const imageSources = [
  "/images/home/flower1_414x753.webp",
  "/images/home/flower2_414x753.webp",
  "/images/home/flower3_414x753.webp",
];

const BackgroundImages = () => {
  return imageSources.map((src, index) => (
    <div
      key={index}
      className={s.image}
      style={{ backgroundImage: `url(${src})` }}
    />
  ));
};

export default BackgroundImages;
