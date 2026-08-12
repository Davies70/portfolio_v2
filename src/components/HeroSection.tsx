import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { aboutMe } from "../lib/data";

const TRUST_SIGNALS = [
  "React / TypeScript / Node",
  "AWS + PostgreSQL",
  "Germany / Remote-ready",
];

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });

  const contentOpacity = useTransform(smoothProgress, [0, 0.55], [1, 0.92]);
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "-10%"]);
  const imageY = useTransform(smoothProgress, [0, 1], ["0%", "8%"]);

  const handleScrollDown = () => {
    const workSection = document.getElementById("work");
    workSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-svh w-full items-center overflow-hidden bg-portfolio-bg pt-28 pb-16 md:pt-24"
      aria-label="Hero Section"
    >
      <div className="absolute inset-0 noise opacity-25 pointer-events-none" />

      <motion.div
        className="section-container relative z-10 grid grid-cols-1 items-center gap-12 px-6 md:grid-cols-[1.08fr_0.92fr] md:px-12 lg:px-20"
        style={{
          opacity: contentOpacity,
          y: shouldReduceMotion ? 0 : textY,
        }}
      >
        <div className="max-w-3xl text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.22em] text-portfolio-accent"
          >
            Full-stack developer / React / Cloud
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="mb-6"
          >
            <h1
              className="font-clash text-white uppercase"
              style={{
                fontSize: "clamp(3.2rem, 8vw, 7.4rem)",
                lineHeight: 0.92,
                letterSpacing: "0",
              }}
            >
              {aboutMe.name}
            </h1>
            <h2
              className="font-clash text-stroke text-portfolio-fg uppercase"
              style={{
                fontSize: "clamp(3.2rem, 8vw, 7.4rem)",
                lineHeight: 0.92,
                letterSpacing: "0",
              }}
            >
              {aboutMe.lastName}
            </h2>
          </motion.div>

          <motion.p
            className="mx-auto max-w-2xl text-base leading-8 text-portfolio-fg md:mx-0 md:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            {aboutMe.heroText}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row md:items-start"
          >
            <a
              href="#work"
              className="glow-accent w-full px-6 py-3 text-center font-mono text-xs font-bold uppercase tracking-[0.14em] transition sm:w-auto"
            >
              View Work
            </a>
            <a
              href={`mailto:${aboutMe.email}`}
              className="w-full border border-portfolio-fg/20 bg-portfolio-surface px-6 py-3 text-center font-mono text-xs font-bold uppercase tracking-[0.14em] text-portfolio-fg transition hover:border-portfolio-accent hover:text-portfolio-accent sm:w-auto"
            >
              Contact
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="mt-8 grid gap-2 sm:grid-cols-3"
            aria-label="Portfolio credibility signals"
          >
            {TRUST_SIGNALS.map((signal) => (
              <div
                key={signal}
                className="border border-portfolio-fg/10 bg-portfolio-surface/70 px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-portfolio-muted font-mono md:text-left"
              >
                {signal}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[360px] md:max-w-[430px]"
          style={{ y: shouldReduceMotion ? 0 : imageY }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute -inset-4 border border-portfolio-fg/10" />
          <img
            src={aboutMe.image}
            alt="Davies Ajayi"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="relative w-full border border-portfolio-fg/15 grayscale contrast-110"
            style={{ boxShadow: "0 24px 90px rgba(0, 0, 0, 0.45)" }}
          />
        </motion.div>
      </motion.div>

      <button
        type="button"
        onClick={handleScrollDown}
        className="absolute cursor-pointer bottom-6 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-portfolio-muted transition hover:text-portfolio-accent"
      >
        Scroll to work
      </button>
    </section>
  );
};

export default HeroSection;
