import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 8,
  delay = 0,
  colorFrom = "var(--color-primary)",
  colorTo = "var(--color-secondary)",
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
      )}
    >
      <div
        className={cn(
          "absolute aspect-square animate-border-beam [offset-anchor:90%_50%] [offset-path:rect(0_auto_auto_0_round_var(--radius))]",
          className,
        )}
        style={
          {
            width: size,
            "--duration": duration,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            animationDelay: `-${delay}s`,
            background: `linear-gradient(to left, var(--color-from), var(--color-to), transparent)`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
