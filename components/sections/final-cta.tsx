import { Action } from "@/components/ui/action";
import { Reveal } from "@/components/ui/reveal";
import { whatsappLink } from "@/lib/constants";

/**
 * O fechamento.
 *
 * A malha de coordenadas volta aqui, invertida, para rimar com a capa: a folha
 * abre e fecha com a mesma grade e o documento se lê como uma peça só. É o
 * único lugar da página, além da capa, onde ela aparece.
 *
 * Saiu o RetroGrid — aquele plano em perspectiva rolando para sempre no fundo.
 * Era animação contínua atrás do momento em que o visitante decide clicar, e
 * mantinha a GPU do celular acordada até o fim da página, sem acrescentar nada
 * ao argumento.
 *
 * A promessa de "análise gratuita sem compromisso" também saiu. É a frase que
 * todo site de agência escreve, então já não significa nada. No lugar, o que
 * de fato acontece quando alguém manda mensagem — incluindo a possibilidade de
 * a resposta ser não.
 */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_72%)]"
      />

      <div className="shell relative band">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 className="text-display max-w-[11ch] text-balance">
              Me conta o que você precisa.
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-mute text-lg leading-relaxed text-pretty">
              Eu digo se consigo resolver, quanto custa e em quanto tempo fica
              pronto. Se o seu caso não for comigo, digo isso também, e indico
              alguém quando conheço.
            </p>

            <div className="mt-9">
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
            </div>

            <p className="text-faint mt-6 font-mono text-[0.625rem] tracking-[0.14em] uppercase">
              Respondo no mesmo dia útil
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
