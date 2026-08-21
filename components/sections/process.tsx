import { Reveal } from "@/components/ui/reveal";
import { SpecLabel } from "@/components/ui/spec-label";
import { PROCESS_STEPS } from "@/lib/constants";

/**
 * O processo.
 *
 * A numeração fica porque aqui a ordem é informação de verdade: são quatro
 * etapas que acontecem nessa sequência, e saber que a proposta vem antes do
 * código é o que tira o medo de contratar. Numerar uma lista que não é
 * sequência seria enfeite; numerar esta é rotular.
 *
 * O que cada etapa ganhou: um prazo e uma linha dizendo o que cabe ao cliente.
 * "Design & Engenharia" sem prazo e sem tarefa é uma caixa bonita que não
 * responde as duas únicas perguntas de quem vai assinar — quanto tempo leva e
 * o que vão me pedir.
 *
 * A linha de cota que costurava as etapas era um gradiente com brilho. Aqui
 * ela é o próprio fio de 1px que fecha o topo das quatro colunas, com uma
 * marca laranja em cada estação. Mesma função, sem o néon — e, de quebra,
 * vira empilhamento vertical no celular sem nenhum código a mais.
 */
export function Process() {
  return (
    <section id="processo" className="border-rule border-b">
      <div className="shell band">
        <Reveal>
          <SpecLabel index="04">O processo</SpecLabel>
          <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2
              data-reveal-line=""
              className="text-headline max-w-[16ch] overflow-hidden pb-[0.08em]"
            >
              <span className="block text-balance">
                Quatro etapas, com prazo em cada uma.
              </span>
            </h2>
            <p className="text-mute max-w-md leading-relaxed text-pretty">
              Você sabe onde o projeto está e o que precisa entregar em cada
              fase. A etapa que mais atrasa projeto é a terceira, e ela depende
              de você. Está escrito lá.
            </p>
          </div>
        </Reveal>

        <ol className="mt-16 grid lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              index={i}
              // `flex-col` aqui e `flex-1` no parágrafo: os textos das quatro
              // etapas têm alturas diferentes, e sem isso a régua "Cabe a você"
              // saía escalonada entre as colunas. Numa página construída sobre
              // alinhamento, um desencontro de 25px estraga a ideia inteira.
              className="border-rule flex flex-col border-t pt-6 pb-10 lg:pr-8 lg:pb-0"
            >
              {/* A estação na linha de cota. */}
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="bg-signal size-1.5" />
                <span className="text-faint tnum font-mono text-[0.625rem] tracking-[0.2em] uppercase">
                  Etapa {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="text-signal mt-5 font-mono text-sm">
                {step.duration}
              </p>

              <h3 className="font-display text-title text-paper mt-2">
                {step.title}
              </h3>

              {/* `flex-1` só no desktop: o parágrafo absorve a folga da coluna
                  mais alta e empurra o rodapé para a mesma linha em todas. */}
              <p className="text-mute mt-4 leading-relaxed text-pretty lg:flex-1">
                {step.body}
              </p>

              <div className="border-rule mt-6 border-t pt-4">
                <p className="text-faint font-mono text-[0.5625rem] tracking-[0.2em] uppercase">
                  Cabe a você
                </p>
                <p className="text-mute mt-2 text-sm leading-relaxed text-pretty">
                  {step.yours}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
