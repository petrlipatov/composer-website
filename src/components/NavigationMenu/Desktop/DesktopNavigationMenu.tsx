import { Link } from "react-router-dom";
import s from "./DesktopNavigationMenu.module.css";
import cn from "classnames";
import { PAGES } from "../../../utils/constants";

const DesktopNavigationMenu = ({ children }) => {
  let currentPage: PAGES;

  switch (children) {
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
    <div className={s.nav}>
      <div className={cn(s.linkNav)}>Showreel</div>
      <Link
        to="/work"
        className={cn(
          s.linkNav,
          currentPage === PAGES.featured ? s.active : ""
        )}
      >
        Featured Work
      </Link>
      <Link
        to="/pieces"
        className={cn(s.linkNav, currentPage === PAGES.pieces ? s.active : "")}
      >
        Pieces
      </Link>
      <Link
        to="/info"
        className={cn(s.linkNav, currentPage === PAGES.info ? s.active : "")}
      >
        Info
      </Link>
    </div>
  );
};

export default DesktopNavigationMenu;
