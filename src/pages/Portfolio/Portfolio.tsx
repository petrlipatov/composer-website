import styles from "./Portfolio.module.css";
import nameSrc from "../../assets/images/name.svg";
import titleSrc from "../../assets/images/title.svg";

function Portfolio() {
  return (
    <div className={styles.container}>
      <img
        className={styles.name}
        src={nameSrc}
        alt="name"
        data-animate="name"
      />
      <img
        className={styles.title}
        src={titleSrc}
        alt="title"
        data-animate="title"
      />
      <h1>Portfolio</h1>
    </div>
  );
}

export default Portfolio;
