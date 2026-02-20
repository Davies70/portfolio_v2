# Davies Ajayi | Creative Developer Portfolio

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Site-C5F82A?style=for-the-badge&logo=vercel&logoColor=black)](YOUR_LIVE_LINK_HERE)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)]()
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-0055FF?style=for-the-badge&logo=framer&logoColor=white)]()

A highly interactive, performance-optimized creative developer portfolio built with React, TypeScript, and Framer Motion. Designed with a distinct dark/cyber aesthetic, prioritizing fluid animations, responsive layouts, and hidden technical depth.

**[View Live Site](YOUR_LIVE_LINK_HERE)**

---

## Key Features

- **Advanced Framer Motion Animations:** Implements complex parallax scrolling, staggered reveal animations, and physics-based interactions (springs) tailored for both desktop and mobile devices.
- **Interactive Architecture Views:** Project cards feature a custom toggle allowing users to seamlessly transition between high-level conceptual views and detailed system architecture node diagrams.
- **Magnetic UI Elements:** Custom physics-based magnetic CTA buttons that react to cursor proximity.
- **Dynamic GitHub Graph:** A custom, responsive visualization of contribution history spanning 52 weeks with interactive tooltips.
- **Floating Code Editor Simulation:** A programmatic, typing code editor window with syntax highlighting and a blinking cursor.
- **Accessibility & Performance First:** Features `useReducedMotion` hooks for users with accessibility preferences, CSS-based GPU acceleration (`transform-gpu`) for heavy overlays like film grain, and rigorous mobile-first responsive design.
- **Hidden Developer Easter Eggs:** Includes a custom DevTools console script (`sudo.hire()`) and an interactive 404 terminal with a fully playable Snake game engine.

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Animation Engine:** Framer Motion
- **Typography:** Inter (Sans), Unbounded (Display), UI Monospace
- **Deployment:** Vercel / Netlify (Update as needed)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have Node.js and npm (or yarn/pnpm) installed on your machine.

- npm
  ```sh
  npm install npm@latest -g
  ```

## Installation

### Clone the repository

```bash
git clone https://github.com/Davies70/portfolio_v2.git

cd YOUR_REPO_NAME
npm install
npm run dev
```

## Project Highlights (Components)

- HeroSection.tsx – Parallax neon orbs, dynamic scroll indicators, and reduced-motion fallbacks.

- ProjectStack.tsx & ArchitectureToggle.tsx – Sticky stacked cards on desktop, seamless list on mobile, with SVG node connection diagrams.

- Navbar.tsx – Staggered mobile menu animations with custom scroll-locking to prevent background clipping.

- NoiseOverlay.tsx – Optimized SVG noise filter using feTurbulence and CSS mix-blend-mode.

``<p align="center"> Designed & Built by Davies Ajayi &copy; 2026 </p>`
