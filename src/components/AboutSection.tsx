import React from "react";
import { motion } from "motion/react";

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      // Adjusted mobile padding
      className="relative py-12 md:py-32"
      style={{ backgroundColor: "#0B0C10" }}
    >
      <div className="container mx-auto px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-clash text-white mb-8 md:mb-12 tracking-tighter"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            About Me
          </motion.h2>

          {/* Reduced gap from 16 (64px) to 10 (40px) on mobile */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 md:space-y-6"
            >
              {/* Used Tailwind responsive text instead of hardcoded 1.125rem */}
              <p className="text-[#E0E0E0] leading-relaxed text-base md:text-lg">
                I'm a creative developer passionate about crafting pixel-perfect
                interfaces and seamless user experiences. With over 8 years of
                experience, I specialize in transforming ambitious ideas into
                reality.
              </p>

              <p className="text-[#E0E0E0] leading-relaxed text-base md:text-lg">
                My approach combines technical excellence with creative vision,
                ensuring every project not only functions flawlessly but also
                captivates users.
              </p>

              <div className="pt-4 md:pt-6">
                <motion.button
                  // Added w-full sm:w-auto for a better mobile tap target
                  className="w-full sm:w-auto px-8 py-3.5 md:py-4 glass rounded-full text-[#C5F82A] text-sm md:text-base hover:bg-[#C5F82A] hover:text-[#0B0C10] transition-all duration-300"
                  style={{
                    border: "1px solid rgba(197, 248, 42, 0.3)",
                    boxShadow: "0 0 30px rgba(197, 248, 42, 0.1)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 50px rgba(197, 248, 42, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Resume
                </motion.button>
              </div>
            </motion.div>

            {/* Right Column - Skills Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-clash text-white mb-4 tracking-tight text-xl md:text-2xl">
                  Technical Stack
                </h3>
                {/* Responsive grid gaps */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    "React & Next.js",
                    "TypeScript",
                    "Node.js",
                    "GraphQL",
                    "Three.js",
                    "WebGL",
                    "Framer Motion",
                    "Tailwind CSS",
                  ].map((skill) => (
                    <motion.div
                      key={skill}
                      // Reduced mobile padding and font size slightly
                      className="glass px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl text-[#E0E0E0] text-xs md:text-sm text-center sm:text-left"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(197, 248, 42, 0.2)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-clash text-white mb-4 tracking-tight text-xl md:text-2xl">
                  Awards & Recognition
                </h3>
                <div className="space-y-3">
                  {[
                    "Awwwards Site of the Day",
                    "FWA Mobile of the Day",
                    "CSS Design Awards Winner",
                  ].map((award) => (
                    <div
                      key={award}
                      className="flex items-center gap-3 text-[#E0E0E0] text-sm md:text-base"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#C5F82A] shrink-0" />
                      {award}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
