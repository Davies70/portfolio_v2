import React from "react";
import { motion, useReducedMotion } from "motion/react";

// You can swap these out for the actual technologies you use
const TOP_ROW = [
  "REACT",
  "TYPESCRIPT",
  "NODE.JS",
  "NEXT.JS",
  "GRAPHQL",
  "POSTGRESQL",
  "AWS",
  "DOCKER",
];
const BOTTOM_ROW = [
  "TAILWIND_CSS",
  "FRAMER_MOTION",
  "FIGMA",
  "PYTHON",
  "REDIS",
  "LINUX",
  "VITE",
  "VERCEL",
];

export const TechStackMarquee: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  // Duplicating the arrays so the marquee loops seamlessly without resetting
  const topMarquee = [...TOP_ROW, ...TOP_ROW, ...TOP_ROW, ...TOP_ROW];
  const bottomMarquee = [
    ...BOTTOM_ROW,
    ...BOTTOM_ROW,
    ...BOTTOM_ROW,
    ...BOTTOM_ROW,
  ];

  return (
    <section className="relative py-16 md:py-24 bg-portfolio-bg overflow-hidden flex flex-col gap-4 md:gap-6 border-t-2 border-portfolio-fg/10">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 noise opacity-30 pointer-events-none" />

      {/* Section Header */}
      <div className="container mx-auto px-6 md:px-20 relative z-10 mb-4 md:mb-8">
        <div className="flex items-center gap-4">
          <span className="text-portfolio-accent font-mono font-bold text-sm">
            {"// 03"}
          </span>
          <h2 className="text-portfolio-fg font-mono tracking-widest uppercase text-sm font-bold">
            SYS.CAPABILITIES
          </h2>
          <div className="h-[2px] flex-1 bg-portfolio-fg/10" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-4 md:gap-6 rotate-[-1deg] md:rotate-[-2deg] scale-105">
        {/* --- TOP TICKER (Hazard Tape Style) --- */}
        <div
          className="relative w-full border-y-4 border-portfolio-surface bg-portfolio-accent py-3 md:py-4 overflow-hidden"
          style={{ boxShadow: "0px 10px 30px rgba(197,248,42,0.1)" }}
        >
          <motion.div
            className="flex whitespace-nowrap items-center w-max"
            animate={shouldReduceMotion ? { x: "0%" } : { x: ["0%", "-25%"] }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 15, repeat: Infinity, ease: "linear" }
            }
          >
            {topMarquee.map((tech, index) => (
              <div key={`top-${index}`} className="flex items-center">
                <span className="font-clash text-portfolio-bg text-3xl md:text-5xl font-black uppercase tracking-tighter px-6 md:px-10">
                  {tech}
                </span>
                <span className="text-portfolio-bg font-mono text-xl md:text-3xl font-black opacity-30">
                  +++
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* --- BOTTOM TICKER (Dark Terminal Style) --- */}
        <div
          className="relative w-full border-y-2 border-portfolio-fg/20 bg-portfolio-surface py-3 md:py-4 overflow-hidden"
          style={{ boxShadow: "0px 10px 30px rgba(0,0,0,0.8)" }}
        >
          <motion.div
            className="flex whitespace-nowrap items-center w-max"
            animate={shouldReduceMotion ? { x: "0%" } : { x: ["-25%", "0%"] }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 20, repeat: Infinity, ease: "linear" }
            }
          >
            {bottomMarquee.map((tech, index) => (
              <div key={`bottom-${index}`} className="flex items-center">
                {/* Using the text-stroke class we defined in index.css */}
                <span className="font-clash text-stroke text-portfolio-fg text-3xl md:text-5xl font-black uppercase tracking-tighter px-6 md:px-10 opacity-80">
                  {tech}
                </span>
                <span className="text-portfolio-accent font-mono text-xl md:text-3xl font-black">
                  //
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
