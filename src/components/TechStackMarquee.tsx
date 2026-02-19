import React, { useState } from "react";
import { motion } from "motion/react";

const technologies = [
  { name: "React", color: "#61DAFB", icon: "⚛️" },
  { name: "TypeScript", color: "#3178C6", icon: "TS" },
  { name: "Next.js", color: "#FFFFFF", icon: "▲" },
  { name: "Node.js", color: "#339933", icon: "◆" },
  { name: "PostgreSQL", color: "#4169E1", icon: "🐘" },
  { name: "AWS", color: "#FF9900", icon: "☁️" },
  { name: "Docker", color: "#2496ED", icon: "🐳" },
  { name: "GraphQL", color: "#E10098", icon: "◈" },
  { name: "Tailwind", color: "#06B6D4", icon: "🎨" },
  { name: "MongoDB", color: "#47A248", icon: "🍃" },
  { name: "Redis", color: "#DC382D", icon: "⚡" },
  { name: "Python", color: "#3776AB", icon: "🐍" },
];

export const TechStackMarquee: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const duplicatedTechs = [...technologies, ...technologies, ...technologies];

  return (
    <section
      // Adjusted mobile padding (pt-12 pb-4) and removed the negative mobile margin (-mt-16)
      className="relative pt-12 pb-4 md:pt-20 md:pb-24 overflow-hidden bg-[#0B0C10] z-20"
      aria-label="Technology Stack"
    >
      {/* Increased mobile bottom margin to mb-4 for better breathing room below the title */}
      <div className="container mx-auto px-6 md:px-20 mb-4 md:mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-clash text-white tracking-tighter text-center"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            letterSpacing: "-0.04em",
          }}
        >
          Trusted Tech Stack
        </motion.h2>
      </div>

      <div className="relative group flex items-center">
        {/* Edge Fade Masks (z-20) */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 z-20 pointer-events-none bg-gradient-to-r from-[#0B0C10] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 z-20 pointer-events-none bg-gradient-to-l from-[#0B0C10] to-transparent" />

        {/* Marquee Wrapper - Reduced mobile padding to py-8 */}
        <div className="flex select-none w-full py-8 md:py-20">
          <motion.div
            className="flex items-center gap-6 md:gap-12 w-max"
            style={{ willChange: "transform" }}
            animate={{ x: ["0%", "-33.33333%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: hoveredTech ? 70 : 35,
                ease: "linear",
              },
            }}
          >
            {duplicatedTechs.map((tech, idx) => (
              <TechLogo
                key={`${tech.name}-${idx}`}
                tech={tech}
                isHovered={hoveredTech === tech.name}
                onInteraction={() => setHoveredTech(tech.name)}
                onLeave={() => setHoveredTech(null)}
              />
            ))}
          </motion.div>
        </div>

        {/* Minimalist Glass Divider */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </section>
  );
};

// ----- Helper Component -----
interface TechLogoProps {
  tech: (typeof technologies)[0];
  isHovered: boolean;
  onInteraction: () => void;
  onLeave: () => void;
}

const TechLogo: React.FC<TechLogoProps> = ({
  tech,
  isHovered,
  onInteraction,
  onLeave,
}) => {
  return (
    <motion.div
      className="flex-shrink-0 flex flex-col items-center justify-start touch-manipulation cursor-pointer relative"
      onMouseEnter={onInteraction}
      onMouseLeave={onLeave}
      onTouchStart={onInteraction}
      animate={{
        filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
        opacity: isHovered ? 1 : 0.5,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        width: "clamp(80px, 15vw, 120px)",
        zIndex: isHovered ? 30 : 1,
      }}
    >
      {/* The Glass Icon Box */}
      <motion.div
        className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl relative"
        animate={{
          scale: isHovered ? 1.15 : 1,
          backgroundColor: isHovered
            ? `${tech.color}15`
            : "rgba(255, 255, 255, 0.03)",
        }}
        style={{
          border: isHovered
            ? `1px solid ${tech.color}`
            : "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: isHovered ? `0 0 25px ${tech.color}60` : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <span style={{ color: isHovered ? tech.color : "#A0A0A0" }}>
          {tech.icon}
        </span>
      </motion.div>

      <div className="h-8 mt-3 flex items-center justify-center w-[150px]">
        <motion.span
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : -8,
          }}
          transition={{ duration: 0.2 }}
          className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-center whitespace-nowrap block"
          style={{
            color: tech.color,
            textShadow: `0 0 10px ${tech.color}80`,
          }}
        >
          {tech.name}
        </motion.span>
      </div>
    </motion.div>
  );
};
