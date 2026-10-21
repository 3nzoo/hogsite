import { contact, distributorUrl } from "@/lib/site-content";
import styles from "./HomeContent.module.css";

export function DistributorInvitation() {
  return (
    <aside className={styles.invitation} aria-label="Distributor opportunities in the Philippines">
      <p>Good food travels. <strong>Now welcoming distributors nationwide.</strong></p>
      <a href={distributorUrl}>Explore the opportunity <span aria-hidden="true">↗</span></a>
    </aside>
  );
}

export default function Distributors() {
  return (
    <section className={styles.distributors} id="distributors" aria-labelledby="distributor-title">
      <div className={styles.distributorCopy}>
        <p className={styles.regionLabel}>Let’s grow together</p>
        <h2 id="distributor-title">Your neighborhood.<br />Our next chapter.</h2>
        <p>Bring House of Gyoza’s homemade flavors to your community. We’re welcoming distributors across the Philippines to share the gyoza we make and the six signature flavors we’ve created. Explore available areas in Luzon, Visayas, and Mindanao.</p>
        <a className={`${styles.contentButton} ${styles.lightButton}`} href={distributorUrl}>Become a distributor <span aria-hidden="true">↗</span></a>
      </div>
      <div className={styles.distributorSteps}>
        <h3>Let’s find your area.</h3>
        <ol>
          <li><span>01</span><div><h4>Explore the map</h4><p>Look for available cities and municipalities.</p></div></li>
          <li><span>02</span><div><h4>Tell us where you’d like to grow</h4><p>Select your preferred areas and share your details.</p></div></li>
          <li><span>03</span><div><h4>Start a conversation</h4><p>Let’s talk about bringing House of Gyoza to your community.</p></div></li>
        </ol>
        <a href={contact.telephone} className={styles.distributorContact}>Have a question? Call {contact.phone} <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
