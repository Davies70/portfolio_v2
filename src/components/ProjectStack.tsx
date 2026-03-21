import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArchitectureToggle, SystemArchitecture } from "./ArchitectureToggle";
import { projects, Project } from "../lib/data";

export const ProjectStack: React.FC = () => {
  return (
    <section
      id="work"
      className="relative py-16 md:py-24 lg:py-32"
      style={{ backgroundColor: "#0B0C10" }}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Fixed Section Header - Removed conflicting margins */}
        <div className="mb-12 lg:mb-20">
          <div className="flex items-center gap-4 mb-4 lg:mb-6">
            <span className="text-[#C5F82A] font-mono font-bold text-sm">
              {"// 04"}
            </span>
            <h2 className="text-[#E0E0E0] font-mono tracking-widest uppercase text-sm font-bold">
              SYS.EXECUTABLES
            </h2>
            <div className="h-[2px] flex-1 bg-[#E0E0E0]/10" />
          </div>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-clash text-white tracking-tighter uppercase"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1 }}
          >
            SELECTED_WORK
          </motion.h3>
        </div>

        {/* Mobile & Tablet: Standard Vertical List (Hidden on lg+) */}
        <div className="flex flex-col gap-12 md:gap-16 lg:hidden relative">
          {projects.map((project, index) => (
            <ProjectCardMobile key={index} project={project} index={index} />
          ))}
        </div>

        {/* Desktop: Sticky Stack (Only visible on lg+) */}
        <div className="hidden lg:block space-y-32 relative">
          {projects.map((project, index) => (
            <ProjectCardDesktop key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Mobile & Tablet Card
const ProjectCardMobile: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isArchitectureView, setIsArchitectureView] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full"
    >
      <div
        className="relative overflow-hidden bg-[#12141A] border-2 border-[#E0E0E0]/20"
        style={{ boxShadow: `6px 6px 0px ${project.color}60` }}
      >
        {/* Header Bar */}
        <div className="glass p-4 sm:p-6 border-b-2 border-[#E0E0E0]/20 flex flex-col gap-4 relative z-30">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <span
                className="font-mono text-xs sm:text-sm font-bold"
                style={{ color: project.color }}
              >
                [{String(index + 1).padStart(2, "0")}]
              </span>
              <span className="text-white/60 font-mono text-[10px] sm:text-xs tracking-widest uppercase">
                DIR_PROJECT
              </span>
            </div>
            <ArchitectureToggle
              isArchitectureView={isArchitectureView}
              onToggle={() => setIsArchitectureView(!isArchitectureView)}
              accentColor={project.color}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 border border-white/20 bg-[#0B0C10] font-mono text-[10px] uppercase tracking-wider"
                style={{ color: project.color }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          {/* Changed aspect ratio to 16/9 on tablet so images aren't massive */}
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-[#0B0C10] border-b-2 border-[#E0E0E0]/20">
            <motion.div
              animate={{
                scale: isArchitectureView ? 1.05 : 1,
                opacity: isArchitectureView ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={project.src}
                alt={project.title}
                className="w-full h-full object-cover grayscale contrast-125"
              />
              <div
                className="absolute inset-0 mix-blend-multiply opacity-80"
                style={{ background: project.color }}
              />
            </motion.div>

            <AnimatePresence>
              {isArchitectureView && (
                <SystemArchitecture
                  key="arch-view"
                  projectTitle={project.title}
                  accentColor={project.color || "#C5F82A"}
                  nodes={project.architecture?.nodes || []}
                  connections={project.architecture?.connections || []}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Adjusted padding and spacing for tablet breathing room */}
          <div className="p-5 sm:p-6 md:p-8 space-y-4 md:space-y-6 relative z-20">
            <h3
              className="font-clash text-white tracking-tight break-words uppercase"
              style={{
                fontSize: "clamp(1.25rem, 6vw, 2rem)",
                lineHeight: "1.1",
              }}
            >
              {project.title}
            </h3>

            <p className="text-[#E0E0E0] leading-relaxed text-sm md:text-base">
              {project.description}
            </p>

            <div className="flex flex-col min-[400px]:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 justify-center px-4 py-3 md:py-4 border-2 font-mono uppercase text-[10px] sm:text-xs text-center font-bold transition-all hover:-translate-y-1 hover:-translate-x-1"
                  style={{
                    color: "#0B0C10",
                    backgroundColor: project.color,
                    borderColor: project.color,
                    boxShadow: `4px 4px 0px rgba(255,255,255,0.1)`,
                  }}
                >
                  Deploy_Live
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 justify-center px-4 py-3 md:py-4 border-2 font-mono uppercase text-[10px] sm:text-xs text-center font-bold text-white transition-all hover:-translate-y-1 hover:-translate-x-1 hover:bg-white hover:text-black"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.4)",
                  backgroundColor: "#12141A",
                  boxShadow: `4px 4px 0px rgba(0,0,0,1)`,
                }}
              >
                Source_Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Desktop Card - Sticky Stack Layout
const ProjectCardDesktop: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isArchitectureView, setIsArchitectureView] = useState(false);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0.5],
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="sticky top-32"
    >
      <motion.div
        className="relative overflow-hidden group bg-[#12141A] border-2 border-[#E0E0E0]/20"
        style={{ boxShadow: `12px 12px 0px ${project.color}80` }}
        whileHover={{
          translate: "-4px -4px",
          boxShadow: `16px 16px 0px ${project.color}`,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="glass px-8 py-4 border-b-2 border-[#E0E0E0]/20 flex items-center justify-between relative z-30">
          <div className="flex items-center gap-4">
            <span
              className="font-mono text-sm font-bold"
              style={{ color: project.color }}
            >
              [{String(index + 1).padStart(2, "0")}]
            </span>
            <span className="text-white/60 font-mono text-xs tracking-widest uppercase">
              DIR_PROJECT
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 border border-white/20 bg-[#0B0C10] font-mono text-[10px] uppercase tracking-wider"
                  style={{ color: project.color }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <ArchitectureToggle
              isArchitectureView={isArchitectureView}
              onToggle={() => setIsArchitectureView(!isArchitectureView)}
              accentColor={project.color}
            />
          </div>
        </div>

        {/* Upgraded to lg:grid-cols-2 so it doesn't trigger on narrow tablets */}
        <div className="grid lg:grid-cols-2 gap-0 items-stretch">
          <div className="p-8 lg:p-12 flex flex-col justify-center relative z-20 border-r-2 border-[#E0E0E0]/20">
            <h3
              className="font-clash text-white tracking-tight uppercase mb-6"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              {project.title}
            </h3>

            <p
              className="text-[#E0E0E0] leading-relaxed mb-8"
              style={{ fontSize: "1rem" }}
            >
              {project.description}
            </p>

            <div className="flex gap-4 mt-auto">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 font-mono uppercase text-xs font-bold transition-all hover:-translate-y-1 hover:-translate-x-1"
                  style={{
                    color: "#0B0C10",
                    backgroundColor: project.color,
                    borderColor: project.color,
                    boxShadow: `4px 4px 0px rgba(255,255,255,0.1)`,
                  }}
                >
                  Deploy_Live
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 font-mono uppercase text-xs font-bold text-white transition-all hover:-translate-y-1 hover:-translate-x-1 hover:bg-white hover:text-black"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.4)",
                  backgroundColor: "#12141A",
                  boxShadow: `4px 4px 0px rgba(0,0,0,1)`,
                }}
              >
                Source_Code
              </a>
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] lg:h-full overflow-hidden bg-[#0B0C10]">
            <motion.div
              animate={{
                scale: isArchitectureView ? 1.05 : 1,
                opacity: isArchitectureView ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={project.src}
                alt={project.title}
                className="w-full h-full object-cover grayscale contrast-125"
              />
              <div
                className="absolute inset-0 mix-blend-multiply opacity-80"
                style={{ background: project.color }}
              />
            </motion.div>

            <AnimatePresence>
              {isArchitectureView && (
                <SystemArchitecture
                  key="arch-view"
                  projectTitle={project.title}
                  accentColor={project.color || "#C5F82A"}
                  nodes={project.architecture?.nodes || []}
                  connections={project.architecture?.connections || []}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
