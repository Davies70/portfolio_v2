import React from "react";

const NOISE_PATTERN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export const NoiseOverlay: React.FC = () => {
  return (
    <div
      // Flattened to a single div, added transform-gpu and a mix-blend mode
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] transform-gpu mix-blend-overlay"
      style={{
        backgroundImage: NOISE_PATTERN,
        backgroundRepeat: "repeat",
      }}
      aria-hidden="true"
    />
  );
};
