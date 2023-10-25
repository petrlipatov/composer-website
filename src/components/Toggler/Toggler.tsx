import styles from "./Toggler.module.css";

function Toggler() {
  return (
    <div className={styles.container} data-animate="links">
      {/* <img className={styles.pieces} src={piecesSrc} alt="pieces-link" /> */}
      <p className={styles.text}>PIECES</p>

      <div className={styles.divider} />

      <div className={styles.featuredWorkContainer}>
        {/* <img
          className={styles.featured}
          src={featuredSrc}
          alt="featured-link"
        /> */}
        <p className={styles.text}>FEATURED WORK</p>

        {/* <img className={styles.work} src={workSrc} alt="work-link" /> */}
      </div>
    </div>
  );
}

export default Toggler;
