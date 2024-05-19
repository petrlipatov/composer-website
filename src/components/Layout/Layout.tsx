import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { useState, useEffect, useRef, RefObject, createContext } from "react";
import { trackViewportSize } from "../../utils/helpers/trackViewportSize";

export const ScreenSizeContext = createContext(null);

function Layout() {
  const [screenSize, setScreenSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const layoutRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    trackViewportSize(setScreenSize);
  }, []);

  return (
    <div
      className={styles.layoutContainer}
      style={{
        height: `${screenSize.height}px`,
        width: `${screenSize.width}px`,
      }}
      ref={layoutRef}
    >
      <ScreenSizeContext.Provider value={screenSize}>
        <Outlet />
      </ScreenSizeContext.Provider>
    </div>
  );
}

export default Layout;
