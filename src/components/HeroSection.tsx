import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { aboutMe } from "../lib/data";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // We check for < 768px now since tablets (md:) will use the 2-column layout
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 18,
  });

  const desktopOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const desktopOrbY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const desktopTextY = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);
  const desktopImageY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);

  const shouldReduceMotion = useReducedMotion();

  const handleScrollDown = () => {
    const projectsSection = document.getElementById("work");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollBy({ top: window.innerHeight, left: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef as any}
      // Fixed height/padding issues. Tablets and up get standard centering.
      className="relative w-full min-h-svh flex items-start md:items-center justify-center pt-[140px] pb-24 md:pt-0 md:pb-0 overflow-hidden"
      style={{ backgroundColor: "#0B0C10" }}
      aria-label="Hero Section"
    >
      {/* ---- HIGH PERFORMANCE ACCENT LIGHTING ----
        Removed blur-[130px] entirely. Replaced with raw, low-opacity radial gradients. 
        This completely eliminates the GPU bottleneck.
      */}
      <motion.div
        className="absolute -left-20 top-10 md:top-36 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(197,248,42,0.15) 0%, transparent 60%)",
          y: isMobile ? 0 : desktopOrbY,
        }}
        aria-hidden
      />
      <motion.div
        className="absolute -right-20 bottom-10 md:bottom-12 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(138,43,226,0.1) 0%, transparent 60%)",
          y: isMobile ? 0 : desktopOrbY,
        }}
        aria-hidden
      />

      {/* ---- Content container ---- */}
      <motion.div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20"
        style={{ opacity: isMobile ? 1 : desktopOpacity }}
      >
        {/* ---- HIGH PERFORMANCE SVG BACKGROUND ----
          Removed filter: blur() and mix-blend-screen. Now using sharp, brutalist grid lines.
        */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20 md:opacity-40"
          aria-hidden
        >
          <motion.path
            d="M 0 30 L 100 30 M 0 70 L 100 70 M 30 0 L 30 100 M 70 0 L 70 100"
            stroke="#C5F82A"
            strokeWidth={0.1}
            fill="none"
            strokeDasharray="2 2"
          />
        </svg>

        {/* ---- RESPONSIVE GRID ----
          Changed lg:grid-cols-2 to md:grid-cols-2 to fix the tablet stacking issue.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          {/* LEFT: Typography */}
          <motion.div
            className="text-center md:text-left flex flex-col"
            style={{ y: isMobile ? 0 : desktopTextY }}
          >
            <div className="relative inline-block self-center md:self-start mb-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.25, once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-clash text-white tracking-tight relative z-10 uppercase"
                style={{
                  /* Calibrated clamp specifically for tablets */
                  fontSize: "clamp(3rem, 6vw + 1rem, 7rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                  marginBottom: "0.25rem",
                }}
              >
                {aboutMe.name}
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.25, once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-clash text-stroke text-[#E0E0E0] tracking-tight relative z-10 uppercase"
                style={{
                  fontSize: "clamp(3rem, 6vw + 1rem, 7rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                }}
              >
                {aboutMe.lastName}
              </motion.h2>
            </div>

            <motion.p
              className="mt-4 text-[#E0E0E0] max-w-xl mx-auto md:mx-0 text-sm md:text-base lg:text-lg relative z-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2, once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {aboutMe.heroText}
            </motion.p>

            {/* Technical Snippets - Refined padding for tablet wrapping */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col items-center md:items-start gap-3 relative z-10"
            >
              <TechnicalSnippet
                code="const [state, setState] = useState()"
                delay={0.4}
              />
              <TechnicalSnippet
                code="SELECT * FROM creativity WHERE passion = true;"
                delay={0.5}
              />
            </motion.div>
          </motion.div>

          {/* RIGHT: Brutalist Headshot */}
          <motion.div
            className="relative flex justify-center items-center mt-6 md:mt-0"
            style={{ y: isMobile ? 0 : desktopImageY }}
          >
            <div className="relative w-full max-w-[320px] md:max-w-[420px]">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.3, once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative z-10"
              >
                {/* ---- NEO-BRUTALIST IMAGE STYLING ----
                  Replaced the soft gradient fade mask with a sharp border and hard shadow.
                */}
                <img
                  src={aboutMe.image}
                  alt="Davies Ajayi"
                  loading="eager"
                  className="w-full h-auto grayscale brightness-[0.8] contrast-125 border-2 border-[#12141A]"
                  style={{
                    boxShadow: "8px 8px 0px rgba(197, 248, 42, 0.8)",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ---- CLICKABLE CYBER-MAGNETIC SCROLL INDICATOR ---- */}
      <motion.div
        className="absolute bottom-[-6px] md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[100] cursor-pointer group"
        style={{ opacity: isMobile ? 1 : desktopOpacity }}
        onClick={handleScrollDown}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300">
          <span className="text-[#C5F82A]">[</span>
          <span className="text-[#E0E0E0]">SYS.SCROLL</span>
          <span className="text-[#C5F82A]">]</span>
        </div>

        {/* Brutalist Pill */}
        <div className="relative flex flex-col items-center mt-1">
          <div className="w-[24px] h-[36px] border-2 border-[#E0E0E0]/20 bg-[#12141A] flex justify-center pt-1 transition-all duration-300 group-hover:border-[#C5F82A]">
            <motion.div
              className="w-[4px] h-[4px] bg-[#C5F82A]"
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { y: [0, 16, 24], opacity: [1, 1, 0] }
              }
              transition={
                shouldReduceMotion
                  ? {}
                  : { duration: 1.5, repeat: Infinity, ease: "circIn" }
              }
            />
          </div>
          {/* Sharp connector line */}
          <div className="w-[2px] h-6 bg-[#C5F82A]/50 mt-1 group-hover:bg-[#C5F82A] transition-colors" />
        </div>
      </motion.div>
    </section>
  );
};

// ----- Helper Component for Code Snippets -----
interface TechnicalSnippetProps {
  code: string;
  delay: number;
}

const TechnicalSnippet: React.FC<TechnicalSnippetProps> = ({ code, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      // Updated to utilize our brutalist `.glass` class effectively
      className="glass px-3 py-2 text-left w-fit max-w-full overflow-hidden"
    >
      <span className="text-[#C5F82A] font-mono text-xs mr-2">{">"}</span>
      <code className="text-[#E0E0E0] text-[10px] sm:text-xs font-mono tracking-wide break-words whitespace-pre-wrap">
        {code}
      </code>
    </motion.div>
  );
};

export default HeroSection;
