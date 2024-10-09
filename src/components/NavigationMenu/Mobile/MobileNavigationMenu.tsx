import { Link } from "react-router-dom";
import s from "./MobileNavigationMenu.module.css";

export const MobileNavigationMenu = ({ children }) => {
  return (
    <Link to="/" className={s.nav}>
      {children}
    </Link>
  );
};
