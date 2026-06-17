import React from "react";
import { motion } from "motion/react";

const seededLevel = (week: number, day: number) => {
  const seed = Math.sin((week + 1) * 12.9898 + (day + 1) * 78.233) * 43758.5453;
  const value = seed - Math.floor(seed);

  if (value < 0.3) return 0;
  if (value < 0.52) return 1;
  if (value < 0.72) return 2;
  if (value < 0.9) return 3;
  return 4;
};

// Generate mock contribution data
const generateContributions = () => {
  const weeks = 52;
  const daysPerWeek = 7;
  const contributions: number[][] = [];

  for (let week = 0; week < weeks; week++) {
    const weekData: number[] = [];
    for (let day = 0; day < daysPerWeek; day++) {
      weekData.push(seededLevel(week, day));
    }
    contributions.push(weekData);
  }

  return contributions;
};

const contributions = generateContributions();
const totalContributions = contributions.flat().reduce((sum, level) => {
  if (level === 0) return sum;
  return sum + level * 2 + 1;
}, 0);

export const GitHubActivityGraph: React.FC = () => {
  const getColorForLevel = (level: number) => {
    const colors = [
      "#0B0C10", // No activity (Background color)
      "#2D3A2E", // Low
      "#4A6B3F", // Medium-low
      "#7FA056", // Medium-high
      "#C5F82A", // High activity (Neon)
    ];
    return colors[level];
  };

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-portfolio-bg overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 noise opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Neo-Brutalist Section Header */}
        <div className="mb-10 md:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-portfolio-accent font-mono font-bold text-sm">
              {"// 06"}
            </span>
            <h2 className="text-portfolio-fg font-mono tracking-widest uppercase text-sm font-bold">
              SYS.ACTIVITY
            </h2>
            <div className="h-[2px] flex-1 bg-portfolio-fg/10" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-clash text-white tracking-tighter uppercase break-words"
              style={{ fontSize: "clamp(1.75rem, 6vw, 5rem)", lineHeight: 1 }}
            >
              CODING_METRICS
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-portfolio-fg/60 font-mono text-xs md:text-sm uppercase tracking-widest pb-2"
            >
              {totalContributions.toLocaleString()} SIGNALS // PAST 365 DAYS
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-start gap-8">
          {/* Horizontally Scrollable Wrapper for Mobile */}
          <div className="w-full overflow-x-auto custom-scrollbar pb-6 -mx-6 px-6 md:mx-0 md:px-0">
            {/* Heavy Brutalist Container */}
            <motion.div
              className="flex flex-col gap-4 p-6 md:p-8 bg-portfolio-surface border-2 border-portfolio-fg/20 w-max"
              style={{ boxShadow: "12px 12px 0px rgba(0,0,0,1)" }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex gap-1.5 md:gap-2">
                {contributions.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-1.5 md:gap-2">
                    {week.map((level, dayIdx) => (
                      <ContributionSquare
                        key={`${weekIdx}-${dayIdx}`}
                        level={level}
                        color={getColorForLevel(level)}
                        delay={weekIdx * 0.005 + dayIdx * 0.001}
                        dayIdx={dayIdx}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Terminal Style Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3 px-4 py-2 border-2 border-portfolio-fg/20 bg-portfolio-surface w-fit"
            style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
          >
            <span className="font-mono text-[10px] md:text-xs text-portfolio-fg/60 uppercase tracking-widest">
              MIN
            </span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="w-3 h-3 md:w-4 md:h-4 border border-white/5"
                  style={{ backgroundColor: getColorForLevel(level) }}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] md:text-xs text-portfolio-fg/60 uppercase tracking-widest">
              MAX
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface ContributionSquareProps {
  level: number;
  color: string;
  delay: number;
  dayIdx: number;
}

const ContributionSquare: React.FC<ContributionSquareProps> = ({
  level,
  color,
  delay,
  dayIdx,
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const tooltip = React.useMemo(() => {
    const commits = level === 0 ? 0 : level * 2 + ((dayIdx + level) % 3);
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return {
      day: days[dayIdx],
      commits,
      status: level > 2 ? "CRITICAL_UPDATE" : "MINOR_PATCH",
    };
  }, [level, dayIdx]);

  return (
    <motion.div
      // Brutalist strict squares, no border radius
      className="relative w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 cursor-crosshair border border-white/5"
      style={{ backgroundColor: color }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, delay }}
      whileHover={{
        scale: 1.4,
        borderColor: level > 0 ? "#C5F82A" : "transparent",
        zIndex: 10,
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onTouchStart={() => setShowTooltip(true)}
      onTouchEnd={() => setTimeout(() => setShowTooltip(false), 1500)}
    >
      {showTooltip && level > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap z-[100]"
        >
          {/* Brutalist Command-Line Tooltip */}
          <div
            className="bg-portfolio-bg border-2 border-portfolio-accent px-3 py-2 flex flex-col"
            style={{ boxShadow: "4px 4px 0px rgba(197, 248, 42, 0.4)" }}
          >
            <div className="text-portfolio-accent font-mono text-[10px] md:text-xs font-bold uppercase">
              {tooltip.commits} COMMITS // {tooltip.day}
            </div>
            <div className="text-portfolio-fg/70 font-mono text-[8px] md:text-[10px] uppercase mt-1">
              [{tooltip.status}]
            </div>
          </div>
          {/* Sharp Triangle Pointer */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] w-2 h-2 border-r-2 border-b-2 border-portfolio-accent rotate-45 bg-portfolio-bg" />
        </motion.div>
      )}
    </motion.div>
  );
};
