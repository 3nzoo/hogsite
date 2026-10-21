import styles from "./HomeContent.module.css";

export default function Brand() {
  return (
    <a href="#experience" className={styles.brand} aria-label="House of Gyoza, back to the beginning">
      <span className={styles.brandArt} aria-hidden="true">
        <span className={styles.brandSymbol}><img src="/assets/logo.png" alt="" width={1393} height={1129} /></span>
        <span className={styles.brandWordmark}><img src="/assets/logo.png" alt="" width={1393} height={1129} /></span>
      </span>
    </a>
  );
}
