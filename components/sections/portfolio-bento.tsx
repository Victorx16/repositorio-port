"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Badge } from "@/components/ui/badge";
import { CasePreview } from "@/components/ui/case-preview";
import { CASE_STUDIES } from "@/lib/constants";

/**
 * Portfólio.
 *
 * Antes eram seis caixas com nichos fictícios e "Case em breve" em todas.
 * Seis vazios não somam: eles contaminam o que é real, porque o visitante não
 * tem como distinguir o projeto entregue dos placeholders. Um case verdadeiro,
 * com decisões e link para o site no ar, prova mais do que a ilusão de volume.
 *
 * Quando houver o segundo, a grade volta — mas com dois cases reais.
 */
export function PortfolioBento() {
  return (
    <section id="portfolio" className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Portfólio
          </span>
          <h2 className="text-balance mt-3 font-heading text-3xl font-semibold leading-[1.2] tracking-[-0.01em] text-foreground sm:text-4xl">
            Projetos reais, decisões explicadas
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Cada projeto é construído sob medida para o nicho do cliente. Abaixo,
            o que foi decidido e por quê.
          </p>
        </div>

        <div className="mt-14 space-y-6">
          {CASE_STUDIES.map((caso, i) => (
            <motion.article
              key={caso.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-border-strong"
            >
              <BorderBeam
                className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                size={180}
                duration={7}
              />

              <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
                {/* Prévia do site */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border lg:aspect-auto lg:min-h-[22rem] lg:border-b-0 lg:border-r">
                  <CasePreview
                    src={caso.image}
                    alt={caso.imageAlt}
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge
                        variant="outline"
                        className="border-border bg-background-alt text-muted-foreground"
                      >
                        {caso.niche}
                      </Badge>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {caso.year}
                      </span>
                    </div>

                    <h3 className="mt-4 font-heading text-2xl font-semibold tracking-[-0.01em] text-foreground">
                      {caso.client}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {caso.tagline}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {caso.stack.map((t) => (
                        <li
                          key={t}
                          className="rounded-md border border-border bg-background-alt px-2 py-1 font-mono text-[11px] text-muted-foreground"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      href={`/cases/${caso.slug}`}
                      className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
                    >
                      Ver o case completo
                      <ArrowRight
                        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>

                    {caso.liveUrl && (
                      <a
                        href={caso.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                        Visitar o site
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
