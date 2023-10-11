import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { useState, useEffect } from "react";
import { calcViewportSize } from "../../utils";

function Layout() {
  const [sectionHeight, setSectionHeight] = useState(window.innerHeight);

  useEffect(() => {
    calcViewportSize(setSectionHeight);
  }, []);

  return (
    <div
      className={styles.layoutContainer}
      style={{ height: `${sectionHeight}px` }}
    >
      <Outlet />
    </div>
  );
}

export default Layout;
