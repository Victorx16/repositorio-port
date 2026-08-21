import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { SpecLabel } from "@/components/ui/spec-label";
import { FAQ_ITEMS } from "@/lib/constants";

/**
 * Perguntas.
 *
 * A caixa arredondada que embrulhava o acordeão saiu: dentro dela cada
 * pergunta virava uma linha de card, e a seção inteira flutuava no meio da
 * página sem se alinhar com nada. Sobre a grade da prancha, os fios das
 * perguntas continuam as colunas do resto do documento.
 *
 * O título saiu do centro e foi para a coluna da esquerda, onde fica parado
 * enquanto as respostas abrem e fecham na direita. Assim o eixo de leitura não
 * se move quando o acordeão muda de altura.
 */
export function Faq() {
  return (
    <section id="perguntas" className="border-rule border-b">
      <div className="shell band">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SpecLabel index="06">Perguntas</SpecLabel>
              <h2
                data-reveal-line=""
                className="text-headline mt-7 max-w-[12ch] overflow-hidden pb-[0.08em]"
              >
                <span className="block text-balance">
                  O que costumam me perguntar.
                </span>
              </h2>
              <p className="text-mute mt-6 max-w-xs leading-relaxed text-pretty">
                Se a sua não estiver aqui, mande no WhatsApp. Respondo mesmo
                quando a resposta é “esse caso não é comigo”.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7 lg:col-start-6">
            <Accordion multiple={false} className="border-rule border-t">
              {FAQ_ITEMS.map((item) => (
                <AccordionItem
                  key={item.question}
                  value={item.question}
                  className="border-rule border-b"
                >
                  {/*
                    O chevron do primitivo é escondido e um sinal de mais entra
                    no lugar. Ele gira 90° e a barra vertical encolhe até virar
                    um menos: um gesto só, contínuo, no lugar de trocar um ícone
                    por outro. Mais próximo de uma marcação feita à mão numa
                    prancha do que de uma seta de menu.
                  */}
                  <AccordionTrigger className="font-display text-paper hover:text-signal aria-expanded:text-signal gap-6 py-6 text-lg font-medium hover:no-underline [&_[data-slot=accordion-trigger-icon]]:hidden">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="relative mt-2 ml-auto size-3 shrink-0"
                    >
                      <span className="bg-mute group-hover/accordion-trigger:bg-signal group-aria-expanded/accordion-trigger:bg-signal absolute top-1/2 left-0 h-px w-full -translate-y-1/2 transition-transform duration-300 ease-out group-aria-expanded/accordion-trigger:rotate-180" />
                      <span className="bg-mute group-hover/accordion-trigger:bg-signal group-aria-expanded/accordion-trigger:bg-signal absolute top-0 left-1/2 h-full w-px -translate-x-1/2 transition-transform duration-300 ease-out group-aria-expanded/accordion-trigger:scale-y-0 group-aria-expanded/accordion-trigger:rotate-90" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-mute pb-7 text-base leading-relaxed text-pretty">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
