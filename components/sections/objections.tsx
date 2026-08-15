"use client";

import { motion } from "framer-motion";
import { FileCheck2, HandCoins, HeartHandshake } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { OBJECTIONS } from "@/lib/constants";

const ICONS = [HeartHandshake, FileCheck2, HandCoins];

export function Objections() {
  return (
    <section className="border-b border-border bg-background-alt py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Vamos ser diretos
          </span>
          <h2 className="text-balance mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Suas preocupações são justas
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Já ouvimos essas três de quase todo cliente novo. Aqui está
            nossa resposta honesta para cada uma.
          </p>
        </div>

        <BentoGrid className="mt-14 sm:grid-cols-3">
          {OBJECTIONS.map((objection, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={objection.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <BentoCard className="h-full bg-surface">
                  <div className="flex h-full flex-col p-6">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-5 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-heading text-base font-semibold text-foreground">
                      {objection.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {objection.body}
                    </p>
                  </div>
                </BentoCard>
              </motion.div>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
