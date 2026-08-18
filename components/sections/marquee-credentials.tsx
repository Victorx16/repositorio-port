import { BadgeCheck, Store } from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";
import { BUSINESS_NICHES, TECH_CREDENTIALS } from "@/lib/constants";

export function MarqueeCredentials() {
  return (
    <section
      aria-hidden="true"
      className="relative border-b border-border bg-background-alt py-10"
    >
      <div className="flex flex-col gap-4">
        <Marquee pauseOnHover duration="32s" className="[--gap:2.5rem]">
          {TECH_CREDENTIALS.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-muted-foreground"
            >
              <BadgeCheck className="size-4 text-primary" aria-hidden="true" />
              {item}
            </span>
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          duration="38s"
          className="[--gap:2.5rem]"
        >
          {BUSINESS_NICHES.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 whitespace-nowrap font-mono text-sm text-slate-300/90"
            >
              <Store className="size-3.5 text-secondary" aria-hidden="true" />
              {item}
            </span>
          ))}
        </Marquee>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background-alt to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background-alt to-transparent" />
    </section>
  );
}
