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

  // Hydration-safe mobile detection for parallax scaling
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Increased mobile breakpoint to 1024px to catch tablets in portrait
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ----- Scroll setup (scoped to this section) -----
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start start" = when top of Hero hits top of viewport
    // "end start" = when bottom of Hero hits top of viewport
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 18,
  });

  // --- Advanced Scroll Parallax Animations ---

  // On desktop, we use parallax. On mobile, we'll pass static values to avoid scroll glitches.
  const desktopOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const desktopOrbY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const desktopTextY = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);
  const desktopImageY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const desktopImageScale = useTransform(smoothProgress, [0, 1], [1, 0.9]);

  const shouldReduceMotion = useReducedMotion();

  const orbStyle = {
    willChange: "transform, opacity",
  } as const;

  // ----- UPDATED Scroll Click Handler -----
  const handleScrollDown = () => {
    const projectsSection = document.getElementById("work");

    if (projectsSection) {
      // Scrolls directly to the top of the element with id="work"
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Safe fallback just in case the ID changes or hasn't rendered
      window.scrollBy({ top: window.innerHeight, left: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef as any}
      // items-start & pt-[140px] for mobile navbar clearance, min-h-[100svh] for true mobile height
      className="relative w-full min-h-svh lg:min-h-screen flex items-start lg:items-center justify-center pt-[140px] pb-24 lg:pt-0 lg:pb-0 overflow-hidden"
      style={{ backgroundColor: "#0B0C10" }}
      aria-label="Hero Section"
    >
      {/* ---- Neon blurred orbs (parallax) ---- */}
      <motion.div
        className="absolute -left-4 top-36 w-[520px] h-[520px] rounded-full opacity-20 blur-[130px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(197,248,42,0.95) 0%, rgba(197,248,42,0.09) 18%, transparent 55%)",
          y: isMobile ? 0 : desktopOrbY,
          ...orbStyle,
        }}
        aria-hidden
      />
      <motion.div
        className="absolute right-10 bottom-12 w-[420px] h-[420px] rounded-full opacity-14 blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(138,43,226,0.95) 0%, rgba(138,43,226,0.06) 24%, transparent 60%)",
          y: isMobile ? 0 : desktopOrbY,
          ...orbStyle,
        }}
        aria-hidden
      />

      {/* ---- Content container ---- */}
      <motion.div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20"
        // Use static opacity on mobile to prevent scroll fighting
        style={{ opacity: isMobile ? 1 : desktopOpacity }}
      >
        {/* GLOBAL ARTISTIC RIBBON OVERLAY */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-30 mix-blend-screen"
          aria-hidden
        >
          <defs>
            <linearGradient
              id="global-beam-grad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#C5F82A" stopOpacity="0" />
              <stop offset="15%" stopColor="#C5F82A" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#8A2BE2" stopOpacity="0.7" />
              <stop offset="85%" stopColor="#C5F82A" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C5F82A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M -10 65 C 20 95, 40 25, 60 45 S 85 95, 110 15"
            stroke="rgba(197, 248, 42, 0.15)"
            strokeWidth={0.2}
            fill="none"
          />
          <motion.path
            d="M -10 65 C 20 95, 40 25, 60 45 S 85 95, 110 15"
            stroke="url(#global-beam-grad)"
            strokeWidth={1.5}
            strokeLinecap="round"
            fill="none"
            strokeDasharray="60 140"
            animate={{ strokeDashoffset: [200, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            style={{ filter: "blur(3px)" }}
          />
          <motion.path
            d="M -10 65 C 20 95, 40 25, 60 45 S 85 95, 110 15"
            stroke="#ffffff"
            strokeWidth={0.4}
            strokeLinecap="round"
            fill="none"
            strokeDasharray="60 140"
            animate={{ strokeDashoffset: [200, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            style={{ filter: "blur(0.5px)", opacity: 0.9 }}
          />
          <motion.path
            d="M -10 35 C 25 10, 45 75, 70 55 S 95 10, 110 45"
            stroke="url(#global-beam-grad)"
            strokeWidth={0.8}
            strokeLinecap="round"
            fill="none"
            strokeDasharray="40 160"
            animate={{ strokeDashoffset: [-200, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
            }}
            style={{ filter: "blur(2px)", opacity: 0.6 }}
          />
        </svg>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* LEFT: dramatic name + micro copy */}
          <motion.div
            className="text-center md:text-left flex flex-col"
            style={{ y: isMobile ? 0 : desktopTextY }}
          >
            <div className="relative inline-block self-center md:self-start mb-2">
              <motion.h1
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.25, once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="font-clash text-white tracking-tight relative z-10 uppercase"
                style={{
                  fontSize: "clamp(4.5rem, 11vw, 9rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                  marginBottom: "0.25rem",
                }}
              >
                {aboutMe.name}
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.25, once: true }}
                transition={{ duration: 0.75, delay: 0.12 }}
                className="font-clash text-stroke text-[#E0E0E0] tracking-tight relative z-10 uppercase"
                style={{
                  fontSize: "clamp(4.5rem, 11vw, 9rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                }}
              >
                {aboutMe.lastName}
              </motion.h2>
            </div>

            <motion.p
              className="mt-4 text-[#E0E0E0] max-w-xl mx-auto md:mx-0 text-base md:text-lg relative z-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2, once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              {aboutMe.heroText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 space-y-3 flex flex-col items-center md:items-start relative z-10"
            >
              <TechnicalSnippet
                code="const [state, setState] = useState()"
                delay={0.6}
              />
              <TechnicalSnippet
                code="SELECT * FROM creativity WHERE passion = true;"
                delay={0.8}
              />
            </motion.div>
          </motion.div>

          {/* RIGHT: headshot ONLY (Status removed) */}
          <motion.div
            className="relative flex justify-center items-center mt-8 lg:mt-0"
            style={{
              y: isMobile ? 0 : desktopImageY,
              scale: isMobile ? 1 : desktopImageScale,
            }}
          >
            <div className="relative w-full max-w-[520px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ amount: 0.3, once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative z-10"
              >
                <img
                  src={aboutMe.image}
                  alt="Davies Ajayi"
                  loading="eager"
                  className="w-full h-auto rounded-xl grayscale brightness-[0.85]"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)",
                    willChange: "transform",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none rounded-xl z-20"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(11, 12, 16, 1) 0%, rgba(11, 12, 16, 0.5) 20%, transparent 45%)",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ========================================================
          THE CLICKABLE CYBER-MAGNETIC SCROLL INDICATOR
          ======================================================== */}
      <motion.div
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[100] cursor-pointer group"
        // Use static opacity on mobile
        style={{ opacity: isMobile ? 1 : desktopOpacity }}
        onClick={handleScrollDown}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* HUD Typography Layout */}
        <div className="flex items-center gap-2 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300 group-hover:tracking-[0.25em]">
          <span className="text-white/30 group-hover:text-[#C5F82A]/80 transition-colors duration-300">
            [
          </span>
          <span
            className="text-[#E0E0E0] group-hover:text-white transition-colors duration-300"
            style={{
              textShadow:
                "0px 2px 4px rgba(0,0,0,1), 0px 0px 2px rgba(0,0,0,1)",
            }}
          >
            SYS.
          </span>
          <span
            className="text-[#C5F82A] group-hover:brightness-125 transition-all duration-300"
            style={{ textShadow: "0px 0px 8px rgba(197, 248, 42, 0.6)" }}
          >
            SCROLL
          </span>
          <span className="text-white/30 group-hover:text-[#C5F82A]/80 transition-colors duration-300">
            ]
          </span>
        </div>

        {/* The Cyber-Pill Chassis */}
        <div className="relative flex flex-col items-center">
          <div className="w-[24px] h-[40px] md:w-[30px] md:h-[48px] rounded-full border border-white/10 bg-[#1A1D23]/60 backdrop-blur-md flex justify-center pt-[6px] relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.8)] group-hover:border-[#C5F82A]/40 group-hover:bg-[#1A1D23]/80 transition-all duration-300">
            {/* Soft internal green gradient representing energy */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#C5F82A]/10 to-transparent group-hover:from-[#C5F82A]/20 transition-all duration-300" />

            {/* The Plasma Drop Animation */}
            <motion.div
              className="w-[4px] md:w-[6px] rounded-full bg-[#C5F82A]"
              style={{ boxShadow: "0 0 12px 2px rgba(197, 248, 42, 0.9)" }}
              animate={
                shouldReduceMotion
                  ? { height: "8px", opacity: 1 }
                  : {
                      y: [0, 16, 26],
                      height: ["8px", "14px", "4px"],
                      opacity: [1, 1, 0],
                    }
              }
              transition={
                shouldReduceMotion
                  ? {}
                  : {
                      duration: 1.6,
                      repeat: Infinity,
                      ease: [0.25, 1, 0.5, 1],
                    }
              }
            />
          </div>

          {/* Energy Beam Exhaust - Connects the pill to the floor */}
          <motion.div
            className="w-[1px] h-8 md:h-12 mt-2 bg-gradient-to-b from-[#C5F82A]/60 to-transparent group-hover:from-[#8a995c] group-hover:h-10 md:group-hover:h-16 transition-all duration-500"
            animate={shouldReduceMotion ? {} : { opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
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
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, type: "spring" }}
      className="glass px-3 md:px-4 py-2 rounded-lg border border-[#C5F82A]/30 inline-flex items-center gap-2 bg-[#1A1D23]/40 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
    >
      <span className="text-[#C5F82A]/70 font-mono text-xs">{">"}</span>
      <code className="text-[#C5F82A] text-[10px] md:text-xs font-mono tracking-wide">
        {code}
      </code>
    </motion.div>
  );
};

export default HeroSection;
