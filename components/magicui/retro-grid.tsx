import { cn } from "@/lib/utils";

export function RetroGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [perspective:200px]",
        className,
      )}
    >
      <div className="absolute inset-0 [transform:rotateX(35deg)]">
        <div
          className="animate-retro-grid absolute inset-[-100%] [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--color-primary)_40%,transparent)_1px,transparent_0),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-primary)_40%,transparent)_1px,transparent_0)] [background-repeat:repeat] [background-size:60px_60px] [height:300%] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:300%]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
    </div>
  );
}
