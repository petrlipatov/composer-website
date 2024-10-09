import { Outlet } from "react-router-dom";
import { useState, useRef, RefObject, createContext } from "react";
import { useTrackViewportSize } from "@/utils/hooks/useTrackViewportSize";
import s from "./Layout.module.css";

export const ScreenSizeContext = createContext(null);

export function Layout() {
  const [screenSize, setScreenSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const layoutRef: RefObject<HTMLDivElement> = useRef(null);

  useTrackViewportSize(setScreenSize);

  return (
    <div
      className={s.layout}
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
