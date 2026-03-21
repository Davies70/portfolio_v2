import React, { useState, useEffect } from "react";

// Layout & Global Components
import { NoiseOverlay } from "./components/NoiseOverlay";
import { Navbar } from "./components/Navbar";
import { BootSequence } from "./components/BootSequence";
import { NotFound } from "./page/NotFound";

// Sections
import { HeroSection } from "./components/HeroSection";
import { CodeShowcase } from "./components/CodeShowcase";
import { TechStackMarquee } from "./components/TechStackMarquee";
import { ProjectStack } from "./components/ProjectStack";
import { AboutSection } from "./components/AboutSection";
import { GitHubActivityGraph } from "./components/GitHubActivityGraph";
import { ContactSection } from "./components/ContactSection";
import { useDevToolsEasterEgg } from "./hooks/useDevToolsEasterEgg";

function App() {
  // --- STATE MANAGEMENT ---
  const [isBooting, setIsBooting] = useState(true);
  const [show404, setShow404] = useState(false);

  // --- MANUAL ROUTER (404 DETECTOR) ---
  useEffect(() => {
    // Detect if the user is at a sub-path (e.g., /test) instead of the home page
    const path = window.location.pathname;
    if (path !== "/" && path !== "/index.html") {
      setShow404(true);
    }
  }, []);

  const handleReturnHome = () => {
    // Clean the URL and go back to main site
    window.history.pushState({}, "", "/");
    setShow404(false);
  };

  // --- SCROLL LOCKING ---
  useEffect(() => {
    // Lock scroll if either the Boot Screen or the 404 Game is active
    if (isBooting || show404) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isBooting, show404]);

  // --- 404 OVERLAY RENDERING ---
  // If the path is wrong, we stop everything and show the Snake Game
  if (show404) {
    return <NotFound onReturn={handleReturnHome} />;
  }

  // --- DEVTOOLS EASTER EGG ---
  useDevToolsEasterEgg();

  return (
    <div
      className="relative min-h-screen overflow-x-hidden selection:bg-[#C5F82A] selection:text-[#0B0C10]"
      style={{ backgroundColor: "#0B0C10" }}
    >
      {/* --- LAYER 0: PRELOADER --- */}
      {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}
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

        {/* // 02 INITIALIZATION (Typed Code Editor) */}
        <CodeShowcase />

        {/* // 03 CAPABILITIES (Ticker/Marquee) */}
        <TechStackMarquee />

        {/* // 04 EXECUTABLES (Sticky Projects Stack) */}
        <ProjectStack />

        {/* // 05 IDENTITY (About Me / Skills) */}
        <AboutSection />

        {/* // 06 ACTIVITY (GitHub Style Contributions) */}
        <GitHubActivityGraph />

        {/* // 07 COMMUNICATION (Contact CTA) */}
        <ContactSection />
      </main>
      {/* --- LAYER 4: FLOATING WIDGETS --- */}
      {/* Only show the floating editor after booting is finished */}
      {/* --- LAYER 5: FOOTER DECORATION --- */}
      <footer className="bg-[#0B0C10] py-8 border-t border-[#E0E0E0]/5 text-center">
        <p className="font-mono text-[10px] text-[#E0E0E0]/30 uppercase tracking-[0.3em]">
          End_of_Transmission // {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;
