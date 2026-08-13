import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface ArchitectureToggleProps {
  isArchitectureView: boolean;
  onToggle: () => void;
  accentColor: string;
}

export const ArchitectureToggle: React.FC<ArchitectureToggleProps> = ({
  isArchitectureView,
  onToggle,
  accentColor,
}) => {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-pressed={isArchitectureView}
      className="glass relative z-50 flex shrink-0 cursor-pointer items-center gap-2 px-2 py-1.5 text-[10px] sm:gap-3 sm:px-4 sm:py-2 md:px-4 md:py-2 md:text-sm"
      style={{
        border: `1px solid ${accentColor}66`,
        boxShadow: "none",
      }}
      whileHover={{
        y: -1,
        borderColor: accentColor,
      }}
      whileTap={{ y: 1 }}
    >
      <span className="text-portfolio-fg hidden md:inline font-mono uppercase tracking-widest text-[10px]">
        Mode:
      </span>
      <div className="flex items-center gap-2 md:gap-3 font-mono uppercase tracking-wider text-[10px]">
        <span
          className={!isArchitectureView ? "font-bold" : "opacity-50"}
          style={{ color: !isArchitectureView ? accentColor : "#E0E0E0" }}
        >
          Visual
        </span>

        <div
          className="relative w-8 sm:w-10 md:w-12 h-4 sm:h-5 md:h-5 flex items-center px-0.5 border border-white/20 bg-portfolio-bg"
          style={{
            justifyContent: isArchitectureView ? "flex-end" : "flex-start",
          }}
        >
          <motion.div
            layout
            className="w-3 h-3 sm:w-4 sm:h-4"
            style={{ backgroundColor: accentColor }}
            transition={{ type: "spring", stiffness: 600, damping: 30 }}
          />
        </div>

        <span
          className={isArchitectureView ? "font-bold" : "opacity-50"}
          style={{ color: isArchitectureView ? accentColor : "#E0E0E0" }}
        >
          Data
        </span>
      </div>
    </motion.button>
  );
};

interface SystemArchitectureProps {
  projectTitle: string;
  accentColor: string;
  nodes: { id: string; label: string; x: number; y: number }[];
  connections: { from: string; to: string }[];
}

export const SystemArchitecture: React.FC<SystemArchitectureProps> = ({
  projectTitle,
  accentColor,
  nodes,
  connections,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 overflow-hidden flex flex-col bg-portfolio-bg"
    >
      {/* Brutalist Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(${accentColor}40 1px, transparent 1px),
            linear-gradient(90deg, ${accentColor}40 1px, transparent 1px)
          `,
          backgroundSize: "clamp(18px, 2vw, 40px) clamp(18px, 2vw, 40px)",
        }}
      />

      {/* Title Section */}
      <div
        className="text-left pt-4 px-4 pb-3 md:pt-8 md:px-10 md:pb-4 relative z-10 shrink-0 border-b-2 border-dashed"
        style={{ borderColor: `${accentColor}40` }}
      >
        <h4 className="text-white font-clash text-xs sm:text-sm md:text-2xl mb-1 uppercase tracking-tight">
          {projectTitle} Architecture
        </h4>
        <p className="text-portfolio-fg/80 text-[8px] sm:text-[9px] md:text-xs tracking-widest uppercase font-mono">
          System topology
        </p>
      </div>

      <div className="relative flex-1 mt-3 mb-3 mx-2 sm:mx-8 md:mt-8 md:mb-8 md:mx-12 z-10">
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-white/40 font-mono text-xs text-center px-4 uppercase">
            [ Schematic Data Pending ]
          </div>
        )}

        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0">
          {connections.map((conn, idx) => {
            const fromNode = nodes.find((n) => n.id === conn.from);
            const toNode = nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            return (
              <motion.line
                key={idx}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={accentColor}
                strokeWidth="2"
                strokeDasharray="6 6"
                opacity="0.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.8,
                  delay: shouldReduceMotion ? 0 : idx * 0.1,
                  ease: "linear",
                }}
              />
            );
          })}
        </svg>

        {nodes.map((node, idx) => (
          <motion.div
            key={node.id}
            className="absolute z-10 flex items-center justify-center bg-portfolio-surface px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-4 md:py-2"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              border: `2px solid ${accentColor}`,
              boxShadow: `0 14px 36px ${accentColor}30`,
              maxWidth: "min(26vw, 130px)",
            }}
            initial={{ scale: 0, opacity: 0, x: "-50%", y: "-40%" }}
            animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
          >
            <div className="text-center text-[7px] leading-[1.1] text-white sm:text-[9px] md:text-sm font-mono font-bold uppercase tracking-wider whitespace-normal max-w-[18vw] sm:max-w-[15vw] md:max-w-none">
              {node.label}
            </div>
          </motion.div>
        ))}

        {!shouldReduceMotion &&
          connections.map((conn, idx) => {
            const fromNode = nodes.find((n) => n.id === conn.from);
            const toNode = nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            return (
              <motion.div
                key={`packet-${idx}`}
                className="absolute w-2 h-2 md:w-3 md:h-3 z-20"
                style={{ backgroundColor: accentColor }}
                initial={{
                  left: `${fromNode.x}%`,
                  top: `${fromNode.y}%`,
                  x: "-50%",
                  y: "-50%",
                }}
                animate={{
                  left: `${toNode.x}%`,
                  top: `${toNode.y}%`,
                  x: "-50%",
                  y: "-50%",
                }}
                transition={{
                  duration: 2,
                  delay: idx * 0.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            );
          })}
      </div>
    </motion.div>
  );
};
