import React from 'react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  return (
    <section 
      id="about"
      className="relative py-32"
      style={{ backgroundColor: '#0B0C10' }}
    >
      <div className="container mx-auto px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-clash text-white mb-12 tracking-tighter"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-[#E0E0E0] leading-relaxed" style={{ fontSize: '1.125rem' }}>
                I'm a creative developer passionate about crafting pixel-perfect interfaces 
                and seamless user experiences. With over 8 years of experience, I specialize 
                in transforming ambitious ideas into reality.
              </p>
              
              <p className="text-[#E0E0E0] leading-relaxed" style={{ fontSize: '1.125rem' }}>
                My approach combines technical excellence with creative vision, ensuring 
                every project not only functions flawlessly but also captivates users.
              </p>

              <div className="pt-6">
                <motion.button
                  className="px-8 py-4 glass rounded-full text-[#C5F82A] hover:bg-[#C5F82A] hover:text-[#0B0C10] transition-all duration-300"
                  style={{
                    border: '1px solid rgba(197, 248, 42, 0.3)',
                    boxShadow: '0 0 30px rgba(197, 248, 42, 0.1)'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 50px rgba(197, 248, 42, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Resume
                </motion.button>
              </div>
            </motion.div>

            {/* Right Column - Skills Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-clash text-white mb-4 tracking-tight" style={{ fontSize: '1.5rem' }}>
                  Technical Stack
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'React & Next.js',
                    'TypeScript',
                    'Node.js',
                    'GraphQL',
                    'Three.js',
                    'WebGL',
                    'Framer Motion',
                    'Tailwind CSS'
                  ].map((skill) => (
                    <motion.div
                      key={skill}
                      className="glass px-4 py-3 rounded-xl text-[#E0E0E0] text-sm"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 0 20px rgba(197, 248, 42, 0.2)'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-clash text-white mb-4 tracking-tight" style={{ fontSize: '1.5rem' }}>
                  Awards & Recognition
                </h3>
                <div className="space-y-3">
                  {[
                    'Awwwards Site of the Day',
                    'FWA Mobile of the Day',
                    'CSS Design Awards Winner'
                  ].map((award) => (
                    <div 
                      key={award}
                      className="flex items-center gap-3 text-[#E0E0E0] text-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#C5F82A]" />
                      {award}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};