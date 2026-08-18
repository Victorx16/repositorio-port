"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles, Wifi, Zap } from "lucide-react";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { BorderBeam } from "@/components/magicui/border-beam";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import { CtaArrowBadge } from "@/components/ui/cta-arrow-badge";
import { HERO_METRICS, whatsappLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      <AnimatedGridPattern
        numSquares={24}
        maxOpacity={0.25}
        duration={5}
        className="[mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_10%,transparent_75%)]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_50%_50%_at_50%_-10%,color-mix(in_srgb,var(--color-primary)_18%,transparent),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-[0_0_16px_-3px_color-mix(in_srgb,var(--color-primary)_45%,transparent)]"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
            Especialistas em SEO Local — SP e ABC Paulista
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-balance max-w-3xl font-heading text-4xl font-semibold leading-[1.2] tracking-[-0.01em] text-foreground sm:text-5xl lg:text-6xl"
          >
            Enquanto seu concorrente aparece no Google,{" "}
            <span className="text-primary">
              seu negócio pode estar invisível.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
          >
            Construímos sites de alta performance (carregamento abaixo de 1
            segundo) para negócios de São Paulo e ABC Paulista serem
            encontrados e escolhidos antes da concorrência.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <ShimmerButton
              href={whatsappLink(
                "Olá, quero solicitar um orçamento para o meu negócio",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 animate-pulse-glow px-7 text-sm"
            >
              <MessageCircle
                className="mr-2 size-4 transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              Quero aparecer no Google
            </ShimmerButton>
            <Button
              variant="outline"
              size="lg"
              className="relative h-11 pr-7"
              nativeButton={false}
              render={<a href="#portfolio" />}
            >
              Ver portfólio
              <ArrowRight className="ml-1.5 size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" aria-hidden="true" />
              <CtaArrowBadge />
            </Button>
          </motion.div>
        </div>

        {/* Interactive mockup */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative mx-auto mt-20 max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_40px_80px_-20px_rgba(0,0,0,0.6)]">
            <BorderBeam size={260} duration={10} />
            {/* browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-border bg-background-alt px-4 py-3">
              <span className="size-2.5 rounded-full bg-destructive/50" />
              <span className="size-2.5 rounded-full bg-primary/40" />
              <span className="size-2.5 rounded-full bg-secondary/50" />
              <div className="ml-3 flex-1 rounded-md bg-surface-elevated px-3 py-1 text-left font-mono text-[11px] text-muted-foreground">
                codevx.com.br
              </div>
            </div>
            <div className="grid gap-px bg-border sm:grid-cols-3">
              {HERO_METRICS.map((metric, i) => (
                <div
                  key={metric.label}
                  className="flex flex-col items-center gap-1 bg-surface px-6 py-8"
                >
                  <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {i === 0 && <Zap className="size-3.5 text-primary" />}
                    {i === 1 && <Wifi className="size-3.5 text-secondary" />}
                    {i === 2 && (
                      <Sparkles className="size-3.5 text-primary" />
                    )}
                    {metric.label}
                  </div>
                  <div
                    className={cn(
                      "font-mono text-3xl font-semibold sm:text-4xl",
                      i === 1 ? "text-secondary" : "text-primary",
                    )}
                  >
                    <NumberTicker
                      value={metric.value}
                      decimalPlaces={metric.value < 10 ? 2 : 1}
                      suffix={metric.suffix}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ({metric.technical})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
