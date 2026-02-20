import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArchitectureToggle, SystemArchitecture } from "./ArchitectureToggle";
import { projects, Project } from "../lib/data";

export const ProjectStack: React.FC = () => {
  return (
    <section
      id="work"
      // Adjusted top/bottom padding for mobile to be tighter (py-12)
      className="relative py-12 md:py-32"
      style={{ backgroundColor: "#0B0C10" }}
    >
      <div className="container mx-auto px-6 md:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-clash text-white mb-6 md:mb-16 tracking-tighter"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Selected Work
        </motion.h2>

        {/* Mobile: Simple List - kept the gap-10 for breathing room between cards */}
        <div className="flex flex-col gap-10 md:hidden relative">
          {projects.map((project, index) => (
            <ProjectCardMobile key={index} project={project} index={index} />
          ))}
        </div>

        {/* Desktop: Sticky Stack */}
        <div className="hidden md:block space-y-32 relative">
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

// Mobile Card - Responsive List Layout
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
        className="relative rounded-2xl sm:rounded-[30px] overflow-hidden"
        style={{ backgroundColor: "#1A1D23" }}
      >
        <div
          className="absolute inset-0 rounded-2xl sm:rounded-[30px] pointer-events-none z-20"
          style={{
            border: `1px solid ${project.color}40`,
            boxShadow: `0 0 40px ${project.color}15`,
          }}
        />

        {/* Responsive Header Bar */}
        <div className="glass p-4 sm:px-6 sm:py-4 border-b border-white/10 flex flex-col gap-3 relative z-30">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <span
                className="font-mono text-xs sm:text-sm"
                style={{ color: project.color }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div
                className="h-[1px] w-4 sm:w-8"
                style={{ backgroundColor: project.color }}
              />
              <span className="text-white/60 text-[10px] sm:text-xs tracking-wider">
                PROJECT
              </span>
            </div>
            <ArchitectureToggle
              isArchitectureView={isArchitectureView}
              onToggle={() => setIsArchitectureView(!isArchitectureView)}
              accentColor={project.color}
            />
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="glass px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs tracking-wider"
                style={{ color: project.color }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0B0C10]">
            <motion.div
              animate={{
                scale: isArchitectureView ? 1.1 : 1,
                opacity: isArchitectureView ? 0.15 : 1,
                filter: isArchitectureView ? "blur(10px)" : "blur(0px)",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={project.src}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 mix-blend-overlay opacity-30"
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

          {/* Adjusted padding to p-4 on small screens to maximize space */}
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 relative z-20">
            <h3
              className="font-clash text-white tracking-tight break-words"
              style={{
                fontSize: "clamp(1.25rem, 6vw, 1.75rem)",
                letterSpacing: "-0.04em",
                lineHeight: "1.1",
              }}
            >
              {project.title}
            </h3>

            <p className="text-[#E0E0E0] leading-relaxed text-xs sm:text-sm">
              {project.description}
            </p>

            {/* Adjusted buttons: stack on tiny screens, side-by-side on standard mobile */}
            <div className="flex flex-col min-[350px]:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex-1 justify-center px-4 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm text-center hover:bg-white hover:text-[#0B0C10] transition-all"
                  style={{
                    color: project.color,
                    border: `1px solid ${project.color}40`,
                  }}
                >
                  View Live
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex-1 justify-center px-4 py-2.5 sm:py-3 rounded-full text-white text-xs sm:text-sm text-center hover:bg-white hover:text-[#0B0C10] transition-all"
                style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Desktop Card - Sticky Stack Layout (Kept largely unchanged as it targets md: and above)
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
        className="relative rounded-[30px] overflow-hidden group"
        style={{ backgroundColor: "#1A1D23" }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 rounded-[30px] pointer-events-none z-20"
          style={{
            border: `1px solid ${project.color}40`,
            boxShadow: `0 0 40px ${project.color}15, inset 0 0 40px ${project.color}05`,
          }}
          whileHover={{
            boxShadow: `0 0 60px ${project.color}40, inset 0 0 60px ${project.color}10`,
          }}
        />

        <div className="glass px-8 py-4 border-b border-white/10 flex items-center justify-between relative z-30">
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-sm"
              style={{ color: project.color }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div
              className="h-[1px] w-12"
              style={{ backgroundColor: project.color }}
            />
            <span className="text-white/60 text-sm tracking-wider">
              PROJECT
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="glass px-3 py-1 rounded-full text-xs tracking-wider"
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

        <div className="grid md:grid-cols-2 gap-0 items-center">
          <div className="p-8 md:p-12 space-y-6 relative z-20">
            <h3
              className="font-clash text-white tracking-tight"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              {project.title}
            </h3>

            <p
              className="text-[#E0E0E0] leading-relaxed"
              style={{ fontSize: "1rem" }}
            >
              {project.description}
            </p>

            <div className="flex gap-4 pt-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-8 py-4 rounded-full hover:bg-white hover:text-[#0B0C10] transition-all"
                  style={{
                    color: project.color,
                    border: `1px solid ${project.color}40`,
                  }}
                >
                  View Live
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-8 py-4 rounded-full text-white hover:bg-white hover:text-[#0B0C10] transition-all"
                style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] md:h-full overflow-hidden bg-[#0B0C10]">
            <motion.div
              animate={{
                scale: isArchitectureView ? 1.1 : 1,
                opacity: isArchitectureView ? 0.15 : 1,
                filter: isArchitectureView ? "blur(10px)" : "blur(0px)",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={project.src}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 mix-blend-overlay opacity-30"
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

        {index < projects.length - 1 && (
          <>
            <div
              className="absolute inset-0 rounded-[30px] -z-10 translate-y-4"
              style={{
                backgroundColor: "#1A1D23",
                opacity: 0.5,
                transform: "translateY(16px) scale(0.95)",
              }}
            />
            <div
              className="absolute inset-0 rounded-[30px] -z-20 translate-y-8"
              style={{
                backgroundColor: "#1A1D23",
                opacity: 0.25,
                transform: "translateY(32px) scale(0.9)",
              }}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};
