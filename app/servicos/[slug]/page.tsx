import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Action } from "@/components/ui/action";
import { Reveal } from "@/components/ui/reveal";
import { SpecLabel } from "@/components/ui/spec-label";
import {
  FEATURED_CASE,
  SERVICE_PAGES,
  SITE,
  whatsappLink,
} from "@/lib/constants";

/**
 * Página de serviço.
 *
 * Existe por um motivo de busca, não de design: os quatro escopos moravam
 * numa seção da home, e uma página só não disputa quatro buscas diferentes.
 *
 * Ela herda a prancha do resto do site. O que muda é a ordem do argumento:
 * o que é → para quem serve e para quem não serve → o que entra → prazo →
 * a prova → as dúvidas → o convite. A recusa vem cedo de propósito, antes de
 * o visitante investir tempo lendo o que não é para ele.
 */

export function generateStaticParams() {
  return SERVICE_PAGES.map((servico) => ({ slug: servico.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const servico = SERVICE_PAGES.find((s) => s.slug === slug);
  if (!servico) return {};

  const title = servico.metaTitle;
  const description = servico.metaDescription;

  return {
    title,
    description,
    alternates: { canonical: `/servicos/${servico.slug}` },
    openGraph: {
      title,
      description,
      siteName: SITE.name,
      locale: "pt_BR",
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ServicoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const servico = SERVICE_PAGES.find((s) => s.slug === slug);

  if (!servico) notFound();

  const outro = SERVICE_PAGES.find((s) => s.slug !== servico.slug);

  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        {/* Abertura */}
        <section className="border-rule relative overflow-hidden border-b">
          <div
            aria-hidden="true"
            className="blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
          />

          <div className="shell relative pt-28 pb-16 sm:pt-32 sm:pb-20">
            <Link
              href="/#servicos"
              className="group/voltar text-mute hover:text-paper inline-flex min-h-11 items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-3.5 transition-transform duration-200 group-hover/voltar:-translate-x-1"
              />
              Todos os serviços
            </Link>

            <div className="mt-10">
              <SpecLabel>
                {servico.name} · {SITE.region}
              </SpecLabel>
              <h1 className="text-display mt-6 max-w-[20ch] text-balance">
                {servico.headline}
              </h1>
              <p className="text-mute mt-8 max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl">
                {servico.intro}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Action
                href={whatsappLink(`Olá! Quero ${servico.ctaIntent}.`)}
                target="_blank"
                rel="noopener noreferrer"
                arrow
              >
                Pedir orçamento
              </Action>
              <span className="text-faint tnum font-mono text-[0.6875rem] tracking-[0.18em] uppercase">
                Prazo: {servico.timeline}
              </span>
            </div>
          </div>
        </section>

        {/*
          Serve e não serve, lado a lado.

          Dizer para quem não serve custa alguns visitantes e economiza as
          reuniões que morriam no quinto minuto. E quando existe o serviço
          certo, a recusa vira um link em vez de um beco.
        */}
        <section className="border-rule bg-ink-2 border-b">
          <div className="shell band grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="border-rule border-t pt-7">
              <h2 className="font-display text-title text-paper">
                É para você se
              </h2>
              <ul className="border-rule mt-6 border-b">
                {servico.fitFor.map((item) => (
                  <li
                    key={item}
                    className="border-rule flex items-start gap-4 border-t py-4"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-signal mt-3 h-px w-3 shrink-0"
                    />
                    <span className="text-mute leading-relaxed text-pretty">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal index={1} className="border-rule border-t pt-7">
              <h2 className="font-display text-title text-paper">
                Não é para você se
              </h2>
              <ul className="border-rule mt-6 border-b">
                {servico.notFor.map((item) => {
                  const destino = item.leadTo
                    ? SERVICE_PAGES.find((s) => s.slug === item.leadTo)
                    : undefined;

                  return (
                    <li
                      key={item.text}
                      className="border-rule flex items-start gap-4 border-t py-4"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-rule-strong mt-3 h-px w-3 shrink-0"
                      />
                      <span className="text-mute leading-relaxed text-pretty">
                        {item.text}
                        {destino && (
                          <>
                            {". "}
                            <Link
                              href={`/servicos/${destino.slug}`}
                              className="link-group group/link text-signal inline-flex items-center gap-1"
                            >
                              <span className="link-rule">
                                Veja {destino.name.toLowerCase()}
                              </span>
                              <ArrowRight
                                aria-hidden="true"
                                className="size-3 transition-transform duration-200 group-hover/link:translate-x-0.5"
                              />
                            </Link>
                          </>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* O que entra */}
        <section className="border-rule border-b">
          <div className="shell band">
            <Reveal>
              <SpecLabel>O que entra</SpecLabel>
              <h2
                data-reveal-line=""
                className="text-headline mt-7 max-w-[18ch] overflow-hidden pb-[0.08em]"
              >
                <span className="block text-balance">
                  O escopo, item por item.
                </span>
              </h2>
            </Reveal>

            <ol className="border-rule mt-14 border-b">
              {servico.includes.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.title}
                  index={i}
                  className="border-rule grid gap-4 border-t py-9 lg:grid-cols-12 lg:gap-8"
                >
                  <div className="lg:col-span-4">
                    <span className="text-faint tnum font-mono text-[0.625rem] tracking-[0.2em] uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-title text-paper mt-3">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-mute leading-relaxed text-pretty lg:col-span-7 lg:col-start-6">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/*
          A prova.

          A página inteira fala de escopo e de prazo, que são promessas. Este
          bloco é a única coisa aqui que já aconteceu, e por isso ele leva ao
          case em vez de repetir adjetivo.
        */}
        <section className="border-rule bg-ink-2 border-b">
          <div className="shell band grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SpecLabel>A prova</SpecLabel>
              <h2
                data-reveal-line=""
                className="text-headline mt-7 max-w-[14ch] overflow-hidden pb-[0.08em]"
              >
                <span className="block text-balance">
                  Tudo acima é promessa. Isto aqui já está no ar.
                </span>
              </h2>
            </Reveal>

            <Reveal className="lg:col-span-6 lg:col-start-7 lg:self-end">
              <p className="text-mute text-lg leading-relaxed text-pretty">
                O estúdio é novo e tem um projeto publicado. Ele está aberto
                para você abrir no celular, medir e navegar antes de decidir
                qualquer coisa.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href={`/cases/${FEATURED_CASE.slug}`}
                  className="link-group group/link text-signal inline-flex min-h-11 items-center gap-2 font-mono text-[0.7rem] tracking-[0.14em] uppercase"
                >
                  <span className="link-rule">
                    Ler o case do {FEATURED_CASE.client}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Perguntas do serviço, não as do site inteiro. */}
        <section className="border-rule border-b">
          <div className="shell band">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <SpecLabel>Perguntas</SpecLabel>
                  <h2
                    data-reveal-line=""
                    className="text-headline mt-7 max-w-[12ch] overflow-hidden pb-[0.08em]"
                  >
                    <span className="block text-balance">
                      Sobre este serviço.
                    </span>
                  </h2>
                </div>
              </Reveal>

              <Reveal className="lg:col-span-7 lg:col-start-6">
                <Accordion multiple={false} className="border-rule border-t">
                  {servico.faq.map((item) => (
                    <AccordionItem
                      key={item.question}
                      value={item.question}
                      className="border-rule border-b"
                    >
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

        {/* Fechamento */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_72%)]"
          />
          <div className="shell band relative">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-7">
                <h2 className="text-display max-w-[13ch] text-balance">
                  Me conta o que você precisa.
                </h2>
              </Reveal>

              <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end">
                <p className="text-mute text-lg leading-relaxed text-pretty">
                  Eu digo, sem enrolação, se este é o escopo certo para o seu
                  caso e quanto custa. Se não for, digo qual é.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Action
                    href={whatsappLink(`Olá! Quero ${servico.ctaIntent}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    arrow
                  >
                    Pedir orçamento
                  </Action>

                  {outro && (
                    <Link
                      href={`/servicos/${outro.slug}`}
                      className="link-group group/link text-mute hover:text-paper inline-flex min-h-11 items-center gap-2 font-mono text-[0.7rem] tracking-[0.14em] uppercase transition-colors"
                    >
                      <span className="link-rule">Ver {outro.name}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
                      />
                    </Link>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
