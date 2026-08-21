import { Reveal } from "@/components/ui/reveal";
import { SpecLabel } from "@/components/ui/spec-label";
import { PROJECT_SPECS } from "@/lib/constants";

/**
 * O que entra em todo projeto.
 *
 * Aqui havia duas esteiras rolando em laço infinito. Saíram por dois motivos.
 *
 * O primeiro é de direção: movimento perpétuo que ninguém pediu é o oposto de
 * "sóbria e cirúrgica". Uma esteira nunca termina, então o olho volta nela a
 * cada rolagem e nada é lido até o fim.
 *
 * O segundo é de conteúdo: a segunda esteira listava nichos — "Salão de
 * Beleza", "Advocacia", "Restaurantes" — como se fossem clientes atendidos.
 * Não eram. Insinuar carteira de clientes é a única mentira que um site de
 * estúdio novo não pode contar, porque é a primeira que o visitante checa.
 *
 * A grade parada dá o que a esteira nunca deu: dá para ler todos os oito.
 */
export function SpecBand() {
  return (
    <section className="border-rule bg-ink-2 border-b">
      <div className="shell py-14 sm:py-16">
        <Reveal>
          <SpecLabel>Em todo projeto, sem custo extra</SpecLabel>
        </Reveal>

        {/* Só fios horizontais. Uma grade de oito células com divisória nos
            dois eixos vira gaiola: são catorze linhas disputando atenção com
            oito frases curtas. As horizontais bastam para agrupar. */}
        <ul className="border-rule mt-9 grid border-b sm:grid-cols-2 lg:grid-cols-4">
          {PROJECT_SPECS.map((spec, i) => (
            <Reveal
              as="li"
              key={spec}
              index={i}
              className="border-rule flex items-start gap-3 border-t py-5 pr-8"
            >
              <span
                aria-hidden="true"
                className="bg-signal mt-2.5 h-px w-3 shrink-0"
              />
              <span className="text-mute text-sm leading-relaxed">{spec}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
