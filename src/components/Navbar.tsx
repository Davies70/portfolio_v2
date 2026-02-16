import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-full z-[999] transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none'
        }}
      >
        <div className="container mx-auto px-6 md:px-20 py-4 md:py-6">
          <div 
            className="glass px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center justify-between mx-auto max-w-fit"
            style={{
              border: '1px solid rgba(197, 248, 42, 0.2)',
              boxShadow: '0 0 30px rgba(197, 248, 42, 0.1)'
            }}
          >
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a 
                href="#home" 
                className="text-[#E0E0E0] hover:text-[#C5F82A] transition-colors duration-300 text-sm tracking-wider relative group"
              >
                HOME
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5F82A] group-hover:w-full transition-all duration-300" />
              </a>
              <a 
                href="#work" 
                className="text-[#E0E0E0] hover:text-[#C5F82A] transition-colors duration-300 text-sm tracking-wider relative group"
              >
                WORK
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5F82A] group-hover:w-full transition-all duration-300" />
              </a>
              <a 
                href="#about" 
                className="text-[#E0E0E0] hover:text-[#C5F82A] transition-colors duration-300 text-sm tracking-wider relative group"
              >
                ABOUT
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5F82A] group-hover:w-full transition-all duration-300" />
              </a>
              <a 
                href="#contact" 
                className="text-[#E0E0E0] hover:text-[#C5F82A] transition-colors duration-300 text-sm tracking-wider relative group"
              >
                CONTACT
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5F82A] group-hover:w-full transition-all duration-300" />
              </a>
            </div>

            {/* Mobile: Logo/Brand on left, Hamburger on right */}
            <div className="flex md:hidden items-center justify-between w-full">
              <a href="#home" className="text-[#C5F82A] text-lg font-clash tracking-wider">
                PORTFOLIO
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#E0E0E0] hover:text-[#C5F82A] transition-colors p-2"
                aria-label="Toggle menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(11, 12, 16, 0.98)' }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-[#E0E0E0] hover:text-[#C5F82A] transition-colors p-2"
              aria-label="Close menu"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Mobile Menu Links */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center gap-8"
            >
              <a 
                href="#home"
                onClick={handleLinkClick}
                className="text-white hover:text-[#C5F82A] transition-colors duration-300 font-clash text-5xl tracking-tight"
              >
                HOME
              </a>
              <a 
                href="#work"
                onClick={handleLinkClick}
                className="text-white hover:text-[#C5F82A] transition-colors duration-300 font-clash text-5xl tracking-tight"
              >
                WORK
              </a>
              <a 
                href="#about"
                onClick={handleLinkClick}
                className="text-white hover:text-[#C5F82A] transition-colors duration-300 font-clash text-5xl tracking-tight"
              >
                ABOUT
              </a>
              <a 
                href="#contact"
                onClick={handleLinkClick}
                className="text-white hover:text-[#C5F82A] transition-colors duration-300 font-clash text-5xl tracking-tight"
              >
                CONTACT
              </a>
            </motion.div>

            {/* Decorative Element */}
            <div 
              className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full opacity-10 blur-[100px]"
              style={{ background: 'radial-gradient(circle, #C5F82A 0%, transparent 70%)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};