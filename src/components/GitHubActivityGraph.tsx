import React from "react";
import { motion } from "motion/react";

// Generate mock contribution data
const generateContributions = () => {
  const weeks = 52;
  const daysPerWeek = 7;
  const contributions: number[][] = [];

  for (let week = 0; week < weeks; week++) {
    const weekData: number[] = [];
    for (let day = 0; day < daysPerWeek; day++) {
      // Random contribution level 0-4 with higher probability of activity
      const level = Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0;
      weekData.push(level);
    }
    contributions.push(weekData);
  }

  return contributions;
};

const contributions = generateContributions();

export const GitHubActivityGraph: React.FC = () => {
  const getColorForLevel = (level: number) => {
    const colors = [
      "#0B0C10", // No activity
      "#2D3A2E", // Low
      "#4A6B3F", // Medium-low
      "#7FA056", // Medium-high
      "#C5F82A", // High activity
    ];
    return colors[level];
  };

  return (
    <div className="relative py-12 md:py-32">
      {/* Background subtle texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(197, 248, 42, 0.1) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container mx-auto px-6 md:px-20 relative z-10">
        <div className="flex flex-col items-center gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="font-clash text-white text-xl md:text-2xl mb-1 md:mb-2 tracking-tight">
              Coding Activity
            </h3>
            <p className="text-[#E0E0E0]/60 text-xs md:text-sm">
              1,247 contributions in the last year
            </p>
          </motion.div>

          {/* Horizontally Scrollable Wrapper for Mobile */}
          <div className="w-full overflow-x-auto custom-scrollbar pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 flex md:justify-center">
            {/* Contribution Graph - added w-max so it doesn't crush */}
            <motion.div
              className="flex gap-1 p-4 md:p-8 glass rounded-xl md:rounded-2xl w-max"
              style={{
                border: "1px solid rgba(197, 248, 42, 0.2)",
                boxShadow: "0 0 40px rgba(197, 248, 42, 0.1)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {contributions.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.map((level, dayIdx) => (
                    <ContributionSquare
                      key={`${weekIdx}-${dayIdx}`}
                      level={level}
                      color={getColorForLevel(level)}
                      delay={weekIdx * 0.005 + dayIdx * 0.001}
                      weekIdx={weekIdx}
                      dayIdx={dayIdx}
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-2 text-[10px] md:text-xs text-[#E0E0E0]/60"
          >
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="w-2 h-2 md:w-3 md:h-3 rounded-[1px] md:rounded-sm"
                style={{ backgroundColor: getColorForLevel(level) }}
              />
            ))}
            <span>More</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface ContributionSquareProps {
  level: number;
  color: string;
  delay: number;
  weekIdx: number;
  dayIdx: number;
}

const ContributionSquare: React.FC<ContributionSquareProps> = ({
  level,
  color,
  delay,
  weekIdx,
  dayIdx,
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const getTooltipText = () => {
    const commits = level === 0 ? 0 : Math.floor(Math.random() * 8) + 1;
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return {
      day: days[dayIdx],
      commits,
      project: level > 2 ? "Deployed feature" : "Bug fixes",
    };
  };

  const tooltip = getTooltipText();

  return (
    <motion.div
      // Responsive sizing: w-2 h-2 on mobile, w-3 h-3 on larger screens
      className="relative w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-[1px] md:rounded-sm cursor-pointer"
      style={{ backgroundColor: color }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, delay }}
      whileHover={{
        scale: 1.5,
        boxShadow: level > 0 ? `0 0 10px ${color}` : "none",
        zIndex: 10,
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      // Added touch events so mobile users can tap to see the tooltip!
      onTouchStart={() => setShowTooltip(true)}
      onTouchEnd={() => setTimeout(() => setShowTooltip(false), 1500)}
    >
      {showTooltip && level > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap z-[100]"
        >
          <div
            className="glass px-2 md:px-3 py-1.5 md:py-2 rounded-md md:rounded-lg text-[10px] md:text-xs"
            style={{
              border: "1px solid rgba(197, 248, 42, 0.3)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="text-[#C5F82A]">{tooltip.commits} commits</div>
            <div className="text-[#E0E0E0] text-[8px] md:text-[10px]">
              {tooltip.project}
            </div>
          </div>
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-1.5 h-1.5 md:w-2 md:h-2 rotate-45"
            style={{ backgroundColor: "#1A1D23" }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};
