import styles from "./Portfolio.module.css";
import { Link } from "react-router-dom";
import nameSrc from "../../assets/images/name.svg";
import titleSrc from "../../assets/images/title.svg";
import Toggler from "./Toggler/Toggler";

function Portfolio() {
  return (
    <div className={styles.page}>
      <div className={styles.headerSection}>
        <Link to="/" className={styles.nameContainer}>
          <img className={styles.name} src={nameSrc} alt="name" />
          <img className={styles.title} src={titleSrc} alt="title" />
        </Link>
      </div>

      <div className={styles.togglerSection}>
        <Toggler />
      </div>
    </div>
  );
}

export default Portfolio;
