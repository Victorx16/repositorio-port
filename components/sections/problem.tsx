"use client";

import { Reveal } from "@/components/ui/reveal";
import { SpecLabel } from "@/components/ui/spec-label";
import { usePageSpeed } from "@/components/ui/page-speed";

/**
 * O problema, em duas perdas.
 *
 * O que havia aqui era um simulador de busca do Google com abas: "Sem Code VX"
 * mostrava o negócio do visitante em 17º, "Com Code VX" mostrava em 1º com
 * cinco estrelas. Era um resultado inventado dos dois lados — e o lado bom era
 * exatamente o tipo de promessa que ninguém pode fazer sobre ranqueamento.
 *
 * No lugar, uma afirmação com fonte e um diagrama que não inventa nada: a
 * régua de três segundos, com a medição real desta página marcada em cima.
 * O visitante vê onde este site caiu na régua e tira a própria conclusão.
 *
 * Nota: este é o segundo `usePageSpeed` da página. São dois PerformanceObserver
 * com `buffered: true`, ambos lendo as mesmas entradas já registradas —
 * custo desprezível, e evita transformar a página inteira em client component
 * só para compartilhar um número.
 */

/** Fim da régua, em segundos. É o limiar citado no estudo. */
const REGUA = 3;

export function Problem() {
  const leitura = usePageSpeed();

  // A marca fica presa entre 3% e 96% para não sair do desenho. Passando dos
  // três segundos ela encosta no fim da régua — e o rótulo diz que passou,
  // em vez de fingir que coube.
  const posicao = leitura
    ? Math.min(96, Math.max(3, (leitura.segundos / REGUA) * 100))
    : null;
  const estourou = leitura ? leitura.segundos > REGUA : false;

  return (
    <section className="border-rule border-b">
      <div className="shell band">
        <Reveal>
          <SpecLabel index="01">O problema</SpecLabel>
          <h2
            data-reveal-line=""
            className="text-headline mt-7 max-w-[20ch] overflow-hidden pb-[0.08em]"
          >
            <span className="block text-balance">
              Existem dois jeitos de perder o cliente que já queria te
              contratar.
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal index={0} className="border-rule border-t pt-7">
            <h3 className="font-display text-title text-paper">
              Ele não te encontra
            </h3>
            <p className="text-mute mt-4 leading-relaxed text-pretty">
              Quem procura “mecânica perto de mim” não passa da primeira página.
              Se o seu concorrente tem site com as páginas certas e a ficha do
              Google Meu Negócio completa, ele aparece, e você não existe
              naquela busca, mesmo tendo o melhor serviço do bairro.
            </p>
          </Reveal>

          <Reveal index={1} className="border-rule border-t pt-7">
            <h3 className="font-display text-title text-paper">
              Ele te encontra e desiste de esperar
            </h3>
            <p className="text-mute mt-4 leading-relaxed text-pretty">
              Site pesado é dinheiro saindo pela porta sem fazer barulho: o
              cliente clicou, o anúncio foi pago, e ele foi embora antes de a
              página abrir. Você nunca fica sabendo que ele existiu.
            </p>
          </Reveal>
        </div>

        {/* A régua de três segundos. É a linha de cota do desenho técnico
            usada para o que ela existe: mostrar uma distância medida. */}
        <Reveal className="border-rule mt-16 border p-6 sm:mt-20 sm:p-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="text-paper max-w-lg leading-relaxed text-pretty">
              {/* Margem à direita por aperto óptico: o "%" do Plex Mono tem pouca
                  folga lateral e encostava na palavra seguinte. */}
              <span className="text-signal mr-1 font-mono">53%</span> dos
              acessos por celular são abandonados quando a página leva mais de
              três segundos para abrir.
            </p>
            <p className="text-faint shrink-0 font-mono text-[0.625rem] tracking-[0.16em] uppercase">
              Google / SOASTA, 2017
            </p>
          </div>

          <div className="mt-14 mb-2">
            {/* Trilho */}
            <div className="relative">
              <div className="bg-rule-strong h-px w-full" />

              {/* Marcas das pontas */}
              <span
                aria-hidden="true"
                className="bg-rule-strong absolute top-1/2 left-0 h-3 w-px -translate-y-1/2"
              />
              <span
                aria-hidden="true"
                className="bg-rule-strong absolute top-1/2 right-0 h-3 w-px -translate-y-1/2"
              />

              {/* Trecho percorrido por esta página, em laranja */}
              {posicao !== null && (
                <div
                  aria-hidden="true"
                  className="bg-signal absolute top-1/2 left-0 h-px -translate-y-1/2 transition-[width] duration-700 ease-out"
                  style={{ width: `${posicao}%` }}
                />
              )}

              {/* A marca desta página */}
              {posicao !== null && (
                <span
                  aria-hidden="true"
                  className="bg-signal absolute top-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-700 ease-out"
                  style={{ left: `${posicao}%` }}
                />
              )}
            </div>

            {/* Cotas das pontas */}
            <div className="text-faint mt-3 flex justify-between font-mono text-[0.625rem] tracking-[0.16em] uppercase">
              <span className="tnum">0 s</span>
              <span className="tnum">{REGUA} s · metade já desistiu</span>
            </div>

            {/* Chamada da medição */}
            <div className="relative mt-5 h-10">
              {posicao !== null && leitura && (
                <div
                  className="absolute top-0 transition-[left] duration-700 ease-out"
                  style={{
                    left: `${posicao}%`,
                    // Perto das pontas o rótulo sairia do quadro, então ele
                    // deixa de ser centrado e se ancora na borda mais próxima.
                    transform:
                      posicao > 70
                        ? "translateX(-100%)"
                        : posicao < 12
                          ? "translateX(0)"
                          : "translateX(-50%)",
                  }}
                >
                  <span className="text-signal tnum block font-mono text-sm whitespace-nowrap">
                    {leitura.segundos.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    s
                  </span>
                  <span className="text-mute mt-1 block font-mono text-[0.625rem] tracking-[0.14em] whitespace-nowrap uppercase">
                    {estourou ? "Esta página, na sua conexão" : "Esta página"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
