"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  /** Length of the traveling light segment, in px (approximate — measured against the card's actual perimeter). */
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
}

/**
 * A single continuous stroke traced around the card's real outline (one <rect>,
 * corners included) and animated purely via stroke-dasharray/stroke-dashoffset.
 * Unlike a CSS offset-path/motion-path beam, dash-offset travels the SVG path's
 * actual arc length, so speed stays constant through the rounded corners —
 * no stutter or hitch where the straight edges meet the curves.
 */
export function BorderBeam({
  className,
  size = 140,
  duration = 8,
  delay = 0,
  colorFrom = "var(--color-primary)",
  colorTo = "var(--color-secondary)",
  borderWidth = 1.5,
}: BorderBeamProps) {
  const gradientId = useId();
  const rectRef = useRef<SVGRectElement>(null);
  const [dashPercent, setDashPercent] = useState(20);

  useEffect(() => {
    const el = rectRef.current;
    if (!el) return;

    const updateDash = () => {
      const perimeter = el.getTotalLength();
      if (perimeter > 0) {
        setDashPercent(Math.min(60, Math.max(4, (size / perimeter) * 100)));
      }
    };

    updateDash();
    const observer = new ResizeObserver(updateDash);
    observer.observe(el);
    return () => observer.disconnect();
  }, [size]);

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full overflow-visible",
        className,
      )}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorFrom} />
          <stop offset="55%" stopColor={colorTo} />
          <stop offset="100%" stopColor={colorTo} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect
        ref={rectRef}
        x={borderWidth / 2}
        y={borderWidth / 2}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={borderWidth}
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={`${dashPercent} ${100 - dashPercent}`}
        className="animate-border-beam"
        style={
          {
            width: `calc(100% - ${borderWidth}px)`,
            height: `calc(100% - ${borderWidth}px)`,
            rx: "var(--radius-2xl)",
            "--duration": `${duration}s`,
            animationDelay: `-${delay}s`,
          } as React.CSSProperties
        }
      />
    </svg>
  );
}
