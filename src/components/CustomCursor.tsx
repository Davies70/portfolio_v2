import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for X and Y coordinates (bypasses React state for 60fps performance)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Add a mechanical spring physics effect to the cursor movement
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on devices with a real mouse (ignore mobile/touch)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // Global event delegation to detect hovering over ANY interactive element
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target or its parent is a link, button, input, or has a specific class
      if (
        target.closest("a, button, input, textarea, select, [role='button']")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
        // Center the cursor exactly on the tip of the actual mouse coordinate
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* THE TACTICAL BRACKETS
        When hovering, they expand outward to frame the element. 
        When idle, they collapse into a tight square.
      */}
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          width: isHovering ? 40 : 12,
          height: isHovering ? 40 : 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {/* Left Bracket '[' */}
        <motion.div
          className="absolute left-0 border-l-2 border-y-2 border-[#C5F82A]"
          animate={{
            height: isHovering ? "24px" : "100%",
            width: isHovering ? "8px" : "50%",
            opacity: isHovering ? 1 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />

        {/* Right Bracket ']' */}
        <motion.div
          className="absolute right-0 border-r-2 border-y-2 border-[#C5F82A]"
          animate={{
            height: isHovering ? "24px" : "100%",
            width: isHovering ? "8px" : "50%",
            opacity: isHovering ? 1 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />

        {/* Center Dot (Disappears on hover) */}
        <motion.div
          className="w-1.5 h-1.5 bg-[#C5F82A]"
          animate={{ opacity: isHovering ? 0 : 1, scale: isHovering ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
};
