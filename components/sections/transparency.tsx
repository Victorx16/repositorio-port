import { Reveal } from "@/components/ui/reveal";
import { SpecLabel } from "@/components/ui/spec-label";
import { STUDIO_FACTS } from "@/lib/constants";

/**
 * As perguntas que o visitante já está fazendo em silêncio.
 *
 * Um estúdio com um projeto no ar tem duas saídas. A primeira é encher a
 * página de volume inventado e torcer para ninguém checar. A segunda é
 * responder antes de ser perguntado — inclusive o que não é bonito de dizer.
 *
 * Esta seção é a segunda saída, e é por isso que ela vem logo depois do único
 * case: é exatamente ali que a dúvida aparece. Deixar a resposta para o fim da
 * página seria deixar o visitante desconfiado por seis seções.
 */
export function Transparency() {
  return (
    <section className="border-rule bg-ink-2 border-b">
      <div className="shell band">
        <Reveal>
          <SpecLabel index="03">Antes que você pergunte</SpecLabel>
          <h2
            data-reveal-line=""
            className="text-headline mt-7 max-w-[22ch] overflow-hidden pb-[0.08em]"
          >
            <span className="block text-balance">
              O que você provavelmente quer saber e não vai perguntar.
            </span>
          </h2>
        </Reveal>

        <div className="border-rule mt-14 grid border-b sm:grid-cols-2">
          {STUDIO_FACTS.map((fato, i) => (
            <Reveal
              key={fato.label}
              index={i}
              className="border-rule border-t py-8 pr-0 sm:pr-12 sm:even:pl-12 sm:even:border-l"
            >
              <h3 className="text-signal font-mono text-[0.625rem] tracking-[0.2em] uppercase">
                {fato.label}
              </h3>
              <p className="text-mute mt-4 leading-relaxed text-pretty">
                {fato.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
