import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  const menuVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const linkVars = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  } as const;

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-[990] transition-all duration-300 ${
          isScrolled ? "py-2 md:py-4" : "py-4 md:py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-20">
          <div
            className="bg-[#12141A] border-2 border-[#E0E0E0]/20 px-4 md:px-8 py-3 flex items-center justify-between mx-auto w-full md:w-auto md:max-w-fit transition-all duration-300"
            style={{
              boxShadow: isScrolled
                ? "4px 4px 0px rgba(197, 248, 42, 0.4)"
                : "8px 8px 0px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 font-mono text-xs font-bold tracking-widest uppercase">
              {["home", "work", "about", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-[#E0E0E0] hover:text-[#C5F82A] transition-colors duration-200 relative group flex items-center gap-1"
                >
                  <span className="text-[#C5F82A] opacity-0 group-hover:opacity-100 transition-opacity">
                    {">"}
                  </span>
                  {item}
                </a>
              ))}
            </div>

            {/* Mobile Header */}
            <div className="flex md:hidden items-center justify-between w-full">
              <a
                href="#home"
                className="text-[#C5F82A] text-sm font-mono font-bold tracking-widest uppercase"
              >
                [ SYS.PORTFOLIO ]
              </a>

              {/* Square Brutalist Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-[#E0E0E0] hover:text-[#0B0C10] hover:bg-[#C5F82A] border-2 border-transparent hover:border-[#C5F82A] transition-all p-1.5"
                aria-label="Open menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
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

      {/* MOBILE MENU OVERLAY - Fixed Background Transparency */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            /* Removed 'noise' from here, kept the solid background */
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0B0C10]"
          >
            {/* Added noise as a separate background layer behind the links */}
            <div className="absolute inset-0 noise pointer-events-none z-0" />

            {/* Brutalist Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 text-[#E0E0E0] hover:text-[#0B0C10] hover:bg-[#C5F82A] border-2 border-[#E0E0E0]/20 hover:border-[#C5F82A] transition-all p-3 bg-[#12141A] z-20"
              style={{ boxShadow: "4px 4px 0px rgba(197, 248, 42, 0.4)" }}
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Terminal Style Links */}
            <motion.div
              variants={menuVars}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col items-start gap-8 relative z-10 w-full px-12"
            >
              {["home", "work", "about", "contact"].map((item, idx) => (
                <motion.a
                  variants={linkVars}
                  key={item}
                  href={`#${item}`}
                  onClick={handleLinkClick}
                  className="text-white hover:text-[#0B0C10] hover:bg-[#C5F82A] transition-colors duration-200 font-mono font-bold text-3xl sm:text-4xl tracking-widest uppercase w-full p-4 border-l-4 border-[#C5F82A] bg-[#12141A]/90 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                >
                  <span className="text-[#C5F82A] mr-4 text-xl mix-blend-difference">
                    0{idx + 1}.
                  </span>
                  {item}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
