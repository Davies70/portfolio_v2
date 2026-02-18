import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  // Hydration-safe mobile detection for parallax scaling
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile(); // Check on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ----- Scroll setup (scoped to this section) -----
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 18,
  });

  // --- Advanced Scroll Parallax Animations ---
  const heroOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const orbY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", isMobile ? "0%" : "-40%"],
  );
  const imageY = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", isMobile ? "0%" : "20%"],
  );
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 0.9]);

  // ----- Helpers -----
  const orbStyle = {
    willChange: "transform, opacity",
  } as const;

  return (
    <section
      id="home"
      ref={containerRef as any}
      // FIX: Changed min-h to 100svh (mobile-friendly full height)
      // FIX: Added `items-start lg:items-center` to push content to the top on mobile
      // FIX: Added `pt-40 lg:pt-0` to guarantee massive clearance below the mobile navbar
      className="pt-[400px] relative w-full min-h-svh lg:min-h-screen flex items-start lg:items-center justify-center pb-12 lg:pt-0 lg:pb-0 overflow-hidden"
      style={{ backgroundColor: "#0B0C10" }}
      aria-label="Hero Section"
    >
      {/* ---- Neon blurred orbs (parallax) ---- */}
      <motion.div
        className="absolute -left-4 top-36 w-[520px] h-[520px] rounded-full opacity-20 blur-[130px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(197,248,42,0.95) 0%, rgba(197,248,42,0.09) 18%, transparent 55%)",
          y: orbY,
          ...orbStyle,
        }}
        aria-hidden
      />
      <motion.div
        className="absolute right-10 bottom-12 w-[420px] h-[420px] rounded-full opacity-14 blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(138,43,226,0.95) 0%, rgba(138,43,226,0.06) 24%, transparent 60%)",
          y: orbY,
          ...orbStyle,
        }}
        aria-hidden
      />

      {/* ---- Content container ---- */}
      <motion.div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20"
        style={{ opacity: heroOpacity }}
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
            style={{ y: textY }}
          >
            <div className="relative inline-block self-center md:self-start mb-2">
              <motion.h1
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.25, once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="font-clash text-white tracking-tight relative z-10"
                style={{
                  fontSize: "clamp(4.5rem, 11vw, 9rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                  marginBottom: "0.25rem",
                }}
              >
                DAVIES
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.25, once: true }}
                transition={{ duration: 0.75, delay: 0.12 }}
                className="font-clash text-stroke text-[#E0E0E0] tracking-tight relative z-10"
                style={{
                  fontSize: "clamp(4.5rem, 11vw, 9rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                }}
              >
                AJAYI
              </motion.h2>
            </div>

            <motion.p
              className="mt-4 text-[#E0E0E0] max-w-xl mx-auto md:mx-0 text-base md:text-lg relative z-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2, once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              Crafting exceptional digital experiences through code, design, and
              innovation. I build modern, high-performance applications with
              attention to detail and long-term maintainability.
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

          {/* RIGHT: headshot */}
          <motion.div
            className="relative flex justify-center items-center mt-6 lg:mt-0"
            style={{ y: imageY, scale: imageScale }}
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
                  src="/assets/me_2.png"
                  alt="Davies Ajayi"
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
