import { Link } from "react-router-dom";
import cn from "classnames";
import { PAGES } from "@/utils/constants";
import s from "./DesktopNavigationMenu.module.css";

export const DesktopNavigationMenu = ({ children }) => {
  let currentPage: PAGES;

  switch (children) {
    case PAGES.home:
      currentPage = PAGES.home;
      break;
    case PAGES.featured:
      currentPage = PAGES.featured;
      break;
    case PAGES.pieces:
      currentPage = PAGES.pieces;
      break;
    case PAGES.info:
      currentPage = PAGES.info;
      break;
  }

  return (
    <nav className={s.nav}>
      <Link
        to="/"
        className={cn(s.linkNav, currentPage === PAGES.home ? s.active : "")}
      >
        {PAGES.home}
      </Link>

      <Link
        to="/work"
        className={cn(
          s.linkNav,
          currentPage === PAGES.featured ? s.active : ""
        )}
      >
        {PAGES.featured}
      </Link>
      <Link
        to="/pieces"
        className={cn(s.linkNav, currentPage === PAGES.pieces ? s.active : "")}
      >
        {PAGES.pieces}
      </Link>
      <Link
        to="/info"
        className={cn(s.linkNav, currentPage === PAGES.info ? s.active : "")}
      >
        {PAGES.info}
      </Link>
    </nav>
  );
};
