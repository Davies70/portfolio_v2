import React from 'react';
import { motion } from 'motion/react';

interface ArchitectureToggleProps {
  isArchitectureView: boolean;
  onToggle: () => void;
  accentColor: string;
}

export const ArchitectureToggle: React.FC<ArchitectureToggleProps> = ({
  isArchitectureView,
  onToggle,
  accentColor,
}) => {
  return (
    <motion.button
      onClick={onToggle}
      // Shrunk baseline padding/gaps, expands on sm and md screens
      className='glass px-2.5 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full flex items-center gap-1.5 md:gap-3 text-[10px] sm:text-xs md:text-sm z-50 relative shrink-0'
      style={{
        border: `1px solid ${accentColor}40`,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className='text-[#E0E0E0] hidden md:inline'>View:</span>
      <div className='flex items-center gap-1.5 md:gap-2'>
        <span
          className={!isArchitectureView ? 'text-white' : 'text-white/50'}
          style={{ color: !isArchitectureView ? accentColor : undefined }}
        >
          Concept
        </span>

        {/* Dynamic toggle track that uses flexbox instead of hardcoded pixels */}
        <div
          className='relative w-8 sm:w-10 md:w-12 h-4 sm:h-5 md:h-6 rounded-full flex items-center px-0.5'
          style={{
            backgroundColor: '#1A1D23',
            justifyContent: isArchitectureView ? 'flex-end' : 'flex-start',
          }}
        >
          {/* Framer 'layout' automatically animates the flex position change */}
          <motion.div
            layout
            className='w-3 h-3 sm:w-4 sm:h-4 rounded-full'
            style={{ backgroundColor: accentColor }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          />
        </div>

        <span
          className={isArchitectureView ? 'text-white' : 'text-white/50'}
          style={{ color: isArchitectureView ? accentColor : undefined }}
        >
          Arch
        </span>
      </div>
    </motion.button>
  );
};
interface SystemArchitectureProps {
  projectTitle: string;
  accentColor: string;
  nodes: { id: string; label: string; x: number; y: number }[];
  connections: { from: string; to: string }[];
}

export const SystemArchitecture: React.FC<SystemArchitectureProps> = ({
  projectTitle,
  accentColor,
  nodes,
  connections,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      // Removed flex/justify-center to use a more structured internal layout
      className='absolute inset-0 overflow-hidden flex flex-col'
    >
      {/* Blueprint Dot Grid Background */}
      <motion.div
        className='absolute inset-0 opacity-20'
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: `radial-gradient(${accentColor} 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Title Section - Sticks to the top */}
      <div className='text-center pt-6 md:pt-10 relative z-10 shrink-0'>
        <h4 className='text-white font-clash text-md md:text-2xl mb-1 drop-shadow-lg'>
          {projectTitle}
        </h4>
        <p className='text-[#E0E0E0]/80 text-xs md:text-sm tracking-widest uppercase font-mono'>
          System Architecture
        </p>
      </div>

      {/* Inner Canvas Bounding Box - Defines the safe zone for rendering */}
      {/* The margins (mx-10, mt-8, etc.) create the padding to prevent edge-bleeding */}
      <div className='relative flex-1 mt-6 mb-8 mx-8 md:mt-12 md:mb-12 md:mx-20 z-10'>
        {nodes.length === 0 && (
          <div className='absolute inset-0 flex items-center justify-center text-white/40 font-mono text-sm'>
            Architecture schematic pending...
          </div>
        )}

        {/* SVG Canvas for connections */}
        {/* overflow-visible ensures lines don't get clipped if a node slightly overhangs the inner canvas */}
        <svg className='absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0'>
          {connections.map((conn, idx) => {
            const fromNode = nodes.find((n) => n.id === conn.from);
            const toNode = nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            return (
              <motion.line
                key={idx}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={accentColor}
                strokeWidth='1.5'
                strokeDasharray='4 4'
                opacity='0.5'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1,
                  delay: idx * 0.1,
                  ease: 'easeInOut',
                }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, idx) => (
          <motion.div
            key={node.id}
            className='absolute backdrop-blur-md rounded-lg md:rounded-xl p-2 md:p-4 flex items-center justify-center z-10'
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              backgroundColor: 'rgba(26, 29, 35, 0.85)',
              border: `1px solid ${accentColor}50`,
              boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 15px ${accentColor}20`,
            }}
            // Framer motion "x" and "y" is the modern way to do transform: translate(-50%, -50%)
            initial={{ scale: 0, opacity: 0, x: '-50%', y: '-40%' }}
            animate={{ scale: 1, opacity: 1, x: '-50%', y: '-50%' }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <div className='text-white text-[10px] sm:text-xs md:text-sm whitespace-nowrap font-mono font-medium drop-shadow-md'>
              {node.label}
            </div>
            {/* Pulsing border effect */}
            <motion.div
              className='absolute inset-0 rounded-lg md:rounded-xl pointer-events-none'
              style={{ border: `1px solid ${accentColor}` }}
              animate={{ opacity: [0.1, 0.6, 0.1] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        ))}

        {/* Data flow animation particles */}
        {connections.map((conn, idx) => {
          const fromNode = nodes.find((n) => n.id === conn.from);
          const toNode = nodes.find((n) => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.div
              key={`particle-${idx}`}
              className='absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full z-20'
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 0 10px 2px ${accentColor}`,
              }}
              // Explicitly center the particle via x and y transform
              initial={{
                left: `${fromNode.x}%`,
                top: `${fromNode.y}%`,
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                left: `${toNode.x}%`,
                top: `${toNode.y}%`,
                x: '-50%',
                y: '-50%',
              }}
              transition={{
                duration: 2.5,
                delay: idx * 0.2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
};
