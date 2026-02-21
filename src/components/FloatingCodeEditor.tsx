// 1. Add useRef to React imports
import React, { useState, useEffect, useRef } from "react";
// 2. Add useInView to Framer Motion imports
import { motion, useInView } from "motion/react";

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
  const [typedCode, setTypedCode] = useState("");
  const [currentLine, setCurrentLine] = useState(0);

  // 3. Create a ref for the container section
  const containerRef = useRef(null);

  // 4. Use the useInView hook.
  // 'once: true' ensures the animation runs only the first time it comes into view.
  // 'amount: 0.3' means it triggers when 30% of the section is visible.
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    // 5. IMPORTANT: Exit early if the component is not yet in view.
    if (!isInView) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < codeSnippet.length) {
        setTypedCode(codeSnippet.slice(0, currentIndex + 1));
        // Count newlines to update cursor position
        const lines = codeSnippet.slice(0, currentIndex + 1).split("\n").length;
        setCurrentLine(lines);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
    // 6. Change dependency from [] to [isInView] so it re-runs when visibility changes
  }, [isInView]);

  return (
    <section
      // 7. Attach the ref to the section container
      ref={containerRef}
      // Tightened mobile padding to match previous sections
      className="relative py-12 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#0B0C10" }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-clash text-white mb-8 md:mb-16 tracking-tighter text-center"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            letterSpacing: "-0.04em",
          }}
        >
          Clean, Beautiful Code
        </motion.h2>

        <div className="flex items-center justify-center relative">
          {/* Floating 3D Symbols - Hidden on mobile to reduce clutter */}
          <div className="hidden md:block">
            <FloatingSymbol symbol="{" delay={0} x={-200} y={-100} />
            <FloatingSymbol symbol="}" delay={0.5} x={-150} y={100} />
            <FloatingSymbol symbol="</" delay={1} x={200} y={-80} />
            <FloatingSymbol symbol="/>" delay={1.5} x={250} y={120} />
            <FloatingSymbol symbol=";" delay={2} x={-100} y={-150} />
          </div>

          {/* VS Code Style Editor Window */}
          {/* Removed 3D transform on mobile so it's readable, applied on md: screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative glass rounded-xl md:rounded-2xl overflow-hidden w-full max-w-full md:max-w-[800px]"
            style={{
              border: "1px solid rgba(197, 248, 42, 0.3)",
              boxShadow:
                "0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(197, 248, 42, 0.1)",
            }}
          >
            {/* Window Header */}
            <div
              className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b"
              style={{
                backgroundColor: "#1A1D23",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-[#E0E0E0] text-xs md:text-sm font-mono truncate px-2">
                useAuth.ts
              </div>
              <div className="w-12 md:w-16" /> {/* Spacer for centering */}
            </div>

            {/* Code Area - Allowed horizontal scrolling for small screens if needed */}
            <div
              className="p-4 md:p-6 font-mono text-xs md:text-sm overflow-x-auto custom-scrollbar"
              style={{
                backgroundColor: "#111",
                minHeight: "250px",
              }}
            >
              <div className="flex gap-3 md:gap-4 min-w-max">
                {/* Line Numbers */}
                <div className="text-[#E0E0E0]/30 select-none text-right min-w-[1.5rem]">
                  {typedCode.split("\n").map((_, idx) => (
                    <div key={idx} className="leading-6">
                      {String(idx + 1)}
                    </div>
                  ))}
                </div>

                {/* Code Content with Syntax Highlighting */}
                <pre className="flex-1 m-0 p-0">
                  <code className="text-[#E0E0E0] leading-6 block">
                    {typedCode.split("\n").map((line, idx) => (
                      <div key={idx} className="min-h-[1.5rem]">
                        <SyntaxHighlightedLine line={line} />
                      </div>
                    ))}
                    {/* Blinking Cursor */}
                    <motion.span
                      className="inline-block w-1.5 md:w-2 h-4 md:h-5 bg-[#C5F82A] ml-1 align-middle"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </code>
                </pre>
              </div>
            </div>

            {/* Status Bar - Simplified for mobile */}
            <div
              className="flex items-center justify-between px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs border-t flex-wrap gap-2"
              style={{
                backgroundColor: "#1A1D23",
                borderColor: "rgba(255, 255, 255, 0.1)",
                color: "#E0E0E0",
              }}
            >
              <div className="flex items-center gap-2 md:gap-4">
                <span>TS React</span>
                <span className="hidden sm:inline">UTF-8</span>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <span>Ln {currentLine}, Col 1</span>
                <span className="text-[#C5F82A] hidden sm:inline">
                  ✓ Formatted
                </span>
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

const FloatingSymbol: React.FC<FloatingSymbolProps> = ({
  symbol,
  delay,
  x,
  y,
}) => {
  return (
    <motion.div
      className="absolute text-6xl font-mono opacity-10"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        color: "#C5F82A",
      }}
      initial={{ opacity: 0, scale: 0, rotate: -45 }}
      whileInView={{ opacity: 0.15, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, 0],
      }}
      // @ts-ignore - Framer motion type issue with multiple transitions
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {symbol}
    </motion.div>
  );
};

interface SyntaxHighlightedLineProps {
  line: string;
}

const SyntaxHighlightedLine: React.FC<SyntaxHighlightedLineProps> = ({
  line,
}) => {
  // Simple syntax highlighting
  const keywords = [
    "interface",
    "const",
    "useState",
    "useEffect",
    "return",
    "if",
  ];
  const types = ["string", "null", "UserAuth"];

  let highlighted = line;

  // Highlight keywords
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "g");
    highlighted = highlighted.replace(
      regex,
      `<span style="color: #FF79C6">${keyword}</span>`,
    );
  });

  // Highlight types
  types.forEach((type) => {
    const regex = new RegExp(`\\b${type}\\b`, "g");
    highlighted = highlighted.replace(
      regex,
      `<span style="color: #8BE9FD">${type}</span>`,
    );
  });

  // Highlight strings
  highlighted = highlighted.replace(
    /'([^']*)'/g,
    "<span style=\"color: #F1FA8C\">'$1'</span>",
  );

  // Highlight function names
  highlighted = highlighted.replace(
    /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
    '<span style="color: #50FA7B">$1</span>(',
  );

  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
};
