"use client";

import { useEffect, useRef, useState } from "react";
import Brand from "./Brand";
import { distributorUrl } from "@/lib/site-content";
import styles from "./HomeContent.module.css";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) navigation.current?.querySelector("a")?.focus();
  }, [open]);

  return (
    <header className={styles.header} onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }}>
      <Brand />
      <nav ref={navigation} id="main-navigation" className={styles.navigation} data-open={open} aria-label="Main navigation">
        <a href="#menu" onClick={() => setOpen(false)}>Our menu</a>
        <a href="#our-story" onClick={() => setOpen(false)}>Our story</a>
        <a href="#find-us" onClick={() => setOpen(false)}>Find us</a>
      </nav>
      <a className={styles.headerCta} href={distributorUrl} aria-label="Become a House of Gyoza distributor">
        <span className={styles.desktopCta}>Become a distributor</span>
        <span className={styles.mobileCta}>Distributors</span>
        <span aria-hidden="true">↗</span>
      </a>
      <button ref={toggle} className={styles.menuToggle} type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>
        {open ? <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg> : <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg>}
      </button>
    </header>
  );
}
