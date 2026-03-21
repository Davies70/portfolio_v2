import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "INIT BIOS... OK",
  "LOADING KERNEL [DAVIES_OS v2.0]...",
  "MOUNTING VIRTUAL_DRIVES... OK",
  "INITIALIZING NEO-BRUTALISM.CSS... OK",
  "COMPILING CORE MODULES: [REACT, TS, NODE]... DONE",
  "BYPASSING SECURITY PROTOCOLS...",
  "ACCESS GRANTED.",
  "SYSTEM READY.",
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // 1. Rapid-fire the boot logs with safety checks
    let currentLog = 0;
    const logInterval = setInterval(() => {
      if (currentLog < BOOT_LOGS.length) {
        const nextLog = BOOT_LOGS[currentLog];
        if (nextLog) {
          setVisibleLogs((prev) => [...prev, nextLog]);
        }
        currentLog++;
      } else {
        clearInterval(logInterval);
      }
    }, 150);

    // 2. Drive the fake progress bar with a strict 100% clamp
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const nextProgress = prev + Math.floor(Math.random() * 15) + 5;
        return Math.min(100, nextProgress); // Never let it exceed 100
      });
    }, 100);

    // 3. Trigger the exit animation
    const finishTimeout = setTimeout(() => {
      setIsDone(true);
      // Wait for the slide-up animation to finish before unlocking App scroll
      setTimeout(onComplete, 800);
    }, 2000);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  // Generate ASCII progress bar with safe Range values
  const renderProgressBar = () => {
    const totalBlocks = 20;
    // Ensure we never pass a negative or over-limit value to .repeat()
    const filledBlocks = Math.min(
      totalBlocks,
      Math.max(0, Math.floor((progress / 100) * totalBlocks)),
    );
    const emptyBlocks = Math.max(0, totalBlocks - filledBlocks);

    return `[${"█".repeat(filledBlocks)}${"-".repeat(emptyBlocks)}] ${Math.min(
      progress,
      100,
    )}%`;
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="boot-screen"
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0B0C10] flex flex-col justify-end p-6 md:p-12 overflow-hidden border-b-4 border-[#C5F82A]"
        >
          {/* Cyber Grid Background */}
          <div className="absolute inset-0 noise opacity-30 pointer-events-none" />

          {/* Terminal Window */}
          <div className="relative z-10 w-full max-w-3xl font-mono text-xs md:text-sm text-[#E0E0E0] uppercase tracking-wider">
            {/* Rapid-firing logs with optional chaining safety */}
            <div className="flex flex-col gap-1 mb-4">
              {visibleLogs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    log?.includes("ACCESS GRANTED") || log?.includes("READY")
                      ? "text-[#C5F82A] font-bold"
                      : ""
                  }
                >
                  {log}
                </motion.div>
              ))}
            </div>

            {/* ASCII Progress Bar */}
            <div className="text-[#C5F82A] font-bold mb-2">
              {renderProgressBar()}
            </div>

            {/* Blinking Cursor */}
            <div className="flex items-center gap-2">
              <span className="text-[#C5F82A]">{">"}</span>
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-2 md:w-3 h-4 md:h-5 bg-[#C5F82A]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
