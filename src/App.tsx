import React, { Suspense, lazy, useState, useEffect, useCallback } from "react";

// Layout & Global Components
import { NoiseOverlay } from "./components/NoiseOverlay";
import { Navbar } from "./components/Navbar";
import { BootSequence } from "./components/BootSequence";
import { NotFound } from "./page/NotFound";

// Sections
import { HeroSection } from "./components/HeroSection";
import { useDevToolsEasterEgg } from "./hooks/useDevToolsEasterEgg";
import { useBodyScrollLock } from "./hooks/useBodyScrollLock";

const CodeShowcase = lazy(() =>
  import("./components/CodeShowcase").then((module) => ({
    default: module.CodeShowcase,
  })),
);
const TechStackMarquee = lazy(() =>
  import("./components/TechStackMarquee").then((module) => ({
    default: module.TechStackMarquee,
  })),
);
const ProjectStack = lazy(() =>
  import("./components/ProjectStack").then((module) => ({
    default: module.ProjectStack,
  })),
);
const AboutSection = lazy(() =>
  import("./components/AboutSection").then((module) => ({
    default: module.AboutSection,
  })),
);
// const GitHubActivityGraph = lazy(() =>
//   import("./components/GitHubActivityGraph").then((module) => ({
//     default: module.GitHubActivityGraph,
//   })),
// );
const ContactSection = lazy(() =>
  import("./components/ContactSection").then((module) => ({
    default: module.ContactSection,
  })),
);

const SectionFallback = () => (
  <div className="min-h-32 bg-portfolio-bg" aria-hidden="true" />
);

function App() {
  // --- STATE MANAGEMENT ---
  const [isBooting, setIsBooting] = useState(true);
  const [show404, setShow404] = useState(false);
  useDevToolsEasterEgg();
  useBodyScrollLock(isBooting || show404);

  // --- MANUAL ROUTER (404 DETECTOR) ---
  useEffect(() => {
    // Detect if the user is at a sub-path (e.g., /test) instead of the home page
    const path = window.location.pathname;
    if (path !== "/" && path !== "/index.html") {
      setShow404(true);
    }
  }, []);

  const handleReturnHome = useCallback(() => {
    // Clean the URL and go back to main site
    window.history.pushState({}, "", "/");
    setShow404(false);
  }, []);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
  }, []);

  // --- 404 OVERLAY RENDERING ---
  // If the path is wrong, we stop everything and show the Snake Game
  if (show404) {
    return <NotFound onReturn={handleReturnHome} />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-portfolio-bg selection:bg-portfolio-accent selection:text-portfolio-bg">
      {/* --- LAYER 0: PRELOADER --- */}
      {isBooting && <BootSequence onComplete={handleBootComplete} />}
      {/* --- LAYER 1: BACKGROUND & OVERLAYS --- */}
      <NoiseOverlay />
      {/* <CustomCursor /> */}{" "}
      {/* Uncomment if you decided to keep the custom cursor */}
      {/* --- LAYER 2: NAVIGATION --- */}
      <Navbar />
      {/* --- LAYER 3: MAIN CONTENT --- */}
      <main>
        {/* // 01 HERO SECTION */}
        <HeroSection />

        <Suspense fallback={<SectionFallback />}>
          {/* // 02 INITIALIZATION (Typed Code Editor) */}
          <CodeShowcase />

          {/* // 03 CAPABILITIES (Ticker/Marquee) */}
          <TechStackMarquee />

          {/* // 04 EXECUTABLES (Sticky Projects Stack) */}
          <ProjectStack />

          {/* // 05 IDENTITY (About Me / Skills) */}
          <AboutSection />

          {/* // 06 ACTIVITY (GitHub Style Contributions) */}
          {/* <GitHubActivityGraph /> */}

          {/* // 07 COMMUNICATION (Contact CTA) */}
          <ContactSection />
        </Suspense>
      </main>
      {/* --- LAYER 4: FLOATING WIDGETS --- */}
      {/* Only show the floating editor after booting is finished */}
      {/* --- LAYER 5: FOOTER DECORATION --- */}
      <footer className="bg-portfolio-bg py-8 border-t border-portfolio-fg/5 text-center">
        <p className="font-mono text-[10px] text-portfolio-fg/30 uppercase tracking-[0.3em]">
          End_of_Transmission // {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;
