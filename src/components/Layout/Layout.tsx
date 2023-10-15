import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { useState, useEffect, useRef, useLayoutEffect, RefObject } from "react";
import { calcViewportSize } from "../../utils";
import { gsap } from "gsap";

function Layout() {
  const [sectionHeight, setSectionHeight] = useState(window.innerHeight);

  const layoutRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    calcViewportSize(setSectionHeight);
  }, []);

  useLayoutEffect(() => {
    if (layoutRef.current) {
      gsap.fromTo(
        layoutRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power1.in" }
      );
    }
  }, []);

  return (
    <div
      className={styles.layoutContainer}
      style={{ height: `${sectionHeight}px`, width: `${window.innerWidth}px` }}
      ref={layoutRef}
    >
      <Outlet />
    </div>
  );
}

export default Layout;
