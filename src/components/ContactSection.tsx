import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { aboutMe } from "../lib/data";

export const ContactSection: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || !isHovering) return;
      const button = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = button.left + button.width / 2;
      const buttonCenterY = button.top + button.height / 2;
      const distanceX = e.clientX - buttonCenterX;
      const distanceY = e.clientY - buttonCenterY;
      const magnetStrength = 0.3;
      setMousePosition({
        x: distanceX * magnetStrength,
        y: distanceY * magnetStrength,
      });
    };

    if (isHovering) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovering, shouldReduceMotion]);

  const handleMouseEnter = () => {
    if (!shouldReduceMotion) setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section
      id="contact"
      className="relative pt-20 pb-28 md:py-32 overflow-hidden flex flex-col justify-center min-h-[80vh] border-t-2 border-portfolio-fg/10"
      style={{ backgroundColor: "var(--portfolio-bg)" }}
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 noise opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-20 relative z-10 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
          <div className="space-y-6">
            {/* Brutalist Availability Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center items-center gap-2 md:gap-3 bg-portfolio-surface border-2 border-portfolio-fg/20 w-fit mx-auto px-4 py-2"
              style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
            >
              <div className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full bg-portfolio-accent opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 md:h-3 md:w-3 bg-portfolio-accent"></span>
              </div>
              <span className="text-portfolio-fg text-[10px] md:text-xs tracking-widest uppercase font-mono font-bold">
                SYSTEM.READY // ACCEPTING_PROJECTS
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
              INITIATE
              <br />
              CONTACT
            </motion.h2>
          </div>

          {/* Magnetic Brutalist CTA Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-8 md:pt-12 flex justify-center"
          >
            <motion.button
              type="button"
              ref={buttonRef}
              onClick={() => {
                window.location.href = `mailto:${aboutMe.email}`;
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative cursor-pointer"
              animate={
                shouldReduceMotion
                  ? { x: 0, y: 0 }
                  : { x: mousePosition.x, y: mousePosition.y }
              }
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <motion.div
                className="w-[min(88vw,400px)] h-[clamp(96px,18vw,120px)] flex items-center justify-center text-portfolio-bg font-clash tracking-tight relative overflow-hidden group text-xl md:text-3xl border-2 border-portfolio-accent"
                style={{
                  backgroundColor: "var(--portfolio-accent)",
                  boxShadow: "8px 8px 0px rgba(197, 248, 42, 0.4)",
                }}
                whileHover={{
                  translate: "-4px -4px",
                  boxShadow: "12px 12px 0px rgba(197, 248, 42, 0.8)",
                }}
                whileTap={{
                  translate: "4px 4px",
                  boxShadow: "0px 0px 0px transparent",
                }}
              >
                {/* Hazard Stripe Background Pattern */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)",
                  }}
                />

                <span className="relative z-10 flex items-center gap-3">
                  <span className="font-mono text-sm opacity-50 hidden sm:inline">
                    {">"}
                  </span>
                  COMMUNICATE
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

          {/* Terminal Social Links */}
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
                  className="border-2 border-portfolio-fg/20 bg-portfolio-surface px-4 py-2 hover:border-portfolio-accent hover:bg-portfolio-accent hover:text-portfolio-bg text-portfolio-fg transition-all font-mono text-xs uppercase font-bold"
                  style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name}
                </a>
              ))}
            </div>

            <div
              className="inline-block relative group cursor-pointer bg-portfolio-surface border-2 border-portfolio-fg/20 px-6 py-3"
              style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
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
        className="absolute bottom-4 md:bottom-8 left-0 right-0 px-4 text-center text-portfolio-fg/40 text-[10px] md:text-xs tracking-widest font-mono border-t-2 border-portfolio-fg/10 pt-4 w-11/12 mx-auto"
      >
        (c) {new Date().getFullYear()} DAVIES_AJAYI // ALL_SYSTEMS_NOMINAL.
      </motion.div>
    </section>
  );
};
