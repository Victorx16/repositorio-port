"use client";

import { AlertTriangle, Search, Star, TrendingDown, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SearchSimulator() {
  return (
    <section className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            O Problema
          </span>
          <h2 className="text-balance mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Enquanto você não aparece, seu concorrente fatura
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Simulamos uma busca real no Google. Veja a diferença entre estar
            no topo dos resultados e estar invisível na segunda página.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-surface p-2 sm:p-6">
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-background-alt px-4 py-2.5">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate font-mono text-sm text-foreground">
              mecânica perto de mim são bernardo do campo
            </span>
          </div>

          <Tabs defaultValue="sem">
            <TabsList variant="line" className="mb-6 w-full">
              <TabsTrigger value="sem" className="flex-1">
                Sem Code VX
              </TabsTrigger>
              <TabsTrigger value="com" className="flex-1">
                Com Code VX
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sem" className="space-y-3">
              <div className="flex items-start gap-4 rounded-xl border border-secondary/30 bg-secondary/[0.06] p-4">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary/15 font-mono text-xs font-bold text-secondary">
                  1
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-xs text-muted-foreground">
                    concorrente-visivel.com.br
                  </p>
                  <p className="font-heading text-base font-semibold text-foreground">
                    Auto Mecânica Concorrente com Agendamento Online
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-secondary">
                    <Star className="size-3.5 fill-secondary" />
                    <Star className="size-3.5 fill-secondary" />
                    <Star className="size-3.5 fill-secondary" />
                    <Star className="size-3.5 fill-secondary" />
                    <Star className="size-3.5 fill-secondary" />
                    <span className="text-muted-foreground">
                      · otimizado para o Google
                    </span>
                  </div>
                </div>
                <TrendingUp className="size-4 shrink-0 text-secondary" />
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-destructive/20 bg-destructive/[0.04] p-4 grayscale">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-destructive/10 font-mono text-xs font-bold text-destructive">
                  17
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-xs text-muted-foreground">
                    seu-negocio.com.br
                  </p>
                  <p className="font-heading text-base font-semibold text-foreground">
                    Sua Empresa sem otimização para o Google
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Página 2 dos resultados · praticamente invisível
                  </p>
                </div>
                <TrendingDown className="size-4 shrink-0 text-destructive" />
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-destructive/[0.06] px-4 py-3 text-sm text-destructive">
                <AlertTriangle className="size-4 shrink-0" />
                Mais de 90% dos cliques ficam na primeira página. Você está
                perdendo clientes todos os dias.
              </div>
            </TabsContent>

            <TabsContent value="com" className="space-y-3">
              <div className="flex items-start gap-4 rounded-xl border border-primary/40 bg-primary/[0.06] p-4 ring-1 ring-primary/20">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-xs font-bold text-primary">
                  1
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-xs text-primary/80">
                    seu-negocio.com.br
                  </p>
                  <p className="font-heading text-base font-semibold text-foreground">
                    Sua Empresa construída pela Code VX
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-primary">
                    <Star className="size-3.5 fill-primary" />
                    <Star className="size-3.5 fill-primary" />
                    <Star className="size-3.5 fill-primary" />
                    <Star className="size-3.5 fill-primary" />
                    <Star className="size-3.5 fill-primary" />
                    <span className="text-muted-foreground">
                      · LCP 0.4s · SEO técnico completo
                    </span>
                  </div>
                </div>
                <TrendingUp className="size-4 shrink-0 text-primary" />
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-border bg-background-alt p-4 opacity-70">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs font-bold text-muted-foreground">
                  2
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-xs text-muted-foreground">
                    concorrente-visivel.com.br
                  </p>
                  <p className="font-heading text-base font-semibold text-foreground">
                    Auto Mecânica Concorrente
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-secondary/10 px-4 py-3 text-sm text-secondary">
                <TrendingUp className="size-4 shrink-0" />
                Agora o seu negócio aparece primeiro e recebe os contatos
                diretos no WhatsApp.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
