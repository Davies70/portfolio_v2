import React from "react";

export const NoiseOverlay: React.FC = () => {
  return (
    <div
      // We use the new .noise class from index.css for the static cyber grid
      className="fixed inset-0 pointer-events-none z-0 noise"
      aria-hidden="true"
    />
  );
};
