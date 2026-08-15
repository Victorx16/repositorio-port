"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SERVICE_PLANS, whatsappLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ServicesTable() {
  return (
    <section id="servicos" className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Serviços
          </span>
          <h2 className="text-balance mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Uma solução para cada etapa do seu negócio
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Sem letras miúdas, sem pacotes engessados. Cada proposta é
            dimensionada para o seu momento — fale com a gente para o valor
            exato.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6",
                plan.highlight
                  ? "border-primary/40 bg-surface-elevated lg:-translate-y-3"
                  : "border-border bg-surface",
              )}
            >
              {plan.highlight && (
                <BorderBeam size={120} duration={7} />
              )}
              {plan.badge && (
                <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground">
                  {plan.badge}
                </Badge>
              )}

              <h3 className="font-heading text-lg font-semibold text-foreground">
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
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        plan.highlight ? "text-primary" : "text-secondary",
                      )}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlight ? "default" : "outline"}
                className="mt-7 w-full"
                nativeButton={false}
                render={
                  <a
                    href={whatsappLink(
                      `Olá! Tenho interesse no plano "${plan.name}" da Code VX.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <MessageCircle className="mr-1.5 size-4" aria-hidden="true" />
                Solicitar proposta
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
