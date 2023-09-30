import { useEffect, useState } from "react";
import styles from "./index.module.css";
import imageSrc from "../../assets/images/IMG_8450.png";

export default function Home() {
  const [pageHeight, setPageHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setPageHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.page} style={{ height: `${pageHeight}px` }}>
      <div className={styles.titleContainer}>
        <div className={styles.name}>LIZA TIKHONOVA</div>
        <div className={styles.title}>COMPOSER</div>
      </div>
      <img className={styles.image} src={imageSrc} alt="" />
    </div>
  );
}
