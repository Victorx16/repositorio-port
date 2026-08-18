"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";

export function Process() {
  return (
    <section id="processo" className="border-b border-border bg-background-alt py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Processo Transparente
          </span>
          <h2 className="text-balance mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Do diagnóstico ao resultado, sem mistério
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Quatro etapas claras para você acompanhar cada fase do seu
            projeto com segurança total.
          </p>
        </div>

        <div className="relative mt-20 flex flex-col gap-10 sm:mt-24 sm:grid sm:grid-cols-4 sm:gap-4">
          {/* Connecting line — desktop only (horizontal, spans badge centers) */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px origin-left bg-gradient-to-r from-primary/50 via-primary/80 to-primary/50 shadow-[0_0_12px_color-mix(in_srgb,var(--color-primary)_55%,transparent)] sm:block"
          />

          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="relative flex flex-row items-start gap-4 sm:flex-col sm:items-center sm:gap-4 sm:text-center"
            >
              {/* Connecting segment — mobile only (vertical, badge center to next badge center) */}
              {i < PROCESS_STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-6 top-6 -bottom-10 w-px bg-gradient-to-b from-primary/60 to-primary/20 shadow-[0_0_8px_color-mix(in_srgb,var(--color-primary)_45%,transparent)] sm:hidden"
                />
              )}

              <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-surface font-mono text-sm font-bold text-primary shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_35%,transparent)]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="pt-1.5 sm:pt-0">
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:mx-auto sm:max-w-[22ch]">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
