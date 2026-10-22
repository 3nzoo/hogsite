import ScrollExperience from "@/components/ScrollExperience";
import SiteHeader from "@/components/SiteHeader";
import MenuSection from "@/components/MenuSection";
import OurStory from "@/components/OurStory";
import Distributors, { DistributorInvitation } from "@/components/Distributors";
import ContactSection from "@/components/ContactSection";
import Brand from "@/components/Brand";
import { distributorUrl } from "@/lib/site-content";
import styles from "@/components/HomeContent.module.css";

export default function Home() {
  return <>
    <a className="skip-link" href="#menu">Skip the animated experience</a>
    <SiteHeader />
    <main>
      <ScrollExperience />
      <div className={styles.content}>
        <DistributorInvitation />
        <MenuSection />
        <OurStory />
        <Distributors />
        <ContactSection />
      </div>
    </main>
    <footer className={styles.footer}>
      <Brand />
      <div className={styles.footerLinks}>
        <a href="#menu">Our menu</a>
        <a href={distributorUrl}>Become a distributor <span aria-hidden="true">↗</span></a>
        <a href="#experience">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  </>;
}
