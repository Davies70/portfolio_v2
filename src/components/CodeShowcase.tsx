import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const CODE_SNIPPET = `// SYSTEM BOOT SEQUENCE INITIATED...
// DATE: ${new Date().toLocaleDateString()}
// USER: DAVIES_AJAYI

const initializeDeveloper = async () => {
  try {
    const profile = new Engineer({
      name: "Davies Ajayi",
      role: "Full-Stack Developer",
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
  const editorScrollRef = useRef<HTMLDivElement>(null);
  const hasTypedRef = useRef(false);

  const isInView = useInView(containerRef, { amount: 0.3, once: true });
  const shouldReduceMotion = useReducedMotion();

  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isInView || hasTypedRef.current) return;

    hasTypedRef.current = true;
    setDisplayedCode("");
    setIsTyping(true);

    let currentIndex = 0;
    const typingDelay = shouldReduceMotion ? 50 : 150;
    const typingInterval = window.setInterval(() => {
      currentIndex += 1;
      setDisplayedCode(CODE_SNIPPET.slice(0, currentIndex));

      if (currentIndex >= CODE_SNIPPET.length) {
        window.clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, typingDelay);

    return () => window.clearInterval(typingInterval);
  }, [isInView, shouldReduceMotion]);

  useEffect(() => {
    const editor = editorScrollRef.current;
    if (!editor) return;

    if (editor.scrollHeight > editor.clientHeight) {
      editor.scrollTop = editor.scrollHeight - editor.clientHeight;
    }
  }, [displayedCode]);

  const visibleLineCount = Math.max(1, displayedCode.split("\n").length);
  const lineNumbers = Array.from(
    { length: visibleLineCount + 1 },
    (_, i) => i + 1,
  );

  return (
    <section
      id="code"
      ref={containerRef}
      className="relative py-16 md:py-24 bg-portfolio-bg border-t-2 border-b-2 border-portfolio-fg/10 overflow-hidden"
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
            <span className="text-portfolio-accent font-mono font-bold text-sm">
              {"// 02"}
            </span>
            <h2 className="text-portfolio-fg font-mono tracking-widest uppercase text-sm font-bold">
              SYS.INITIALIZATION
            </h2>
            <div className="h-[2px] flex-1 bg-portfolio-fg/10" />
          </div>

          <div
            className="bg-portfolio-surface border-2 border-portfolio-accent flex h-[360px] sm:h-[430px] md:h-[500px] flex-col relative group transition-all duration-300"
            style={{ boxShadow: "12px 12px 0px rgba(197, 248, 42, 0.4)" }}
          >
            <div className="bg-portfolio-accent px-4 py-2 sm:py-3 flex shrink-0 justify-between items-center border-b-2 border-portfolio-accent">
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
                <span className="font-mono text-portfolio-bg text-[10px] sm:text-xs font-black uppercase tracking-widest">
                  ROOT@DAVIES_AJAYI:~
                </span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-portfolio-bg border border-portfolio-bg" />
                <div className="w-3 h-3 bg-portfolio-bg border border-portfolio-bg" />
                <div className="w-3 h-3 bg-portfolio-bg border border-portfolio-bg" />
              </div>
            </div>

            <div className="min-h-0 flex-1 relative bg-portfolio-bg overflow-hidden">
              <div
                ref={editorScrollRef}
                className="flex h-full overflow-auto custom-scrollbar"
              >
                <div className="w-10 sm:w-12 bg-portfolio-surface border-r-2 border-portfolio-fg/10 flex flex-col items-end py-4 px-2 select-none shrink-0">
                  {lineNumbers.map((num) => (
                    <span
                      key={num}
                      className="text-portfolio-fg/30 text-[10px] sm:text-xs font-mono leading-relaxed h-[1.5em]"
                    >
                      {num}
                    </span>
                  ))}
                </div>

                <div className="min-w-max p-4">
                  <pre className="font-mono text-[10px] sm:text-sm text-portfolio-fg m-0">
                    <code style={{ lineHeight: "1.5em" }}>
                      {(isInView || displayedCode) && (
                        <>
                          {displayedCode}
                          <motion.span
                            animate={
                              shouldReduceMotion
                                ? { opacity: 1 }
                                : { opacity: [1, 0] }
                            }
                            transition={{
                              duration: 0.8,
                              repeat: shouldReduceMotion ? 0 : Infinity,
                              ease: "linear",
                            }}
                            className="inline-block w-2 sm:w-2.5 h-3 sm:h-4 bg-portfolio-accent ml-1 align-middle"
                          />
                        </>
                      )}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-portfolio-fg/20 px-4 py-2 flex shrink-0 justify-between items-center bg-portfolio-surface">
              <div className="flex items-center gap-4">
                <span className="text-portfolio-fg font-mono text-[9px] sm:text-[10px] uppercase font-bold">
                  NORMAL
                </span>
                <span className="text-portfolio-fg/50 font-mono text-[9px] sm:text-[10px]">
                  src/core/profile.ts
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-portfolio-accent animate-pulse" />
                <span className="text-portfolio-accent font-mono text-[9px] sm:text-[10px] font-bold">
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
