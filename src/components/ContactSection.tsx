import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { aboutMe } from "../lib/data";

export const ContactSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative pt-16 pb-24 md:py-24 overflow-hidden flex flex-col justify-center min-h-[70vh] border-t border-portfolio-fg/10"
      style={{ backgroundColor: "var(--portfolio-bg)" }}
    >
      <div className="absolute inset-0 noise opacity-15 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-20 relative z-10 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center items-center gap-2 md:gap-3 bg-portfolio-surface border border-portfolio-fg/10 w-fit mx-auto px-4 py-2"
            >
              <div className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full bg-portfolio-accent opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 md:h-3 md:w-3 bg-portfolio-accent"></span>
              </div>
              <span className="text-portfolio-fg text-[10px] md:text-xs tracking-widest uppercase font-mono font-bold">
                Available for full-stack roles and projects
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-clash text-white tracking-tighter leading-none uppercase"
              style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
            >
              Let's build
              <br />
              something useful
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-8 md:pt-12 flex justify-center"
          >
            <motion.button
              type="button"
              onClick={() => {
                window.location.href = `mailto:${aboutMe.email}`;
              }}
              className="relative cursor-pointer"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <motion.div
                className="w-[min(88vw,400px)] h-[clamp(88px,16vw,112px)] flex items-center justify-center text-portfolio-bg font-clash tracking-tight relative overflow-hidden group text-xl md:text-3xl border border-portfolio-accent"
                style={{
                  backgroundColor: "var(--portfolio-accent)",
                  boxShadow: "0 20px 60px rgba(185, 245, 66, 0.18)",
                }}
                whileHover={{
                  y: -2,
                  boxShadow: "0 24px 70px rgba(185, 245, 66, 0.24)",
                }}
                whileTap={{
                  y: 1,
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span className="font-mono text-sm opacity-50 hidden sm:inline">
                    {">"}
                  </span>
                  Email Me
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      strokeWidth={3}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </motion.div>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-12 md:pt-20 space-y-6 md:space-y-8"
          >
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 px-4">
              {aboutMe.social.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  className="border border-portfolio-fg/10 bg-portfolio-surface px-4 py-2 hover:border-portfolio-accent hover:text-portfolio-accent text-portfolio-fg transition-all font-mono text-xs uppercase font-bold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name}
                </a>
              ))}
            </div>

            <div
              className="inline-block relative group cursor-pointer bg-portfolio-surface border-2 border-portfolio-fg/20 px-6 py-3"
              style={{ boxShadow: "0 16px 50px rgba(0,0,0,0.22)" }}
            >
              <a
                href={`mailto:${aboutMe.email}`}
                className="text-portfolio-accent text-sm md:text-base font-mono font-bold hover:text-white transition-colors relative z-10"
              >
                {aboutMe.email}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute bottom-4 md:bottom-8 left-0 right-0 px-4 text-center text-portfolio-fg/40 text-[10px] md:text-xs tracking-widest font-mono border-t border-portfolio-fg/10 pt-4 w-11/12 mx-auto"
      >
        (c) {new Date().getFullYear()} Davies Ajayi
      </motion.div>
    </section>
  );
};
