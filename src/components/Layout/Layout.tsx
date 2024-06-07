import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { useState, useRef, RefObject, createContext } from "react";
import { useTrackViewportSize } from "../../utils/hooks/useTrackViewportSize";

export const ScreenSizeContext = createContext(null);

function Layout() {
  const [screenSize, setScreenSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const layoutRef: RefObject<HTMLDivElement> = useRef(null);

  useTrackViewportSize(setScreenSize);

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
