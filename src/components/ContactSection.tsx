import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || !isHovering) return;
      
      const button = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = button.left + button.width / 2;
      const buttonCenterY = button.top + button.height / 2;
      
      const distanceX = e.clientX - buttonCenterX;
      const distanceY = e.clientY - buttonCenterY;
      
      // Magnetic effect - button moves toward cursor
      const magnetStrength = 0.3;
      setMousePosition({
        x: distanceX * magnetStrength,
        y: distanceY * magnetStrength
      });
    };

    if (isHovering) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section 
      id="contact"
      className="relative py-32 overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Curved SVG Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ height: '100px' }}>
        <svg 
          viewBox="0 0 1200 100" 
          preserveAspectRatio="none"
          className="w-full h-full"
          style={{ transform: 'translateY(-1px)' }}
        >
          <path 
            d="M0,0 Q600,100 1200,0 L1200,100 L0,100 Z" 
            fill="#0B0C10"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-clash text-white tracking-tighter"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            LET'S WORK
            <br />
            TOGETHER
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#E0E0E0] max-w-2xl mx-auto"
            style={{ fontSize: '1.125rem' }}
          >
            Have a project in mind? Let's create something extraordinary together. 
            From concept to launch, I'll help bring your vision to life.
          </motion.p>

          {/* Magnetic CTA Button */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-12"
          >
            <motion.button
              ref={buttonRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative"
              animate={{
                x: mousePosition.x,
                y: mousePosition.y
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            >
              <motion.div
                className="w-64 h-64 rounded-full flex items-center justify-center text-[#0B0C10] font-clash tracking-tight relative overflow-hidden group"
                style={{ 
                  backgroundColor: '#C5F82A',
                  fontSize: '1.25rem',
                  boxShadow: '0 0 80px rgba(197, 248, 42, 0.4), inset 0 0 40px rgba(197, 248, 42, 0.2)'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">GET IN TOUCH</span>
                
                {/* Hover effect overlay */}
                <motion.div 
                  className="absolute inset-0 bg-white"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  GET IN TOUCH
                </span>
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-20 space-y-6"
          >
            <div className="flex justify-center gap-8 text-[#E0E0E0]">
              {[
                { name: 'GitHub', url: '#' },
                { name: 'LinkedIn', url: '#' },
                { name: 'Twitter', url: '#' },
                { name: 'Dribbble', url: '#' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="relative group"
                >
                  <span className="text-sm tracking-wider hover:text-[#C5F82A] transition-colors">
                    {social.name}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5F82A] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            <div className="text-[#E0E0E0] text-sm">
              hello@creative.dev
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-0 right-0 text-center text-[#E0E0E0] text-xs tracking-widest"
      >
        © 2026 CREATIVE DEVELOPER. ALL RIGHTS RESERVED.
      </motion.div>
    </section>
  );
};