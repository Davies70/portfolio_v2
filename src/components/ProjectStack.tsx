import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { ArchitectureToggle, SystemArchitecture } from "./ArchitectureToggle";
import { projects, Project } from "../lib/data";

export const ProjectStack: React.FC = () => {
  const [featuredProject, ...supportingProjects] = projects;

  return (
    <section id="work" className="relative bg-portfolio-bg py-16 md:py-24">
      <div className="section-container px-6 md:px-12 lg:px-20">
        <div className="mb-10 lg:mb-14">
          <div className="mb-4 flex items-center gap-4 lg:mb-6">
            <span className="text-sm font-bold text-portfolio-accent font-mono">
              {"// 04"}
            </span>
            <h2 className="text-sm font-bold uppercase tracking-widest text-portfolio-fg font-mono">
              Selected Work
            </h2>
            <div className="h-px flex-1 bg-portfolio-fg/10" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-4xl"
          >
            <h3
              className="font-clash uppercase text-white"
              style={{ fontSize: "clamp(2rem, 6vw, 5rem)", lineHeight: 1 }}
            >
              Proof over decoration
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-7 text-portfolio-muted md:text-lg">
              A few projects chosen to show product thinking, technical
              ownership, and how I make interfaces feel polished without losing
              the engineering underneath.
            </p>
          </motion.div>
        </div>

        {featuredProject && <FeaturedProject project={featuredProject} />}

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {supportingProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index + 2}
            />
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

const FeaturedProject: React.FC<{ project: Project }> = ({ project }) => {
  const [isArchitectureView, setIsArchitectureView] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden border border-portfolio-fg/10 bg-portfolio-surface"
      style={{ boxShadow: "0 28px 90px rgba(0, 0, 0, 0.28)" }}
    >
      <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex flex-col justify-between p-6 md:p-8 lg:p-10">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className="border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] font-mono"
                style={{
                  borderColor: `${project.color}66`,
                  color: project.color,
                }}
              >
                Featured Case Study
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-portfolio-muted font-mono">
                Full-stack product build
              </span>
            </div>

            <h4 className="font-clash text-3xl uppercase text-white md:text-5xl">
              {project.title}
            </h4>
            <p className="mt-5 text-base leading-7 text-portfolio-fg">
              {project.description}
            </p>

            <div className="mt-7 grid gap-4">
              <EvidenceBlock label="Problem" value={project.problem} />
              <EvidenceBlock
                label="Technical Decision"
                value={project.highlight}
              />
              <EvidenceBlock label="Why It Matters" value={project.impact} />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <ProjectLink href={project.link} color={project.color} primary>
              <ExternalLink aria-hidden="true" size={16} />
              Live Demo
            </ProjectLink>
            <ProjectLink href={project.github} color={project.color}>
              <Github aria-hidden="true" size={16} />
              Source Code
            </ProjectLink>
          </div>
        </div>

        <div className="border-t border-portfolio-fg/10 lg:border-t-0 lg:border-l">
          <div className="flex items-center justify-between gap-4 border-b border-portfolio-fg/10 bg-portfolio-bg/35 p-4">
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 5).map((tag) => (
                <TechTag key={tag} tag={tag} color={project.color} />
              ))}
            </div>
            <ArchitectureToggle
              isArchitectureView={isArchitectureView}
              onToggle={() => setIsArchitectureView(!isArchitectureView)}
              accentColor={project.color}
            />
          </div>

          <div className="relative aspect-[16/11] overflow-hidden bg-portfolio-bg lg:h-[520px] lg:aspect-auto">
            <motion.div
              animate={{
                scale: isArchitectureView ? 1.02 : 1,
                opacity: isArchitectureView ? 0 : 1,
              }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <img
                src={project.src}
                alt={`${project.title} project screenshot`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-portfolio-bg/50 via-transparent to-transparent" />
            </motion.div>

            <AnimatePresence>
              {isArchitectureView && (
                <SystemArchitecture
                  key="arch-view"
                  projectTitle={project.title}
                  accentColor={project.color}
                  nodes={project.architecture?.nodes || []}
                  connections={project.architecture?.connections || []}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="grid gap-3 border-t border-portfolio-fg/10 p-4 md:grid-cols-3">
            {project.proofPoints.map((point) => (
              <div
                key={point}
                className="border border-portfolio-fg/10 bg-portfolio-bg/45 p-3"
              >
                <p className="text-xs leading-5 text-portfolio-fg">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isArchitectureView, setIsArchitectureView] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="group overflow-hidden border border-portfolio-fg/10 bg-portfolio-surface transition hover:border-portfolio-accent/40"
    >
      <div className="flex min-h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-portfolio-fg/10 p-4">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-bold font-mono"
              style={{ color: project.color }}
            >
              {String(index).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-portfolio-muted font-mono">
              Case Study
            </span>
          </div>
          <ArchitectureToggle
            isArchitectureView={isArchitectureView}
            onToggle={() => setIsArchitectureView(!isArchitectureView)}
            accentColor={project.color}
          />
        </div>

        <div className="relative aspect-[16/10] overflow-hidden bg-portfolio-bg">
          <motion.div
            animate={{
              scale: isArchitectureView ? 1.02 : 1,
              opacity: isArchitectureView ? 0 : 1,
            }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <img
              src={project.src}
              alt={`${project.title} project screenshot`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </motion.div>

          <AnimatePresence>
            {isArchitectureView && (
              <SystemArchitecture
                key="arch-view"
                projectTitle={project.title}
                accentColor={project.color}
                nodes={project.architecture?.nodes || []}
                connections={project.architecture?.connections || []}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tag) => (
              <TechTag key={tag} tag={tag} color={project.color} />
            ))}
          </div>

          <h4 className="font-clash text-2xl uppercase text-white">
            {project.title}
          </h4>
          <p className="mt-4 text-sm leading-6 text-portfolio-fg">
            {project.description}
          </p>

          <div className="mt-5 space-y-4 border-l border-portfolio-fg/10 pl-4">
            <EvidenceBlock label="Role" value={project.role} compact />
            <EvidenceBlock
              label="Proof"
              value={project.proofPoints[0]}
              compact
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.link && (
              <ProjectLink href={project.link} color={project.color} primary>
                <ExternalLink aria-hidden="true" size={15} />
                Live Demo
              </ProjectLink>
            )}
            <ProjectLink href={project.github} color={project.color}>
              <Github aria-hidden="true" size={15} />
              Source
            </ProjectLink>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const EvidenceBlock = ({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) => (
  <div>
    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-portfolio-muted font-mono">
      {label}
    </p>
    <p
      className={
        compact
          ? "text-sm leading-6 text-portfolio-fg"
          : "text-sm leading-6 text-portfolio-fg md:text-base"
      }
    >
      {value}
    </p>
  </div>
);

const TechTag = ({ tag, color }: { tag: string; color: string }) => (
  <span
    className="border bg-portfolio-bg px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] font-mono"
    style={{ borderColor: `${color}55`, color }}
  >
    {tag}
  </span>
);

const ProjectLink = ({
  href,
  color,
  primary = false,
  children,
}: {
  href: string;
  color: string;
  primary?: boolean;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 border px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-accent font-mono"
    style={{
      color: primary ? "var(--portfolio-bg)" : "var(--portfolio-fg)",
      backgroundColor: primary ? color : "transparent",
      borderColor: primary ? color : "rgba(236, 231, 220, 0.18)",
    }}
  >
    {children}
  </a>
);
