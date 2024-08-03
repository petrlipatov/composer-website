import { useState } from "react";
import s from "./LazyImage.module.css";

type Props = {
  src: string;
  alt: string;
  className: string;
  style?: object;
  containerClassName?: string;
  containerStyle?: object;
  onClick?: () => void;
};

const LazyImage = ({
  src,
  alt,
  className,
  style,
  containerClassName,
  containerStyle,
  onClick,
}: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={containerClassName} style={containerStyle}>
      {isLoading && <div className={s.loader}>🐶</div>}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleImageLoad}
        style={{ ...style, visibility: isLoading ? "hidden" : "visible" }}
        className={className}
        onClick={onClick}
      />
    </div>
  );
};

export default LazyImage;
