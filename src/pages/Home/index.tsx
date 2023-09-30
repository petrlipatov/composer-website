import { useRef } from "react";
import styles from "./index.module.css";
useRef;

export default function Home() {
  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);

  return (
    <div className={styles.page}>
      <div className={styles.caption}>{`Height: ${windowHeight.current}`}</div>
      <div className={styles.caption}>{`Width: ${windowWidth.current}`}</div>
    </div>
  );
}
