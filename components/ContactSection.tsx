import { contact, socialPages } from "@/lib/site-content";
import styles from "./HomeContent.module.css";

export default function ContactSection() {
  return (
    <section className={`${styles.section} ${styles.contactSection}`} id="find-us" aria-labelledby="contact-title">
      <div className={styles.contactCopy}>
        <h2 id="contact-title">Let’s talk <span>gyoza.</span></h2>
        <p>Ordering for yourself, feeding a crowd, or interested in becoming a distributor? We’d love to hear from you.</p>
        <div className={styles.contactLocation}>
          <h3>Visit our Quezon City store</h3>
          <p>In front of Fisher Mall (BDO), Roosevelt, Quezon City.</p>
          <p>Drop by the store, or message us for pickup and delivery within Quezon City.</p>
          <a className={styles.textLink} href={contact.map} target="_blank" rel="noopener noreferrer">Get directions <span aria-hidden="true">↗</span><span className="sr-only"> on Google Maps (opens in a new tab)</span></a>
        </div>
        <div className={styles.contactActions}>
          <a className={styles.contentButton} href={contact.viber}>Message on Viber <span aria-hidden="true">↗</span></a>
          <a className={styles.textLink} href={contact.telephone}>Call us <span aria-hidden="true">↗</span></a>
        </div>
        <address className={styles.contactDetails}>
          <a href={contact.telephone}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </address>
      </div>
      <div className={styles.socialPanel}>
        <h3>A little more House of Gyoza.</h3>
        <p>Follow along for flavors, food, and what’s cooking next.</p>
        <div className={styles.socialLinks}>
          {socialPages.map((page) => <a href={page.url} key={page.name} target="_blank" rel="noopener noreferrer">{page.name} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>)}
        </div>
        <div className={styles.qrLinks}>
          {socialPages.map((page) => (
            <a href={page.url} key={page.name} target="_blank" rel="noopener noreferrer" aria-label={`Open House of Gyoza on ${page.name} (opens in a new tab)`}>
              <img src={page.qr} alt={`QR code for House of Gyoza on ${page.name}`} width={540} height={540} loading="lazy" />
              <span>Scan for {page.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
