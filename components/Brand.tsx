import styles from "./HomeContent.module.css";

export default function Brand() {
  return (
    <a href="#experience" className={styles.brand} aria-label="House of Gyoza, back to the beginning">
      <span className={styles.brandArt} aria-hidden="true">
        <span className={styles.brandSymbol}><img src="/assets/logo.webp" alt="" width={768} height={622} decoding="async" /></span>
        <span className={styles.brandWordmark}><img src="/assets/logo.webp" alt="" width={768} height={622} decoding="async" /></span>
      </span>
    </a>
  );
}
