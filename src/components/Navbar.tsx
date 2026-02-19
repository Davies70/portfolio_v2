import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Navbar Background on Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial position on mount
    handleScroll();

    // Added { passive: true } for better scroll performance on mobile
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup in case component unmounts while menu is open
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Framer Motion variants for staggered mobile menu links
  const menuVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const linkVars = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`
          fixed top-0 left-0 w-full z-990 transition-all duration-300
          ${
            isScrolled
              ? "bg-black/80 backdrop-blur-md py-2 md:py-4"
              : "bg-black/60 md:bg-transparent py-4 md:py-6"
          }
        `}
      >
        <div className="container mx-auto px-6 md:px-20">
          <div
            className="
              bg-black/40 backdrop-blur-md
              px-6 md:px-8 py-3 md:py-4
              rounded-full flex items-center justify-between
              mx-auto w-full md:w-auto md:max-w-fit
            "
            style={{
              border: "1px solid rgba(197, 248, 42, 0.2)",
              boxShadow: "0 0 30px rgba(197, 248, 42, 0.08)",
            }}
          >
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {["home", "work", "about", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-[#E0E0E0] hover:text-[#C5F82A] transition-colors duration-300 text-sm tracking-wider relative group"
                >
                  {item.toUpperCase()}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5F82A] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Mobile Header (inside pill) */}
            <div className="flex md:hidden items-center justify-between w-full">
              <a
                href="#home"
                className="text-[#C5F82A] text-lg font-clash tracking-wider"
              >
                PORTFOLIO
              </a>

              {/* Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-white hover:text-[#C5F82A] transition-colors p-1"
                aria-label="Open menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center"
            style={{ backgroundColor: "rgba(11, 12, 16, 0.95)" }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 text-[#E0E0E0] hover:text-[#C5F82A] transition-colors p-4 rounded-full bg-black/20 hover:bg-black/40"
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Staggered Links */}
            <motion.div
              variants={menuVars}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col items-center gap-8 md:gap-12 relative z-10"
            >
              {["home", "work", "about", "contact"].map((item) => (
                <motion.a
                  variants={linkVars}
                  key={item}
                  href={`#${item}`}
                  onClick={handleLinkClick}
                  className="text-white hover:text-[#C5F82A] transition-colors duration-300 font-clash text-4xl sm:text-5xl tracking-tight relative group"
                >
                  {item.toUpperCase()}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C5F82A] group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </motion.div>

            {/* Decorative Glow */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, #C5F82A 0%, transparent 70%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
