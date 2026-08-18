"use client";

import { motion } from "framer-motion";
import { Building2, Check, Rocket, Settings, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaArrowBadge } from "@/components/ui/cta-arrow-badge";
import { useWhatsAppWidget } from "@/components/whatsapp-widget/context";
import { SERVICE_PLANS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICONS = [Rocket, Building2, ShoppingCart, Settings];

export function ServicesTable() {
  const { open } = useWhatsAppWidget();

  return (
    <section id="servicos" className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Serviços
          </span>
          <h2 className="text-balance mt-3 font-heading text-3xl font-semibold leading-[1.2] tracking-[-0.01em] text-foreground sm:text-4xl">
            Uma solução para cada etapa do seu negócio
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Sem letras miúdas ou pacotes engessados. Cada proposta é
            dimensionada sob medida para o momento da sua empresa.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_PLANS.map((plan, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={cn(
                  "relative flex flex-col rounded-2xl bg-surface-elevated p-6",
                  plan.highlight
                    ? "border-2 border-primary"
                    : "border border-border",
                )}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {plan.badge}
                  </span>
                )}

                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                </div>

                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-secondary"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlight ? "default" : "outline"}
                  size="lg"
                  className="relative mt-7 h-11 w-full pr-7"
                  onClick={() =>
                    open(
                      plan.ctaIntent ??
                        `solicitar um orçamento para o plano "${plan.name}"`,
                    )
                  }
                >
                  {plan.ctaLabel ?? "Solicitar orçamento"}
                  <CtaArrowBadge />
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
