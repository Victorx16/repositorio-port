import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Action } from "@/components/ui/action";
import { CasePreview } from "@/components/ui/case-preview";
import { Reveal } from "@/components/ui/reveal";
import { SpecLabel } from "@/components/ui/spec-label";
import { CASE_STUDIES, SITE, whatsappLink } from "@/lib/constants";

/**
 * Página de estudo de caso.
 *
 * A rota é dinâmica por slug, mas a lista é estática: `generateStaticParams`
 * pré-renderiza todos os cases no build, então cada um é HTML pronto — sem
 * função de servidor no caminho do visitante.
 *
 * A página herda a direção da prancha, não a do cliente. Ela é um documento
 * sobre o projeto, escrito pelo estúdio; a identidade do Áurea aparece dentro
 * da moldura da prévia, que é o lugar dela.
 */

export function generateStaticParams() {
  return CASE_STUDIES.map((caso) => ({ slug: caso.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caso = CASE_STUDIES.find((c) => c.slug === slug);
  if (!caso) return {};

  const title = `${caso.client}: case de ${caso.niche}`;
  return {
    title,
    description: caso.tagline,
    openGraph: {
      title,
      description: caso.tagline,
      siteName: SITE.name,
      locale: "pt_BR",
      type: "article",
    },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caso = CASE_STUDIES.find((c) => c.slug === slug);

  // Slug inexistente devolve 404 de verdade, não uma página vazia.
  if (!caso) notFound();

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
              href="/#trabalho"
              className="group/voltar text-mute hover:text-paper inline-flex min-h-11 items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-3.5 transition-transform duration-200 group-hover/voltar:-translate-x-1"
              />
              Voltar ao trabalho
            </Link>

            <div className="mt-10">
              <SpecLabel>
                {caso.niche} · {caso.year}
              </SpecLabel>
              <h1 className="text-display mt-6 max-w-[12ch]">{caso.client}</h1>
              <p className="text-mute mt-8 max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl">
                {caso.tagline}
              </p>
            </div>

            {caso.liveUrl && (
              <div className="mt-10">
                <Action
                  href={caso.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  arrow
                >
                  Abrir o site no ar
                </Action>
              </div>
            )}
          </div>
        </section>

        {/* Prévia */}
        <section className="border-rule bg-ink-2 border-b">
          <div className="shell py-12 sm:py-16">
            {/* `relative` não é decorativo: o next/image usa `fill`, que
                posiciona a imagem contra o ancestral posicionado mais próximo. */}
            <div className="border-rule relative aspect-[4/3] overflow-hidden border sm:aspect-[16/9]">
              <CasePreview src={caso.image} alt={caso.imageAlt} priority />
            </div>
            {!caso.image && (
              <p className="text-faint mt-4 font-mono text-[0.625rem] tracking-[0.14em] uppercase">
                {/* TODO: trocar por captura real do site em produção. */}
                Representação da direção de arte, não é uma captura de tela
              </p>
            )}
          </div>
        </section>

        {/* Desafio e abordagem */}
        <section className="border-rule border-b">
          <div className="shell band grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="border-rule border-t pt-7">
              <h2 className="font-display text-title text-paper">O desafio</h2>
              <p className="text-mute mt-5 leading-relaxed text-pretty">
                {caso.challenge}
              </p>
            </Reveal>
            <Reveal index={1} className="border-rule border-t pt-7">
              <h2 className="font-display text-title text-paper">
                A abordagem
              </h2>
              <p className="text-mute mt-5 leading-relaxed text-pretty">
                {caso.approach}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Decisões — em ordem de projeto, que é o que a numeração registra. */}
        <section className="border-rule border-b">
          <div className="shell band">
            <Reveal>
              <SpecLabel>Decisões</SpecLabel>
              <h2
                data-reveal-line=""
                className="text-headline mt-7 max-w-[18ch] overflow-hidden pb-[0.08em]"
              >
                <span className="block text-balance">
                  O que foi decidido, e por quê.
                </span>
              </h2>
            </Reveal>

            <ol className="border-rule mt-14 border-b">
              {caso.decisions.map((d, i) => (
                <Reveal
                  as="li"
                  key={d.title}
                  index={i}
                  className="border-rule grid gap-4 border-t py-9 lg:grid-cols-12 lg:gap-8"
                >
                  <div className="lg:col-span-3">
                    <span className="text-faint tnum font-mono text-[0.625rem] tracking-[0.2em] uppercase">
                      Decisão {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-title text-paper mt-3">
                      {d.title}
                    </h3>
                  </div>
                  <p className="text-mute leading-relaxed text-pretty lg:col-span-8 lg:col-start-5">
                    {d.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Entregas */}
        <section className="border-rule bg-ink-2 border-b">
          <div className="shell band grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <SpecLabel>Entregue</SpecLabel>
              <h2
                data-reveal-line=""
                className="text-headline mt-7 max-w-[10ch] overflow-hidden pb-[0.08em]"
              >
                <span className="block text-balance">O que está no ar.</span>
              </h2>

              <dl className="border-rule mt-10 border-t">
                <div className="border-rule flex items-baseline justify-between gap-6 border-b py-4">
                  <dt className="text-faint font-mono text-[0.625rem] tracking-[0.18em] uppercase">
                    Construído com
                  </dt>
                  <dd className="text-mute text-right text-sm">
                    {caso.stack.join(" · ")}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-faint font-mono text-[0.625rem] tracking-[0.18em] uppercase">
                    Ano
                  </dt>
                  <dd className="text-mute tnum text-right font-mono text-sm">
                    {caso.year}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal className="lg:col-span-7 lg:col-start-6">
              <ul className="border-rule border-b">
                {caso.delivered.map((item) => (
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
                <h2 className="text-display max-w-[11ch] text-balance">
                  Seu projeto pode ser o próximo.
                </h2>
              </Reveal>

              <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end">
                <p className="text-mute text-lg leading-relaxed text-pretty">
                  Me conta o que você precisa e eu digo, sem enrolação, se
                  consigo resolver e quanto custa.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                  {/*
                    A home não tem âncora de contato: o canal do site é o
                    WhatsApp, aberto pelo widget flutuante. De uma página
                    interna, o link direto é o caminho honesto — e já leva o
                    contexto do case na mensagem, para a conversa começar
                    adiantada.
                  */}
                  <Action
                    href={whatsappLink(
                      `Olá! Vi o case do ${caso.client} no site e quero falar sobre um projeto.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    arrow
                  >
                    Falar sobre meu projeto
                  </Action>

                  <Link
                    href="/#trabalho"
                    className="group/voltar text-mute hover:text-paper inline-flex min-h-11 items-center gap-2 font-mono text-[0.7rem] tracking-[0.14em] uppercase transition-colors"
                  >
                    <ArrowLeft
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-200 group-hover/voltar:-translate-x-1"
                    />
                    Voltar ao trabalho
                  </Link>
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
