import s from "./Header.module.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Header({ children }) {
  return (
    <div className={s.nav}>
      <Link to="/" className={s.pageTitle}>
        {children}
      </Link>
      <Logo />
    </div>
  );
}

export default Header;
