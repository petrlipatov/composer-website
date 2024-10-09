import { useIsMobile } from "@/utils/hooks/useIsMobile";
import { useContext } from "react";
import { FeaturedWorkContext } from "../FeaturedWorkContext";
import cn from "classnames";
import s from "./Content.module.css";

export const Content = ({ children }) => {
  const isMobile = useIsMobile();

  const { player } = useContext(FeaturedWorkContext);

  const content = cn(
    s.content,
    player.isOpened && isMobile ? s.mobilePlayerOpened : "",
    player.isOpened && !isMobile ? s.desktopPlayerOpened : ""
  );

  return <div className={content}>{children}</div>;
};
