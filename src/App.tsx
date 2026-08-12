import React, { Suspense, lazy, useState, useEffect, useCallback } from "react";

// Layout & Global Components
import { NoiseOverlay } from "./components/NoiseOverlay";
import { Navbar } from "./components/Navbar";
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
const ContactSection = lazy(() =>
  import("./components/ContactSection").then((module) => ({
    default: module.ContactSection,
  })),
);

const SectionFallback = () => (
  <div className="min-h-32 bg-portfolio-bg" aria-hidden="true" />
);

function App() {
  const [show404, setShow404] = useState(false);
  useDevToolsEasterEgg();
  useBodyScrollLock(show404);

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

  if (show404) {
    return <NotFound onReturn={handleReturnHome} />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-portfolio-bg selection:bg-portfolio-accent selection:text-portfolio-bg">
      <NoiseOverlay />
      <Navbar />
      <main>
        <HeroSection />

        <Suspense fallback={<SectionFallback />}>
          <CodeShowcase />
          <TechStackMarquee />
          <ProjectStack />
          <AboutSection />
          <ContactSection />
        </Suspense>
      </main>
      <footer className="bg-portfolio-bg py-8 border-t border-portfolio-fg/5 text-center">
        <p className="font-mono text-[10px] text-portfolio-muted uppercase tracking-[0.24em]">
          Davies Ajayi / {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;
