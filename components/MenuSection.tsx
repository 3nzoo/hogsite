import { flavors } from "@/lib/site-content";
import styles from "./HomeContent.module.css";

export default function MenuSection() {
  return (
    <section className={`${styles.section} ${styles.menuSection}`} id="menu" aria-labelledby="menu-title">
      <div className={styles.sectionHeading}>
        <h2 id="menu-title">Find your <span>favorite.</span></h2>
        <p>Homemade by us, with six signature flavors to choose from. Find your classic comfort or a new favorite.</p>
      </div>
      <div className={styles.menuGrid}>
        {flavors.map((flavor) => (
          <article className={styles.menuCard} key={flavor.name}>
            <div className={styles.foodImage}>
              <img className={flavor.name === "Crispy Pork" ? styles.porkPhoto : undefined} src={flavor.image} srcSet={`${flavor.image.replace('.webp', '-600.webp')} 600w, ${flavor.image} 1200w`} sizes="(max-width: 520px) 86vw, (max-width: 900px) 43vw, (max-width: 1440px) 29vw, 400px" alt={flavor.alt} width={flavor.width} height={flavor.height} loading="lazy" decoding="async" />
            </div>
            <h3>{flavor.name}</h3>
            <p>{flavor.description}</p>
          </article>
        ))}
      </div>
      <div className={styles.servingOptions} aria-label="Ways to enjoy our gyoza">
        <div><h3>Just for you</h3><p>A freshly cooked serving for your everyday cravings.</p></div>
        <div><h3>For the whole table</h3><p>Gyoza platters made for gatherings and good company.</p></div>
        <div><h3>For your freezer</h3><p>Frozen packs, ready for your next gyoza moment at home.</p></div>
      </div>
    </section>
  );
}
