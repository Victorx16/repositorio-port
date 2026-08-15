"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
}

function getPos(cols: number, rows: number) {
  return [
    Math.floor(Math.random() * cols),
    Math.floor(Math.random() * rows),
  ];
}

export function AnimatedGridPattern({
  width = 44,
  height = 44,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 30,
  className,
  maxOpacity = 0.4,
  duration = 4,
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const [squares, setSquares] = useState<
    { id: number; pos: number[] }[]
  >([]);

  function generateSquares(count: number) {
    const { width: w, height: h } = dimensionsRef.current;
    const cols = Math.max(1, Math.floor(w / width));
    const rows = Math.max(1, Math.floor(h / height));
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(cols, rows),
    }));
  }

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const resize = () => {
      const rect = el.getBoundingClientRect();
      dimensionsRef.current = { width: rect.width, height: rect.height };
      if (rect.width && rect.height) {
        setSquares(generateSquares(numSquares));
      }
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numSquares]);

  function updateSquarePosition(id: number) {
    const { width: w, height: h } = dimensionsRef.current;
    const cols = Math.max(1, Math.floor(w / width));
    const rows = Math.max(1, Math.floor(h / height));
    setSquares((prev) =>
      prev.map((sq) =>
        sq.id === id ? { ...sq, pos: getPos(cols, rows) } : sq,
      ),
    );
  }

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-primary/10 stroke-primary/10",
        className,
      )}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [px, py], id: sqId }, index) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.1,
            }}
            onAnimationComplete={() => updateSquarePosition(sqId)}
            key={`${px}-${py}-${sqId}`}
            width={width - 1}
            height={height - 1}
            x={px * width + 1}
            y={py * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
}
