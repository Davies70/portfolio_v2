import { NoiseOverlay } from "./components/NoiseOverlay";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProjectStack } from "./components/ProjectStack";
import { TechStackMarquee } from "./components/TechStackMarquee";
import { FloatingCodeEditor } from "./components/FloatingCodeEditor";
import { AboutSection } from "./components/AboutSection";
import { GitHubActivityGraph } from "./components/GitHubActivityGraph";
import { ContactSection } from "./components/ContactSection";
import { useEffect } from "react";
import { useDevToolsEasterEgg } from "./hooks/useDevToolsEasterEgg"; // Adjust path

function App() {
  useDevToolsEasterEgg(); // Initialize the dev tools easter egg
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#0B0C10" }}
    >
      {/* Film Grain Overlay */}
      <NoiseOverlay />

      {/* Floating Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Tech Stack Marquee */}
      <TechStackMarquee />

      {/* Project Stack */}
      <ProjectStack />

      {/* Floating Code Editor */}
      <FloatingCodeEditor />

      {/* About Section */}
      <AboutSection />

      {/* GitHub Activity Graph */}
      <GitHubActivityGraph />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}

export default App;
