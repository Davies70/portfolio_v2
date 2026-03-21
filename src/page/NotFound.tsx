import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 100;

interface NotFoundProps {
  onReturn: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onReturn }) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const gameLoopRef = useRef<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("snake_high_score");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("snake_high_score", score.toString());
    }
  }, [score, highScore]);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsGameOver(false);
    setGameStarted(true);
    generateFood();
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || !gameStarted) return;
    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };
      head.x += direction.x;
      head.y += direction.y;
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        setIsGameOver(true);
        return prevSnake;
      }
      if (
        prevSnake.some(
          (segment) => segment.x === head.x && segment.y === head.y,
        )
      ) {
        setIsGameOver(true);
        return prevSnake;
      }
      const newSnake = [head, ...prevSnake];
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 10);
        generateFood();
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }, [direction, food, isGameOver, gameStarted, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted && e.key === "Enter") {
        resetGame();
        return;
      }
      if (e.key === "Escape") onReturn();

      switch (e.key) {
        case "ArrowUp":
        case "w":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, gameStarted, onReturn]);

  useEffect(() => {
    if (gameStarted && !isGameOver) {
      gameLoopRef.current = window.setInterval(moveSnake, SPEED);
    } else if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameStarted, isGameOver, moveSnake]);

  return (
    <div className="fixed inset-0 bg-[#0B0C10] z-[10001] flex flex-col items-center justify-center p-6 font-mono overflow-hidden">
      <div className="absolute inset-0 noise opacity-20 pointer-events-none" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl w-full mb-8 text-center"
      >
        <h1 className="text-[#FF3366] text-4xl md:text-6xl font-black mb-2 tracking-tighter uppercase">
          FATAL_ERROR: 404
        </h1>
        <p className="text-[#E0E0E0] text-sm md:text-base uppercase tracking-widest opacity-60">
          Directory not found. System compromised.
        </p>
      </motion.div>

      <div
        className="relative bg-[#12141A] border-4 border-[#FF3366] p-4 flex flex-col items-center"
        style={{ boxShadow: "16px 16px 0px rgba(255, 51, 102, 0.3)" }}
      >
        <div className="w-full flex justify-between mb-4 border-b-2 border-[#FF3366]/20 pb-2 text-[10px] md:text-xs">
          <span className="text-[#E0E0E0]">SCORE: {score}</span>
          <span className="text-[#C5F82A]">HIGH_SCORE: {highScore}</span>
        </div>
        <div
          className="grid gap-0 bg-[#0B0C10] border-2 border-[#E0E0E0]/10"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: "min(70vw, 400px)",
            height: "min(70vw, 400px)",
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE,
              y = Math.floor(i / GRID_SIZE);
            const isSnake = snake.some((s) => s.x === x && s.y === y),
              isHead = snake[0].x === x && snake[0].y === y,
              isFood = food.x === x && food.y === y;
            return (
              <div key={i} className="flex items-center justify-center">
                {isHead ? (
                  <div className="w-full h-full bg-[#C5F82A] animate-pulse" />
                ) : isSnake ? (
                  <div className="w-[80%] h-[80%] bg-[#C5F82A]/60" />
                ) : isFood ? (
                  <div className="w-[60%] h-[60%] bg-[#FF3366] rotate-45" />
                ) : null}
              </div>
            );
          })}
        </div>
        {!gameStarted && (
          <div className="absolute inset-0 bg-[#0B0C10]/95 flex flex-col items-center justify-center p-6 text-center z-20">
            <p className="text-[#C5F82A] text-lg mb-4 animate-pulse uppercase font-black">
              [ SNAKE_ENGINE_READY ]
            </p>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-[#C5F82A] text-[#0B0C10] font-bold uppercase text-xs"
            >
              Initialize (Enter)
            </button>
          </div>
        )}
        {isGameOver && (
          <div className="absolute inset-0 bg-[#FF3366]/95 flex flex-col items-center justify-center p-6 text-center z-20">
            <p className="text-white text-2xl mb-2 font-black uppercase">
              SYSTEM_CRASH
            </p>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-[#0B0C10] text-white font-bold uppercase text-xs"
            >
              Reboot
            </button>
          </div>
        )}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <button
          onClick={onReturn}
          className="text-[#C5F82A] border-b-2 border-[#C5F82A] pb-1 font-bold text-sm uppercase hover:text-white hover:border-white transition-all"
        >
          Return_to_Main_Frame
        </button>
      </div>
    </div>
  );
};
