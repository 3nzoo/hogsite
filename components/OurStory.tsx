import styles from "./HomeContent.module.css";

export default function OurStory() {
  return (
    <section className={styles.story} id="our-story" aria-labelledby="story-title">
      <div className={styles.storyPhoto}>
        <img src="/assets/brand/our-story.webp" alt="Preparing gyoza at a House of Gyoza stall" width={1862} height={845} loading="lazy" decoding="async" />
      </div>
      <div className={styles.storyCopy}>
        <h2 id="story-title">Homemade.<br /><span>From the start.</span></h2>
        <p>House of Gyoza began with homemade pork gyoza: a golden, crispy bite, a savory center, and the joy of sharing something we made ourselves.</p>
        <p>We make our own gyoza and develop the flavors we love. What started with pork grew into six signature favorites, from cheesy pizza beef to creamy garlic spinach and shrimp with a Cajun kick. Each one brings a little of our kitchen to your table.</p>
        <a className={styles.textLink} href="#menu">Find your next favorite <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
