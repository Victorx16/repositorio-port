"use client";

import { motion } from "framer-motion";
import { Eye, LayoutTemplate } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PORTFOLIO_ITEMS } from "@/lib/constants";

export function PortfolioBento() {
  return (
    <section id="portfolio" className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Portfólio
          </span>
          <h2 className="text-balance mt-3 font-heading text-3xl font-semibold leading-[1.2] tracking-[-0.01em] text-foreground sm:text-4xl">
            Projetos reais, resultados mensuráveis
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Cada projeto é construído sob medida para o nicho do cliente, com
            performance validada em produção.
          </p>
        </div>

        <BentoGrid className="mt-14">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              className={
                item.size === "lg"
                  ? "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                  : ""
              }
            >
              <Dialog>
                <BentoCard className="h-full">
                  <BorderBeam
                    className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    size={140}
                    duration={6}
                  />
                  <div className="relative flex flex-1 flex-col justify-between p-5">
                    <div className="flex items-start justify-between">
                      <Badge
                        variant="outline"
                        className="border-border bg-background-alt text-muted-foreground"
                      >
                        {item.niche}
                      </Badge>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        LCP a confirmar
                      </span>
                    </div>

                    {/* CSS mockup placeholder */}
                    <div className="relative my-4 flex flex-1 items-center justify-center overflow-hidden rounded-lg border border-border bg-background-alt">
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-primary)_8%,transparent),transparent_60%)]" />
                      <LayoutTemplate
                        className="size-8 text-muted-foreground/30"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">
                        Case em breve
                      </p>
                      <DialogTrigger
                        render={
                          <button
                            type="button"
                            className="flex items-center gap-1.5 text-xs font-semibold text-primary transition-opacity hover:opacity-80"
                          />
                        }
                      >
                        <Eye className="size-3.5" aria-hidden="true" />
                        Preview
                      </DialogTrigger>
                    </div>
                  </div>
                </BentoCard>

                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      Case: {item.niche}
                    </DialogTitle>
                    <DialogDescription>
                      {/* TODO: substituir por screenshot, nome do cliente e métricas reais deste case */}
                      Este case está em preparação. Em breve, screenshots e
                      métricas reais de performance deste projeto estarão
                      disponíveis aqui.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex aspect-video items-center justify-center rounded-lg border border-border bg-background-alt">
                    <LayoutTemplate className="size-10 text-muted-foreground/30" />
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
