import { ArrowUpRight } from "lucide-react";

/**
 * Static visual signature for secondary/tertiary CTA buttons. Place inside a
 * `relative` button as its last child — it overlays the button's right edge.
 * Deliberately has no animation: the pulsing glow is reserved for the single
 * primary CTA in the Hero.
 */
export function CtaArrowBadge() {
  return (
    <span
      aria-hidden="true"
      className="absolute -right-2 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background"
    >
      <ArrowUpRight className="size-3" />
    </span>
  );
}
