import React from 'react';

// Extracting the string outside the component keeps the code clean 
// and prevents unnecessary reallocation during re-renders.
const NOISE_PATTERN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export const NoiseOverlay: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
      aria-hidden="true" // Hides the decorative element from screen readers
    >
      <div 
        className="w-full h-full bg-repeat" 
        style={{ backgroundImage: NOISE_PATTERN }}
      />
    </div>
  );
};