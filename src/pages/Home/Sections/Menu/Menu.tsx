import { Link } from "react-router-dom";
import s from "./Menu.module.css";

const Menu = ({ openPopup }: { openPopup: () => void }) => {
  return (
    <div className={s.nav}>
      <div className={s.link} onClick={openPopup}>
        Showreel
      </div>
      <Link to="work" className={s.link}>
        Featured Work
      </Link>
      <Link to="pieces" className={s.link}>
        Pieces
      </Link>
      <Link to="info" className={s.link}>
        Info
      </Link>
    </div>
  );
};

export default Menu;
