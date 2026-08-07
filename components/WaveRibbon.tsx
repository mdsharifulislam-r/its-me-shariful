"use client";

import { useEffect, useRef } from "react";

export default function WaveRibbon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent?.clientWidth || window.innerWidth;
      canvas.height = parent?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw Ribbon A (faster, lower frequency, higher amplitude)
      drawRibbon(ctx, width, centerY, 1.6, 90, time * 0.015, 14, 0.035);

      // Draw Ribbon B (slower, higher frequency, lower amplitude)
      drawRibbon(ctx, width, centerY, 2.4, 60, -time * 0.012, 11, -0.045);

      time += 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    const drawRibbon = (
      c: CanvasRenderingContext2D,
      w: number,
      cy: number,
      freq: number,
      amp: number,
      phaseOffset: number,
      linesCount: number,
      lineSpacing: number
    ) => {
      for (let i = 0; i < linesCount; i++) {
        c.beginPath();
        for (let x = 0; x <= w; x += 10) {
          const normX = x / w;
          // Apply sinusoidal fade-out on both ends to prevent clipping
          const fade = Math.sin(normX * Math.PI);
          
          // Primary wave equation
          const angle = normX * Math.PI * freq + phaseOffset + i * lineSpacing;
          const y = cy + Math.sin(angle) * amp * fade;

          if (x === 0) c.moveTo(x, y);
          else c.lineTo(x, y);
        }
        // Faint black lines for the light background
        c.strokeStyle = `rgba(0, 0, 0, ${0.22 - (i * 0.012)})`;
        c.lineWidth = 1.0;
        c.stroke();
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
}
