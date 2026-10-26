"use client";

import { useEffect, useRef, useState } from "react";
import { GYOZA_COUNT, pinwheelPosition, type Point } from "@/lib/gyoza-layout";
import { decodeExperienceImages, experienceAssets } from "@/lib/experience-assets";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

// Keep the plate, landing positions, and garnish aligned as the served scene moves left.
const PLATE_OFFSET_X = -5;
const plateOffsetX = `${PLATE_OFFSET_X}%`;

const dumplings: { from: Point; to: Point; selected: boolean }[] = Array.from(
  { length: GYOZA_COUNT },
  (_, index) => ({
    from: pinwheelPosition(index),
    to: pinwheelPosition(index, 55 + PLATE_OFFSET_X, 55),
    selected: index === GYOZA_COUNT - 1,
  }),
);

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const mix = (from: number, to: number, value: number) => from + (to - from) * value;

function transferProgress(progress: number, index: number) {
  const start = 0.265 + index * 0.022;
  const end = 0.49 + index * 0.022;
  return smooth((progress - start) / (end - start));
}

function dumplingPosition(progress: number, index: number) {
  const dumpling = dumplings[index];
  const transfer = transferProgress(progress, index);
  // The photographed grip is complete at .79; pause before lifting at .84.
  const lift = dumpling.selected ? smooth((progress - 0.84) / 0.14) : 0;
  const x = mix(dumpling.from.x, dumpling.to.x, transfer);
  const y = mix(dumpling.from.y, dumpling.to.y, transfer) - Math.sin(transfer * Math.PI) * 12;
  const rotation = mix(dumpling.from.rotation, dumpling.to.rotation, transfer);

  return {
    x: mix(x, 34, lift),
    y: mix(y, 53, lift) - Math.sin(lift * Math.PI) * 3,
    rotation: mix(rotation, 0, lift),
    scale: mix(1, 2.05, lift) + Math.sin(transfer * Math.PI) * 0.08,
    opacity: dumpling.selected ? 1 : 1 - smooth((progress - 0.86) / 0.11),
  };
}

function Gyoza({ progress, index, reduced }: { progress: MotionValue<number>; index: number; reduced: boolean }) {
  const selected = !!dumplings[index].selected;
  const left = useTransform(progress, (p) => `${dumplingPosition(reduced ? 0.65 : p, index).x}%`);
  const top = useTransform(progress, (p) => `${dumplingPosition(reduced ? 0.65 : p, index).y}%`);
  const rotation = useTransform(progress, (p) => dumplingPosition(reduced ? 0.65 : p, index).rotation);
  const scale = useTransform(progress, (p) => dumplingPosition(reduced ? 0.65 : p, index).scale);
  const opacity = useTransform(progress, (p) => dumplingPosition(reduced ? 0.65 : p, index).opacity);
  const shadow = useTransform(progress, [0, 0.3, 0.42, 0.63, 0.84, 0.98], [5, 5, 10, 3, 3, 12]);
  const cookedOpacity = useTransform(progress, (p) => reduced ? 1 : smooth((p - 0.12) / 0.13));
  const frozenOpacity = useTransform(cookedOpacity, (cooked) => 1 - cooked);
  // Hand, sticks and food share one photograph and one transform: contact cannot drift.
  const gripOpacity = useTransform(progress, (p) => selected && !reduced ? smooth((p - 0.74) / 0.05) : 0);
  const flip = useTransform(progress, (p) => reduced ? 1 : smooth((transferProgress(p, index) - 0.25) / 0.5));
  // These are flat photographs: a full rotateX turn collapses them to a line.
  // Keep their volume as the wrapper turns into the golden-side-up photograph.
  const flipScaleY = useTransform(flip, (value) => 1 - Math.sin(value * Math.PI) * 0.28);
  const flipTilt = useTransform(flip, (value) => -Math.sin(value * Math.PI) * 8);
  const frontFace = useTransform(flip, (value) => 1 - smooth((value - 0.42) / 0.16));
  const backFace = useTransform(frontFace, (value) => 1 - value);
  const cookedFrontOpacity = useTransform(() => cookedOpacity.get() * frontFace.get());
  const goldenOpacity = useTransform(() => backFace.get() * (1 - gripOpacity.get()));
  const filter = useTransform(() => {
    const size = reduced ? 3 : shadow.get();
    return `drop-shadow(0 ${size}px ${size * 1.4}px rgba(35, 19, 13, 0.24))`;
  });

  return (
    <motion.div
      className={`experience-gyoza${dumplings[index].selected ? " experience-gyoza-selected" : ""}`}
      style={{
        position: "absolute",
        width: "23%",
        aspectRatio: "1",
        left,
        top,
        x: "-50%",
        y: "-50%",
        opacity,
        zIndex: selected ? 10 : 5 + index,
      }}
    >
      <motion.div
        className="experience-gyoza-images"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          rotate: rotation,
          scale,
          filter,
        }}
      >
        <motion.div style={{ position: "absolute", inset: 0, scaleY: flipScaleY, rotate: flipTilt, transformOrigin: "50% 57%" }}>
        <motion.img
          className="experience-gyoza-image experience-gyoza-frozen"
          {...experienceAssets.frozen}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
          draggable={false}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", opacity: frozenOpacity }}
        />
        <motion.img
          className="experience-gyoza-image experience-gyoza-cooked"
          {...experienceAssets.cooked}
          alt=""
          loading="eager"
          decoding="async"
          draggable={false}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", opacity: cookedFrontOpacity }}
        />
        <motion.img
          className="experience-gyoza-image experience-gyoza-golden"
          {...experienceAssets.golden}
          alt=""
          loading="eager"
          decoding="async"
          draggable={false}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", opacity: goldenOpacity }}
        />
        </motion.div>
        {selected && (
          <motion.img
            className="experience-hand-grip"
            {...experienceAssets.grip}
            alt=""
            loading="eager"
            decoding="async"
            draggable={false}
            style={{ opacity: gripOpacity }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ScrollExperience() {
  const section = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [stage, setStage] = useState(0);
  const [assetState, setAssetState] = useState<"loading" | "ready" | "error">("loading");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const ready = assetState === "ready";
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });

  useEffect(() => {
    if (!scene.current) return;
    let cancelled = false;
    // A slow or failed request must leave the rest of the website usable.
    const timeout = window.setTimeout(() => {
      if (!cancelled) setAssetState("error");
    }, 15000);

    decodeExperienceImages(Array.from(scene.current.querySelectorAll("img")))
      .then(() => {
        if (!cancelled) setAssetState("ready");
      })
      .catch(() => {
        if (!cancelled) setAssetState("error");
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [loadAttempt]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextStage = value < 0.35 ? 0 : value < 0.72 ? 1 : 2;
    setStage((current) => (current === nextStage ? current : nextStage));
  });

  useEffect(() => {
    if (reduced) setStage(1);
  }, [reduced]);

  const firstOpacity = useTransform(scrollYProgress, (p) => reduced ? 0 : 1 - smooth((p - 0.27) / 0.08));
  const secondOpacity = useTransform(scrollYProgress, (p) => reduced ? 1 : smooth((p - 0.29) / 0.08) * (1 - smooth((p - 0.65) / 0.08)));
  const thirdOpacity = useTransform(scrollYProgress, (p) => reduced ? 0 : smooth((p - 0.67) / 0.08));
  const firstY = useTransform(scrollYProgress, [0.27, 0.35], [0, -24]);
  const secondY = useTransform(scrollYProgress, [0.29, 0.37, 0.65, 0.73], [24, 0, 0, -24]);
  const thirdY = useTransform(scrollYProgress, [0.67, 0.75], [24, 0]);

  const panX = useTransform(scrollYProgress, [0, 0.38, 0.65, 1], ["0%", "0%", "-112%", "-112%"]);
  const panRotate = useTransform(scrollYProgress, [0, 0.38, 0.65], [0, 0, -24]);
  const panOpacity = useTransform(scrollYProgress, (p) => reduced ? 0 : 1 - smooth((p - 0.47) / 0.16));
  const sizzleOpacity = useTransform(scrollYProgress, (p) => reduced ? 0 : 1 - smooth((p - 0.26) / 0.18));
  const plateX = useTransform(scrollYProgress, [0, 0.24, 0.47], ["82%", "82%", plateOffsetX]);
  const plateOpacity = useTransform(scrollYProgress, (p) => reduced ? 1 : smooth((p - 0.2) / 0.12) * (1 - smooth((p - 0.87) / 0.1)));
  const plateRotate = useTransform(scrollYProgress, [0.24, 0.47, 1], [17, 0, 0]);
  const plateScale = useTransform(scrollYProgress, [0.84, 1], [1, 1.14]);
  const garnishOpacity = useTransform(scrollYProgress, (p) => reduced ? 1 : smooth((p - 0.43) / 0.16) * (1 - smooth((p - 0.86) / 0.08)));
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Finish the cue's fade during the grip pause, before the hand starts lifting.
  const scrollCueOpacity = useTransform(scrollYProgress, (p) => 1 - smooth((p - 0.79) / 0.05));
  const scrollCueVisibility = useTransform(scrollYProgress, (p) => p >= 0.84 ? "hidden" : "visible");

  const activeStage = reduced ? 1 : stage;
  const ServeHeading = reduced ? "h1" : "h2";

  function goTo(progress: number) {
    if (!section.current) return;
    const top = section.current.getBoundingClientRect().top + window.scrollY;
    const length = Math.max(0, section.current.offsetHeight - window.innerHeight);
    window.scrollTo({ top: top + length * progress, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <section ref={section} className={`scroll-experience${reduced ? " is-reduced-motion" : ""}`} id="experience" aria-label="From pan to plate">
      <noscript><style>{".experience-scene{opacity:1}.experience-loading,.experience-chapters,.experience-follow:disabled{display:none}"}</style></noscript>
      <p className="sr-only">Scroll to follow five plump white frozen gyoza arranged in an evenly spaced pinwheel in a sizzling cast iron pan. They flip during the transfer and land in the same arrangement on a plate with their crispy golden-brown bases facing up. A hand grips one with wooden chopsticks, pauses, then lifts it closer.</p>
      <div className="experience-sticky">
        <div className="experience-copy">
          <div className="experience-copy-stack">
            <motion.div className="experience-stage-copy" style={{ opacity: firstOpacity, y: reduced ? 0 : firstY, pointerEvents: activeStage === 0 ? "auto" : "none" }} aria-hidden={activeStage !== 0}>
              <h1>CRISP OUTSIDE.<br /><em>COMFORT INSIDE.</em></h1>
              <p>Homemade gyoza with a golden crunch, juicy fillings, and flavors you’ll keep coming back for.</p>
            </motion.div>
            <motion.div className="experience-stage-copy" style={{ opacity: secondOpacity, y: reduced ? 0 : secondY, pointerEvents: activeStage === 1 ? "auto" : "none" }} aria-hidden={activeStage !== 1}>
              <ServeHeading>FROM OUR PAN.<br /><em>TO YOUR PLATE.</em></ServeHeading>
              <p>A crispy little celebration, made to pass around. Good food tastes even better together.</p>
            </motion.div>
            <motion.div className="experience-stage-copy" style={{ opacity: thirdOpacity, y: reduced ? 0 : thirdY, pointerEvents: activeStage === 2 ? "auto" : "none" }} aria-hidden={activeStage !== 2}>
              <h2>GO ON.<br /><em>TAKE A BITE.</em></h2>
              <p>The crunch. The juicy center. That one-more-bite feeling. This is a little taste of home.</p>
            </motion.div>
          </div>
          <div className="experience-actions">
            {activeStage === 2 || reduced ? (
              <a className="experience-follow" href="#our-story">Meet House of Gyoza <span aria-hidden="true">↗</span></a>
            ) : (
              <button type="button" className="experience-follow" disabled={!ready} onClick={() => goTo(activeStage === 0 ? 0.64 : 0.96)}>{activeStage === 0 ? "Follow the flavor" : "Take the first bite"}<span aria-hidden="true">↓</span></button>
            )}
            <a className="experience-story" href="#our-story">Our story <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="experience-art">
          {!ready && (
            <div className="experience-loading" role="status" aria-live="polite">
              {assetState === "loading" && <span className="experience-loading-mark" aria-hidden="true" />}
              <p>{assetState === "error" ? "A little longer on the stove." : "Warming up the pan…"}</p>
              <div className="experience-loading-actions">
                {assetState === "error" && (
                  <button type="button" onClick={() => {
                    setAssetState("loading");
                    setLoadAttempt((attempt) => attempt + 1);
                  }}>Try again</button>
                )}
                <a href="#menu">Explore our menu <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          )}
          <div ref={scene} key={loadAttempt} className="experience-scene" data-ready={ready} aria-hidden="true">
          <div className="experience-art-orbit" />
          <div className="experience-art-orbit experience-art-orbit-inner" />
          <motion.div className="experience-pan-layer" style={{ position: "absolute", inset: 0, x: panX, rotate: panRotate, opacity: panOpacity, zIndex: 2 }}>
            <img {...experienceAssets.pan} className="experience-pan-image" alt="" loading="eager" decoding="async" fetchPriority="high" draggable={false} style={{ position: "absolute", left: "4%", top: "3%", width: "92%", height: "92%", objectFit: "contain", filter: "drop-shadow(16px 30px 24px rgba(55, 23, 13, 0.21))" }} />
            <motion.div className="experience-sizzle" style={{ position: "absolute", inset: 0, opacity: sizzleOpacity }}>
              {Array.from({ length: 24 }, (_, index) => {
                const angle = index * 2.39996;
                const radius = 14 + (index % 5) * 2.5;
                const size = 6 + (index % 3) * 3;
                // Stable precision keeps server and mobile style serialization aligned.
                const left = Number((44.5 + Math.cos(angle) * radius).toFixed(4));
                const top = Number((55.4 + Math.sin(angle) * radius).toFixed(4));
                const delay = ((index % 9) * -19) / 100;
                const duration = (90 + (index % 4) * 15) / 100;
                return <i key={index} className="sizzle-bubble" style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, animationDelay: `${delay}s`, animationDuration: `${duration}s` }} />;
              })}
            </motion.div>
          </motion.div>

          <motion.div className="experience-plate-layer" style={{ position: "absolute", inset: 0, x: reduced ? plateOffsetX : plateX, rotate: reduced ? 0 : plateRotate, scale: reduced ? 1 : plateScale, opacity: plateOpacity, zIndex: 3 }}>
            <img {...experienceAssets.plate} className="experience-plate-image" alt="" loading="eager" decoding="async" draggable={false} style={{ position: "absolute", left: "12%", top: "12%", width: "86%", height: "86%", objectFit: "contain", filter: "drop-shadow(12px 24px 20px rgba(55, 23, 13, 0.15))" }} />
          </motion.div>

          <motion.div className="experience-garnish" style={{ position: "absolute", inset: 0, x: plateOffsetX, opacity: garnishOpacity, zIndex: 7 }}>
            <i className="scallion" style={{ left: "44%", top: "51%", rotate: "23deg" }} /><i className="scallion" style={{ left: "62%", top: "67%", rotate: "-28deg" }} /><i className="scallion" style={{ left: "57%", top: "35%", rotate: "76deg" }} />
            <i className="sesame" style={{ left: "52%", top: "45%", rotate: "25deg" }} /><i className="sesame" style={{ left: "66%", top: "55%", rotate: "-35deg" }} /><i className="sesame" style={{ left: "48%", top: "66%", rotate: "70deg" }} /><i className="sesame" style={{ left: "36%", top: "60%", rotate: "-40deg" }} />
          </motion.div>

          {dumplings.map((_, index) => <Gyoza key={index} index={index} progress={scrollYProgress} reduced={reduced} />)}

          </div>
        </div>

        <div className="experience-controls">
          {ready && !reduced && (
            <motion.button
              type="button"
              className="experience-scroll-cue"
              style={{ opacity: scrollCueOpacity, visibility: scrollCueVisibility }}
              aria-label="Scroll down to follow the gyoza"
              onClick={() => goTo(Math.min(scrollYProgress.get() + 0.24, 0.96))}
            >
              <span className="experience-scroll-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 6 6 6 6-6M6 12l6 6 6-6" />
                </svg>
              </span>
              <span>Scroll down</span>
            </motion.button>
          )}
          <nav className="experience-chapters" aria-label="Gyoza story chapters">
            {[
              { label: "Sizzle", offset: 0.04 },
              { label: "Serve", offset: 0.64 },
              { label: "Savor", offset: 0.99 },
            ].map((chapter, index) => (
              <button key={chapter.label} type="button" className={activeStage === index ? "is-active" : ""} aria-pressed={activeStage === index} disabled={!ready} onClick={() => goTo(chapter.offset)}>{chapter.label}</button>
            ))}
            <div className="experience-progress" aria-hidden="true"><motion.div style={{ scaleX: reduced ? 1 : progressScale, transformOrigin: "0% 50%" }} /></div>
          </nav>
        </div>
      </div>
    </section>
  );
}
