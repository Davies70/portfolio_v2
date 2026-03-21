import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

const CODE_SNIPPET = `// SYSTEM BOOT SEQUENCE INITIATED...
// DATE: ${new Date().toLocaleDateString()}
// USER: DAVIES_AJAYI

const initializeDeveloper = async () => {
  try {
    const profile = new Engineer({
      name: "Davies Ajayi",
      role: "Full-Stack System Architect",
      status: "ONLINE"
    });

    console.log("Loading core competencies...");
    await profile.loadModules([
      "React", 
      "TypeScript", 
      "Node.js", 
      "System_Architecture"
    ]);

    profile.setAesthetic("NEO_BRUTALISM");
    
    return profile.deploy();

  } catch (error) {
    console.error("FATAL_ERROR: Coffee levels critically low.");
  }
};

initializeDeveloper();`;

export const CodeShowcase: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef, { amount: 0.3, once: true });

  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isInView) {
      setIsTyping(true);
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < CODE_SNIPPET.length) {
          setDisplayedCode(CODE_SNIPPET.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 15);

      return () => clearInterval(typingInterval);
    }
  }, [isInView]);

  // THE FIX: We calculate the total lines of the FINAL snippet, not the displayed snippet.
  // We also add 1 extra line for visual padding at the bottom.
  const totalLines = CODE_SNIPPET.split("\n").length;
  const lineNumbers = Array.from({ length: totalLines + 1 }, (_, i) => i + 1);

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 bg-[#0B0C10] border-t-2 border-b-2 border-[#E0E0E0]/10 overflow-hidden"
    >
      <div className="absolute inset-0 noise opacity-40 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="text-[#C5F82A] font-mono font-bold text-sm">
              {"// 02"}
            </span>
            <h2 className="text-[#E0E0E0] font-mono tracking-widest uppercase text-sm font-bold">
              SYS.INITIALIZATION
            </h2>
            <div className="h-[2px] flex-1 bg-[#E0E0E0]/10" />
          </div>

          <div
            className="bg-[#12141A] border-2 border-[#C5F82A] flex flex-col relative group transition-all duration-300"
            style={{ boxShadow: "12px 12px 0px rgba(197, 248, 42, 0.4)" }}
          >
            <div className="bg-[#C5F82A] px-4 py-2 sm:py-3 flex justify-between items-center border-b-2 border-[#C5F82A]">
              <div className="flex items-center gap-3">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0B0C10"
                  strokeWidth="3"
                  strokeLinecap="square"
                >
                  <polyline points="4 17 10 11 4 5"></polyline>
                  <line x1="12" y1="19" x2="20" y2="19"></line>
                </svg>
                <span className="font-mono text-[#0B0C10] text-[10px] sm:text-xs font-black uppercase tracking-widest">
                  ROOT@DAVIES_AJAYI:~
                </span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-[#0B0C10] border border-[#0B0C10]" />
                <div className="w-3 h-3 bg-[#0B0C10] border border-[#0B0C10]" />
                <div className="w-3 h-3 bg-[#0B0C10] border border-[#0B0C10]" />
              </div>
            </div>

            {/* Added overflow-hidden to prevent any micro-shifts */}
            <div className="flex relative bg-[#0B0C10] overflow-hidden">
              <div className="w-10 sm:w-12 bg-[#12141A] border-r-2 border-[#E0E0E0]/10 flex flex-col items-end py-4 px-2 select-none shrink-0">
                {lineNumbers.map((num) => (
                  <span
                    key={num}
                    className="text-[#E0E0E0]/30 text-[10px] sm:text-xs font-mono leading-relaxed h-[1.5em]"
                  >
                    {num}
                  </span>
                ))}
              </div>

              <div ref={textRef} className="p-4 overflow-x-auto w-full">
                {/* Fixed line-height matches the line numbers exactly */}
                <pre className="font-mono text-[10px] sm:text-sm text-[#E0E0E0] m-0">
                  <code style={{ lineHeight: "1.5em" }}>
                    {displayedCode}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="inline-block w-2 sm:w-2.5 h-3 sm:h-4 bg-[#C5F82A] ml-1 align-middle"
                    />
                  </code>
                </pre>
              </div>
            </div>

            <div className="border-t-2 border-[#E0E0E0]/20 px-4 py-2 flex justify-between items-center bg-[#12141A]">
              <div className="flex items-center gap-4">
                <span className="text-[#E0E0E0] font-mono text-[9px] sm:text-[10px] uppercase font-bold">
                  NORMAL
                </span>
                <span className="text-[#E0E0E0]/50 font-mono text-[9px] sm:text-[10px]">
                  src/core/profile.ts
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#C5F82A] animate-pulse" />
                <span className="text-[#C5F82A] font-mono text-[9px] sm:text-[10px] font-bold">
                  {isTyping ? "COMPILING..." : "SYSTEM_READY"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
