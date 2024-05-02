import s from "./Nav.module.css";
import { Link } from "react-router-dom";
import Logo from "../../../../components/Logo/Logo";

function Nav() {
  return (
    <div className={s.nav}>
      <Link to="/" className={s.pageTitle}>
        Featured Work
      </Link>
      <Logo />
    </div>
  );
}

export default Nav;
