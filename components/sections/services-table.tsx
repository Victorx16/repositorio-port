"use client";

import { Action } from "@/components/ui/action";
import { Reveal } from "@/components/ui/reveal";
import { SpecLabel } from "@/components/ui/spec-label";
import { useWhatsAppWidget } from "@/components/whatsapp-widget/context";
import { SERVICE_PLANS } from "@/lib/constants";

/**
 * Serviços — agora uma tabela de verdade.
 *
 * O arquivo já se chamava services-table, mas renderizava quatro cards
 * idênticos lado a lado, cada um com um ícone decorativo, uma lista de tiques
 * verdes e um botão. Card é o formato de quando os itens são alternativas
 * equivalentes; aqui eles não são — diferem em prazo, em escopo e em para quem
 * servem, e é isso que o visitante precisa comparar.
 *
 * Em tabela, a comparação acontece na vertical e de graça: dá para correr o
 * olho só pela coluna de prazo. Em quatro cards, era preciso ler os quatro.
 *
 * Os ícones saíram porque foguete, prédio e carrinho não dizem nada que o nome
 * do serviço já não diga — ocupavam a posição de maior destaque de cada card
 * para repetir a informação logo abaixo deles.
 */
export function ServicesTable() {
  const { open } = useWhatsAppWidget();

  return (
    <section id="servicos" className="border-rule bg-ink-2 border-b">
      <div className="shell band">
        <Reveal>
          <SpecLabel index="05">Serviços</SpecLabel>
          <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2
              data-reveal-line=""
              className="text-headline max-w-[18ch] overflow-hidden pb-[0.08em]"
            >
              <span className="block text-balance">
                Quatro escopos. O preço fecha antes de começar.
              </span>
            </h2>
            <p className="text-mute max-w-md leading-relaxed text-pretty">
              O valor depende do tamanho do projeto, e sai por escrito na
              proposta. Nenhum destes escopos tem mensalidade obrigatória.
            </p>
          </div>
        </Reveal>

        {/* Cabeçalho da tabela: só a partir de lg, onde as colunas existem.
            Abaixo disso cada serviço vira um bloco empilhado e um cabeçalho
            solto no topo não teria a que se referir. */}
        <div className="text-faint border-rule mt-14 hidden border-b pb-3 font-mono text-[0.5625rem] tracking-[0.2em] uppercase lg:grid lg:grid-cols-12 lg:gap-8">
          <span className="lg:col-span-3">Serviço e prazo</span>
          <span className="lg:col-span-6">Para quem é, e o que entra</span>
          <span className="lg:col-span-3">Próximo passo</span>
        </div>

        <div>
          {SERVICE_PLANS.map((plan, i) => (
            <Reveal
              key={plan.id}
              index={i}
              // `-mx-4 px-4` sangra o fundo e a marca da borda para fora do
              // texto, para o realce envolver a linha em vez de encostar nela.
              className="row-spec border-rule -mx-4 grid gap-6 border-b px-4 py-9 lg:grid-cols-12 lg:gap-8"
            >
              <div className="lg:col-span-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                  <h3 className="font-display text-title text-paper">
                    {plan.name}
                  </h3>
                  {plan.highlight && (
                    <span className="text-signal border-signal/40 border px-2 py-0.5 font-mono text-[0.5625rem] tracking-[0.16em] uppercase">
                      Mais procurado
                    </span>
                  )}
                </div>
                <p className="text-mute mt-3 font-mono text-sm">
                  {plan.timeline}
                </p>
              </div>

              <div className="lg:col-span-6">
                <p className="text-mute leading-relaxed text-pretty">
                  {plan.audience}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {plan.scope.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="bg-signal mt-2.5 h-px w-3 shrink-0"
                      />
                      <span className="text-mute text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-3">
                <Action
                  variant={plan.highlight ? "primary" : "ghost"}
                  onClick={() =>
                    open(
                      plan.ctaIntent ??
                        `um orçamento de ${plan.name.toLowerCase()}`,
                    )
                  }
                  className="w-full lg:w-auto"
                  arrow
                >
                  {plan.ctaLabel ?? "Pedir orçamento"}
                </Action>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
