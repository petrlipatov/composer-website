import { useState, useLayoutEffect } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 720px)").matches);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

export default useIsMobile;
