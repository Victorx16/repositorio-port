"use client";

import type { CSSProperties } from "react";
import { Action } from "@/components/ui/action";
import { cn } from "@/lib/utils";
import {
  SpeedCaption,
  SpeedValue,
  usePageSpeed,
} from "@/components/ui/page-speed";
import { SpecLabel } from "@/components/ui/spec-label";
import { whatsappLink } from "@/lib/constants";

/**
 * A capa.
 *
 * A tese: o título faz uma acusação e o instrumento ao lado responde com um
 * número medido no aparelho de quem está lendo. Afirmação e prova na mesma
 * linha do olho, sem pedir que ninguém acredite em nada.
 *
 * O que saiu daqui, e por quê:
 * · A moldura de navegador falsa com três métricas escritas à mão. Fingia um
 *   print de produto que não existe, e os números eram alegação.
 * · O selo com bolinha pulsando, o botão com brilho em laço e o halo ciano.
 *   Três efeitos disputando o olho antes de o visitante ler uma palavra.
 * · A composição centralizada. Texto centralizado é a saída neutra; o eixo à
 *   esquerda com o carimbo na direita é a composição de uma prancha técnica,
 *   e dá ao título um corpo que o centro nunca permitiria.
 *
 * A ordem muda com a largura, e isso é deliberado. No desktop, título e
 * instrumento dividem a primeira faixa — a revisão visual mostrou que deixar o
 * instrumento embaixo abria um vazio de 300px no canto superior direito, bem
 * onde a prova deveria estar. No celular, o instrumento vai para o fim: entre
 * o título e o parágrafo ele empurraria o botão para fora da primeira tela.
 *
 * A entrada usa o mesmo mecanismo da revelação por scroll: o observador marca
 * `data-revealed` assim que monta — estes blocos já estão em quadro — e a
 * transição faz o resto. Uma versão anterior usava `@keyframes` com atraso e
 * a capa inteira ficou invisível no teste, porque numa animação o estado final
 * só chega se o relógio avançar até o fim. Transição não tem esse problema:
 * o alvo é o estado computado, e a animação é só o caminho até ele.
 */

/**
 * O título em duas metades, e a divisão é o argumento.
 *
 * A primeira valida quem está lendo; a segunda cobra. Trocamos "Seu cliente
 * desiste em três segundos" por isto porque a frase anterior era a fórmula que
 * qualquer agência de performance escreve: susto, número de estudo, urgência.
 * Aqui a promessa é a mesma coisa que a página faz consigo mesma — o site
 * prova o próprio desempenho medindo a si próprio, ao lado.
 *
 * As quebras são escritas à mão porque quebra é decisão de composição, não
 * sobra de largura. A linha mais longa tem 15 caracteres, o que garante que o
 * corpo grande caiba em tela de 360px sem virar um bloco de seis linhas.
 */
const TITULO = [
  { texto: "Você é bom", peso: "font-medium" },
  { texto: "no que faz.", peso: "font-medium" },
  { texto: "Seu site", peso: "font-semibold" },
  { texto: "precisa provar", peso: "font-semibold", ponto: true },
];

/** Atalho para a variável de atraso lida pelo CSS. */
const atraso = (ms: number) =>
  ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const leitura = usePageSpeed();

  return (
    <section id="top" className="border-rule relative overflow-hidden border-b">
      {/* Malha de coordenadas: dois gradientes lineares, custo de pintura
          desprezível, e some antes de encostar no conteúdo. */}
      <div
        aria-hidden="true"
        className="blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_72%)]"
      />

      <div className="shell relative pt-28 pb-16 sm:pt-32 sm:pb-24">
        <div data-reveal="" style={atraso(0)}>
          <SpecLabel>São Paulo · ABC Paulista</SpecLabel>
        </div>

        <div className="mt-8 grid gap-x-10 gap-y-14 lg:grid-cols-12">
          {/*
            Duas coisas separam este título de um título grande qualquer.

            O peso muda no meio: as duas primeiras linhas vêm em 500 e as duas
            últimas em 600. É pouco para se notar e o bastante para o olho ler
            a virada entre a validação e a cobrança.

            O ponto final é laranja. Um único ponto de acento numa parede de
            branco, no lugar exato onde a frase fecha. É o tipo de detalhe que
            ninguém aponta e todo mundo sente.
          */}
          <h1 className="text-display order-1 max-w-[13ch] lg:col-span-7 lg:row-start-1">
            {TITULO.map((linha, i) => (
              // O wrapper corta; o span interno desliza. O respiro embaixo é
              // para descendente nenhuma ser decepada pelo overflow.
              <span
                key={linha.texto}
                data-reveal-line=""
                style={atraso(120 + i * 80)}
                className={cn(
                  "block overflow-hidden pb-[0.08em]",
                  linha.peso,
                  // Respiro extra entre as duas metades da frase.
                  i === 2 && "mt-[0.14em]",
                )}
              >
                <span className="block">
                  {linha.texto}
                  {linha.ponto && <span className="text-signal">.</span>}
                </span>
              </span>
            ))}
          </h1>

          {/* O carimbo: o instrumento que mede esta própria página.
              `self-end` encosta a base dele na base do título. */}
          <div
            data-reveal=""
            style={atraso(500)}
            className="order-3 lg:order-2 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-end"
          >
            <div className="border-rule bg-ink-2/70 border">
              <div className="border-rule text-spec-sm text-faint flex items-center justify-between border-b px-5 py-3 font-mono uppercase">
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="bg-signal size-1.5 shrink-0"
                  />
                  Medição ao vivo
                </span>
                <span>Core Web Vitals</span>
              </div>

              <div className="px-5 py-7 sm:px-7">
                <p className="font-display text-title text-paper">
                  Este site abriu em <SpeedValue leitura={leitura} />
                </p>
                <SpeedCaption leitura={leitura} className="mt-7" />
              </div>
            </div>

            <p className="text-faint mt-3 font-mono text-[0.625rem] leading-relaxed tracking-[0.14em] uppercase">
              Não é número de folheto. É o seu navegador reportando o
              carregamento desta página, agora.
            </p>
          </div>

          {/* Parágrafo e ação. No desktop caem na segunda faixa, sob o título;
              no celular vêm antes do instrumento, para o botão não afundar. */}
          <div
            data-reveal=""
            style={atraso(400)}
            className="order-2 lg:order-3 lg:col-span-7 lg:row-start-2"
          >
            {/*
              O que estava aqui era uma lista de negativas — sem template, sem
              plugin, sem mensalidade — que a fita de especificação logo abaixo
              já repete item por item. Trocado por uma frase que a fita não
              cobre: por que o site importa, na linguagem de quem vai comprar.
            */}
            <p className="text-mute max-w-md text-lg leading-relaxed text-pretty">
              Quem procura por você decide em segundos, olhando uma tela. O site
              é a única parte do seu negócio que trabalha sozinha às duas da
              manhã.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Action
                href={whatsappLink(
                  "Olá! Vim pelo site e quero um orçamento para o meu negócio.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                arrow
              >
                Pedir orçamento
              </Action>
              <Action variant="ghost" href="#trabalho">
                Ver o trabalho
              </Action>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
