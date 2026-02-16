import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const codeSnippet = `interface UserAuth {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

const useAuth = () => {
  const [user, setUser] = 
    useState<UserAuth | null>(null);
  
  useEffect(() => {
    const token = localStorage
      .getItem('authToken');
    if (token) validateToken(token);
  }, []);
  
  return { user, isAuth: !!user };
};`;

export const FloatingCodeEditor: React.FC = () => {
  const [typedCode, setTypedCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < codeSnippet.length) {
        setTypedCode(codeSnippet.slice(0, currentIndex + 1));
        // Count newlines to update cursor position
        const lines = codeSnippet.slice(0, currentIndex + 1).split('\n').length;
        setCurrentLine(lines);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative py-32 overflow-hidden"
      style={{ backgroundColor: '#0B0C10' }}
    >
      <div className="container mx-auto px-6 md:px-20">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-clash text-white mb-16 tracking-tighter text-center"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', letterSpacing: '-0.04em' }}
        >
          Clean, Beautiful Code
        </motion.h2>

        <div className="flex items-center justify-center relative">
          {/* Floating 3D Symbols */}
          <FloatingSymbol symbol="{" delay={0} x={-200} y={-100} />
          <FloatingSymbol symbol="}" delay={0.5} x={-150} y={100} />
          <FloatingSymbol symbol="</" delay={1} x={200} y={-80} />
          <FloatingSymbol symbol="/>" delay={1.5} x={250} y={120} />
          <FloatingSymbol symbol=";" delay={2} x={-100} y={-150} />

          {/* VS Code Style Editor Window */}
          <motion.div
            initial={{ opacity: 0, rotateY: -15, rotateX: 5 }}
            whileInView={{ opacity: 1, rotateY: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative glass rounded-2xl overflow-hidden"
            style={{
              width: '800px',
              maxWidth: '90vw',
              border: '1px solid rgba(197, 248, 42, 0.3)',
              boxShadow: '0 20px 80px rgba(0, 0, 0, 0.5), 0 0 40px rgba(197, 248, 42, 0.15)',
              transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)'
            }}
          >
            {/* Window Header */}
            <div 
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ 
                backgroundColor: '#1A1D23',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-[#E0E0E0] text-sm font-mono">
                useAuth.ts
              </div>
              <div className="w-16" /> {/* Spacer for centering */}
            </div>

            {/* Code Area */}
            <div 
              className="p-6 font-mono text-sm overflow-hidden"
              style={{ 
                backgroundColor: '#111',
                minHeight: '400px'
              }}
            >
              {/* Line Numbers */}
              <div className="flex gap-4">
                <div className="text-[#E0E0E0]/30 select-none">
                  {typedCode.split('\n').map((_, idx) => (
                    <div key={idx} className="leading-6">
                      {String(idx + 1).padStart(2, ' ')}
                    </div>
                  ))}
                </div>

                {/* Code Content with Syntax Highlighting */}
                <pre className="flex-1">
                  <code className="text-[#E0E0E0] leading-6">
                    {typedCode.split('\n').map((line, idx) => (
                      <div key={idx}>
                        <SyntaxHighlightedLine line={line} />
                      </div>
                    ))}
                    {/* Blinking Cursor */}
                    <motion.span
                      className="inline-block w-2 h-5 bg-[#C5F82A] ml-1"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </code>
                </pre>
              </div>
            </div>

            {/* Status Bar */}
            <div 
              className="flex items-center justify-between px-4 py-2 text-xs border-t"
              style={{ 
                backgroundColor: '#1A1D23',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: '#E0E0E0'
              }}
            >
              <div className="flex items-center gap-4">
                <span>TypeScript React</span>
                <span>UTF-8</span>
              </div>
              <div className="flex items-center gap-4">
                <span>Ln {currentLine}, Col 1</span>
                <span className="text-[#C5F82A]">✓ Formatted</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface FloatingSymbolProps {
  symbol: string;
  delay: number;
  x: number;
  y: number;
}

const FloatingSymbol: React.FC<FloatingSymbolProps> = ({ symbol, delay, x, y }) => {
  return (
    <motion.div
      className="absolute text-6xl font-mono opacity-10"
      style={{ 
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        color: '#C5F82A'
      }}
      initial={{ opacity: 0, scale: 0, rotate: -45 }}
      whileInView={{ opacity: 0.15, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {symbol}
    </motion.div>
  );
};

interface SyntaxHighlightedLineProps {
  line: string;
}

const SyntaxHighlightedLine: React.FC<SyntaxHighlightedLineProps> = ({ line }) => {
  // Simple syntax highlighting
  const keywords = ['interface', 'const', 'useState', 'useEffect', 'return', 'if'];
  const types = ['string', 'null', 'UserAuth'];
  
  let highlighted = line;
  
  // Highlight keywords
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    highlighted = highlighted.replace(regex, `<span style="color: #FF79C6">${keyword}</span>`);
  });
  
  // Highlight types
  types.forEach(type => {
    const regex = new RegExp(`\\b${type}\\b`, 'g');
    highlighted = highlighted.replace(regex, `<span style="color: #8BE9FD">${type}</span>`);
  });
  
  // Highlight strings
  highlighted = highlighted.replace(/'([^']*)'/g, '<span style="color: #F1FA8C">\'$1\'</span>');
  
  // Highlight function names
  highlighted = highlighted.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span style="color: #50FA7B">$1</span>(');
  
  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
};
