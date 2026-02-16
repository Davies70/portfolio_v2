import React, { useState } from 'react';
import { motion } from 'motion/react';

const technologies = [
  { name: 'React', color: '#61DAFB', icon: '⚛️' },
  { name: 'TypeScript', color: '#3178C6', icon: 'TS' },
  { name: 'Next.js', color: '#FFFFFF', icon: '▲' },
  { name: 'Node.js', color: '#339933', icon: '◆' },
  { name: 'PostgreSQL', color: '#4169E1', icon: '🐘' },
  { name: 'AWS', color: '#FF9900', icon: '☁️' },
  { name: 'Docker', color: '#2496ED', icon: '🐳' },
  { name: 'GraphQL', color: '#E10098', icon: '◈' },
  { name: 'Tailwind', color: '#06B6D4', icon: '🎨' },
  { name: 'MongoDB', color: '#47A248', icon: '🍃' },
  { name: 'Redis', color: '#DC382D', icon: '⚡' },
  { name: 'Python', color: '#3776AB', icon: '🐍' },
];

export const TechStackMarquee: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Duplicate the array for seamless loop
  const duplicatedTechs = [...technologies, ...technologies];

  return (
    <section
      className='relative py-24 overflow-hidden'
      style={{ backgroundColor: '#0B0C10' }}
    >
      <div className='container mx-auto px-6 md:px-20 mb-12'>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='font-clash text-white tracking-tighter text-center'
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            letterSpacing: '-0.04em',
          }}
        >
          Trusted Tech Stack
        </motion.h2>
      </div>

      {/* Marquee Container with Fade Masks */}
      <div className='relative'>
        {/* Left Fade */}
        <div
          className='absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none'
          style={{
            background:
              'linear-gradient(to right, #0B0C10 0%, transparent 100%)',
          }}
        />

        {/* Right Fade */}
        <div
          className='absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none'
          style={{
            background:
              'linear-gradient(to left, #0B0C10 0%, transparent 100%)',
          }}
        />

        {/* Scrolling Strip with Glassmorphism Reflection */}
        <div className='relative'>
          <motion.div
            className='flex gap-12 py-8'
            animate={{
              x: hoveredTech ? 0 : [0, -1800],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 40,
                ease: 'linear',
              },
            }}
          >
            {duplicatedTechs.map((tech, idx) => (
              <TechLogo
                key={`${tech.name}-${idx}`}
                tech={tech}
                isHovered={hoveredTech === tech.name}
                onHover={() => setHoveredTech(tech.name)}
                onLeave={() => setHoveredTech(null)}
              />
            ))}
          </motion.div>

          {/* Glassmorphism Reflection Strip */}
          <div
            className='absolute inset-x-0 bottom-0 h-1/2 pointer-events-none'
            style={{
              background:
                'linear-gradient(to top, rgba(255, 255, 255, 0.03), transparent)',
              backdropFilter: 'blur(8px)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

interface TechLogoProps {
  tech: { name: string; color: string; icon: string };
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const TechLogo: React.FC<TechLogoProps> = ({
  tech,
  isHovered,
  onHover,
  onLeave,
}) => {
  return (
    <motion.div
      className='flex-shrink-0 flex flex-col items-center justify-center gap-3 cursor-pointer'
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      animate={{
        scale: isHovered ? 1.3 : 1,
        filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
      }}
      transition={{ duration: 0.3 }}
      style={{ width: '120px' }}
    >
      {/* Icon/Logo */}
      <motion.div
        className='w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl relative'
        style={{
          border: isHovered
            ? `2px solid ${tech.color}`
            : '2px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered ? `0 0 30px ${tech.color}60` : 'none',
        }}
        animate={{
          backgroundColor: isHovered
            ? `${tech.color}20`
            : 'rgba(255, 255, 255, 0.05)',
        }}
      >
        <span style={{ color: isHovered ? tech.color : '#E0E0E0' }}>
          {tech.icon}
        </span>

        {/* Glow effect on hover */}
        {isHovered && (
          <motion.div
            className='absolute inset-0 rounded-2xl'
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              border: `1px solid ${tech.color}`,
            }}
          />
        )}
      </motion.div>

      {/* Tech Name */}
      <motion.span
        className='text-sm tracking-wider font-mono'
        style={{
          color: isHovered ? tech.color : '#E0E0E0',
          textShadow: isHovered ? `0 0 20px ${tech.color}` : 'none',
        }}
      >
        {tech.name}
      </motion.span>
    </motion.div>
  );
};
