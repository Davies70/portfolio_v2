import React from "react";
import { motion } from "motion/react";
import { aboutMe } from "../lib/data";

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-20 md:py-32 bg-[#0B0C10] border-t-2 border-b-2 border-[#E0E0E0]/10 overflow-hidden"
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 noise opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Neo-Brutalist Section Header */}
          <div className="mb-10 md:mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#C5F82A] font-mono font-bold text-sm">
                {"// 05"}
              </span>
              <h2 className="text-[#E0E0E0] font-mono tracking-widest uppercase text-sm font-bold">
                SYS.IDENTITY
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
              ABOUT_ME
            </motion.h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            {/* Left Column - Core Data & Trigger */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 md:space-y-8 flex flex-col"
            >
              <div
                className="bg-[#12141A] p-6 md:p-8 border-2 border-[#E0E0E0]/20"
                style={{ boxShadow: "8px 8px 0px rgba(0,0,0,1)" }}
              >
                <p className="text-[#E0E0E0] leading-relaxed text-sm md:text-base mb-6 font-mono">
                  {aboutMe.descriptionOne}
                </p>
                <p className="text-[#E0E0E0] leading-relaxed text-sm md:text-base font-mono">
                  {aboutMe.descriptionTwo}
                </p>
              </div>

              <div className="pt-4 mt-auto">
                <motion.button
                  className="cursor-pointer w-full sm:w-auto px-8 py-4 bg-[#C5F82A] text-[#0B0C10] font-mono text-xs md:text-sm uppercase font-bold border-2 border-[#C5F82A] transition-all flex items-center justify-center gap-3 group"
                  style={{ boxShadow: "6px 6px 0px rgba(197, 248, 42, 0.4)" }}
                  whileHover={{
                    translate: "-4px -4px",
                    boxShadow: "10px 10px 0px rgba(197, 248, 42, 0.8)",
                  }}
                  whileTap={{
                    translate: "4px 4px",
                    boxShadow: "0px 0px 0px transparent",
                  }}
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = "/resume/Davies_Ajayi_Resume.pdf";
                    link.download = "Davies_Ajayi_Resume.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    className="group-hover:translate-y-1 transition-transform"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  EXECUTE // DOWNLOAD_RESUME
                </motion.button>
              </div>
            </motion.div>

            {/* Right Column - Modules & Logs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-12"
            >
              {/* Skills Grid */}
              <div>
                <h3 className="font-mono text-[#C5F82A] mb-4 text-xs md:text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#C5F82A] animate-pulse" />
                  LOADED_MODULES
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {aboutMe.tech.map((skill) => (
                    <motion.div
                      key={skill}
                      className="px-3 md:px-4 py-2 bg-[#12141A] border-2 border-[#E0E0E0]/20 text-[#E0E0E0] font-mono text-[10px] md:text-xs uppercase font-bold transition-colors cursor-default"
                      style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
                      whileHover={{
                        translate: "-2px -2px",
                        boxShadow: "6px 6px 0px rgba(197, 248, 42, 0.4)",
                        borderColor: "#C5F82A",
                        color: "#C5F82A",
                      }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Certifications / Logs */}
              <div>
                <h3 className="font-mono text-[#C5F82A] mb-4 text-xs md:text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#C5F82A] animate-pulse" />
                  VERIFIED_CREDENTIALS
                </h3>
                <div className="space-y-3">
                  {aboutMe.recognitions.map((award, idx) => (
                    <motion.div
                      key={award}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="flex items-start gap-3 bg-[#12141A] border-l-4 border-[#C5F82A] p-3 md:p-4 group hover:bg-[#1a1d23] transition-colors"
                    >
                      <span className="text-[#C5F82A] font-mono text-sm mt-0.5 group-hover:translate-x-1 transition-transform">
                        {">"}
                      </span>
                      <span className="text-[#E0E0E0] text-[10px] md:text-xs font-mono leading-relaxed tracking-wide">
                        {award}
                      </span>
                    </motion.div>
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
