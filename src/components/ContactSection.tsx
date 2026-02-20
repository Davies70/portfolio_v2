import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { aboutMe } from "../lib/data";

export const ContactSection: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || !isHovering) return;

      const button = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = button.left + button.width / 2;
      const buttonCenterY = button.top + button.height / 2;

      const distanceX = e.clientX - buttonCenterX;
      const distanceY = e.clientY - buttonCenterY;

      // Magnetic effect - button moves toward cursor
      const magnetStrength = 0.3;
      setMousePosition({
        x: distanceX * magnetStrength,
        y: distanceY * magnetStrength,
      });
    };

    if (isHovering) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovering]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section
      id="contact"
      // Adjusted mobile padding
      className="relative pt-20 pb-28 md:py-32 overflow-hidden flex flex-col justify-center min-h-[80vh]"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Curved SVG Divider - Responsive height */}
      <div className="absolute top-0 left-0 w-full overflow-hidden h-[50px] md:h-[100px]">
        <svg
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          className="w-full h-full"
          style={{ transform: "translateY(-1px)" }}
        >
          <path d="M0,0 Q600,100 1200,0 L1200,100 L0,100 Z" fill="#0B0C10" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-20 relative z-10 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
          <div className="space-y-6">
            {/* New Concept: Availability Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center items-center gap-2 md:gap-3"
            >
              <div className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5F82A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-[#C5F82A]"></span>
              </div>
              <span className="text-[#E0E0E0] text-[10px] md:text-xs tracking-widest uppercase font-mono">
                Currently accepting new projects
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-clash text-white tracking-tighter leading-none"
              style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
            >
              LET'S WORK
              <br />
              TOGETHER
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#E0E0E0] max-w-2xl mx-auto text-sm md:text-lg px-4"
            >
              Have a project in mind? Let's create something extraordinary
              together. From concept to launch, I'll help bring your vision to
              life.
            </motion.p>
          </div>

          {/* Magnetic CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 md:pt-12 flex justify-center"
          >
            <motion.button
              ref={buttonRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative"
              animate={{
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <motion.div
                // Mobile scaled down to w-48 h-48, text to base
                className="w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center text-[#0B0C10] font-clash tracking-tight relative overflow-hidden group text-base md:text-xl"
                style={{
                  backgroundColor: "#C5F82A",
                }}
                // Added continuous breathing shadow so it looks alive on mobile too
                animate={{
                  boxShadow: [
                    "0 0 40px rgba(197, 248, 42, 0.2), inset 0 0 20px rgba(197, 248, 42, 0.1)",
                    "0 0 80px rgba(197, 248, 42, 0.4), inset 0 0 40px rgba(197, 248, 42, 0.2)",
                    "0 0 40px rgba(197, 248, 42, 0.2), inset 0 0 20px rgba(197, 248, 42, 0.1)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex flex-col items-center gap-1">
                  GET IN TOUCH
                  {/* Small arrow icon for extra flair */}
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                />
                <span className="absolute inset-0 flex flex-col items-center gap-1 justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  GET IN TOUCH
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Social Links & Email */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-12 md:pt-20 space-y-6 md:space-y-8"
          >
            {/* Added flex-wrap so links wrap on very small screens */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-[#E0E0E0] px-4">
              {aboutMe.social.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  className="relative group py-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-xs md:text-sm tracking-wider hover:text-[#C5F82A] transition-colors">
                    {social.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C5F82A] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Email styling improved to look more clickable/copyable */}
            <div className="inline-block relative group cursor-pointer">
              <a
                href={`mailto:${aboutMe.email}`}
                className="text-[#E0E0E0] text-sm md:text-base font-mono hover:text-white transition-colors relative z-10"
              >
                {aboutMe.email}
              </a>
              <motion.div
                className="absolute inset-0 bg-white/5 rounded-lg -m-2 -z-10 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-4 md:bottom-8 left-0 right-0 px-4 text-center text-[#E0E0E0]/40 text-[10px] md:text-xs tracking-widest font-mono"
      >
        © {new Date().getFullYear()} CREATIVE DEVELOPER. ALL RIGHTS RESERVED.
      </motion.div>
    </section>
  );
};
