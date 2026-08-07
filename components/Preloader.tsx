"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1600; // 1.6 seconds loading time
    const intervalTime = 16; // ~60fps
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 200); // Quick pause at 100%
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Key details about your work focus to cycle through
  const words = ["DESIGN", "DEVELOP", "INTELLIGENCE", "INNOVATION", "AI"];
  const wordIndex = Math.min(
    Math.floor((count / 100) * words.length),
    words.length - 1
  );

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{
        y: "-100%",
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 bg-[#0a0a0a] z-[9999] flex flex-col justify-between p-8 md:p-16 text-white font-mono"
    >
      {/* Top Details */}
      <div className="flex justify-between items-start text-xs uppercase tracking-widest text-neutral-500">
        <span>MD Shariful Islam</span>
        <span>© {new Date().getFullYear()}</span>
      </div>

      {/* Middle Words */}
      <div className="flex flex-col justify-center items-center h-full">
        <motion.h1
          key={wordIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="font-display text-4xl md:text-7xl font-bold tracking-tighter text-white"
        >
          {words[wordIndex]}
        </motion.h1>
      </div>

      {/* Bottom Counter */}
      <div className="flex justify-between items-end">
        <span className="text-xs uppercase tracking-widest text-neutral-500">
          LOADING PORTFOLIO
        </span>
        <div className="font-display text-7xl md:text-9xl font-bold tracking-tighter leading-none select-none text-white">
          {Math.floor(count)}%
        </div>
      </div>
    </motion.div>
  );
}
