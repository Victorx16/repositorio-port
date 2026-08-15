import React from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler;
  type?: "button" | "submit" | "reset";
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.1em",
      shimmerDuration = "2.5s",
      borderRadius = "100px",
      background = "var(--color-primary)",
      className,
      children,
      href,
      ...props
    },
    ref,
  ) => {
    const Comp = href ? "a" : "button";
    return (
      <Comp
        href={href}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as React.CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-transparent px-6 py-2.5 text-sm font-semibold text-[var(--color-primary-foreground)] [background:var(--bg)] [border-radius:var(--radius)]",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
          className,
        )}
        {...props}
      >
        {/* shimmer sweep */}
        <div className="-z-30 absolute inset-0 overflow-visible [container-type:size]">
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div className="absolute -inset-full w-auto rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>
        {children}
        {/* highlight */}
        <div className="pointer-events-none absolute inset-0 size-full rounded-[var(--radius)] shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]" />
        {/* backdrop */}
        <div className="absolute [inset:var(--cut)] -z-20 [background:var(--bg)] [border-radius:calc(var(--radius)-var(--cut))]" />
      </Comp>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";
