import React from "react";

const CAPABILITIES = [
  {
    title: "Frontend",
    detail: "React, Next.js, TypeScript, Tailwind, motion systems",
  },
  {
    title: "Backend",
    detail: "Node.js, Express, REST APIs, auth flows, data modeling",
  },
  {
    title: "Cloud",
    detail: "AWS Lambda, API Gateway, DynamoDB, S3, serverless patterns",
  },
  {
    title: "Product Polish",
    detail: "Responsive UI, accessibility, performance, recruiter-ready demos",
  },
];

const TOOLS = [
  "React",
  "TypeScript",
  "Node.js",
  "Next.js",
  "AWS",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "Python",
  "Docker",
  "Tailwind",
  "Vite",
];

export const TechStackMarquee: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-t border-portfolio-fg/10 bg-portfolio-bg py-14 md:py-20">
      <div className="absolute inset-0 noise opacity-15 pointer-events-none" />

      <div className="section-container relative z-10 px-6 md:px-12 lg:px-20">
        <div className="mb-8 flex items-center gap-4">
          <span className="text-portfolio-accent font-mono font-bold text-sm">
            {"// 03"}
          </span>
          <h2 className="text-portfolio-fg font-mono tracking-widest uppercase text-sm font-bold">
            Capabilities
          </h2>
          <div className="h-px flex-1 bg-portfolio-fg/10" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((capability) => (
            <article
              key={capability.title}
              className="border border-portfolio-fg/10 bg-portfolio-surface p-5 transition hover:border-portfolio-accent/50"
            >
              <h3 className="mb-3 font-clash text-lg uppercase text-white">
                {capability.title}
              </h3>
              <p className="text-sm leading-6 text-portfolio-muted">
                {capability.detail}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {TOOLS.map((tool) => (
            <span
              key={tool}
              className="border border-portfolio-fg/10 bg-portfolio-bg px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-portfolio-fg"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
