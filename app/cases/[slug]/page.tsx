import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { CasePreview } from "@/components/ui/case-preview";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { CASE_STUDIES, SITE, whatsappLink } from "@/lib/constants";

/**
 * Página de estudo de caso.
 *
 * A rota é dinâmica por slug, mas a lista é estática: `generateStaticParams`
 * pré-renderiza todos os cases no build, então cada um é HTML pronto — sem
 * função de servidor no caminho do visitante.
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

  const title = `${caso.client} — Case de ${caso.niche}`;
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
      <main className="flex-1">
        {/* Abertura */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <Link
              href="/#portfolio"
              className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar ao portfólio
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="border-border bg-background-alt text-muted-foreground"
              >
                {caso.niche}
              </Badge>
              <span className="font-mono text-[11px] text-muted-foreground">
                {caso.year}
              </span>
            </div>

            <h1 className="text-balance mt-5 font-heading text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-6xl">
              {caso.client}
            </h1>
            <p className="text-balance mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {caso.tagline}
            </p>

            {caso.liveUrl && (
              <div className="mt-9">
                <ShimmerButton
                  href={caso.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 px-7 text-sm"
                >
                  Visitar o site
                  <ExternalLink className="ml-2 size-4" aria-hidden="true" />
                </ShimmerButton>
              </div>
            )}
          </div>
        </section>

        {/* Prévia */}
        <section className="border-b border-border bg-background-alt py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-border">
              <CasePreview src={caso.image} alt={caso.imageAlt} />
            </div>
            {!caso.image && (
              <p className="mt-3 text-center font-mono text-[11px] text-muted-foreground">
                {/* TODO: trocar por captura real do site em produção. */}
                Representação da direção de arte — não é uma captura de tela
              </p>
            )}
          </div>
        </section>

        {/* Desafio e abordagem */}
        <section className="border-b border-border py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">
                O desafio
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {caso.challenge}
              </p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">
                A abordagem
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {caso.approach}
              </p>
            </div>
          </div>
        </section>

        {/* Decisões */}
        <section className="border-b border-border bg-background-alt py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Decisões
              </span>
              <h2 className="text-balance mt-3 font-heading text-3xl font-semibold leading-[1.2] tracking-[-0.01em] text-foreground sm:text-4xl">
                O que foi decidido, e por quê
              </h2>
            </div>

            <ol className="mt-14 space-y-px border-t border-border">
              {caso.decisions.map((d, i) => (
                <li
                  key={d.title}
                  className="grid gap-3 border-b border-border py-8 sm:grid-cols-[auto_1fr] sm:gap-8"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm text-primary sm:w-12"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      {d.title}
                    </h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                      {d.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Entregas */}
        <section className="border-b border-border py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Entregue
              </span>
              <h2 className="text-balance mt-3 font-heading text-3xl font-semibold leading-[1.2] tracking-[-0.01em] text-foreground">
                O que está no ar
              </h2>
              <ul className="mt-8 flex flex-wrap gap-2">
                {caso.stack.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-border bg-background-alt px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <ul className="space-y-4">
              {caso.delivered.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-secondary"
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Fechamento */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-balance font-heading text-3xl font-semibold leading-[1.2] tracking-[-0.01em] text-foreground sm:text-4xl">
              Seu projeto pode ser o próximo
            </h2>
            <p className="text-balance mx-auto mt-5 max-w-md text-muted-foreground">
              Conta o que você precisa e eu digo, sem enrolação, se consigo
              resolver e quanto custa.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              {/*
                A home não tem âncora de contato: o canal do site é o WhatsApp,
                aberto pelo widget flutuante. De uma página interna, o link
                direto é o caminho honesto — e já leva o contexto do case na
                mensagem, para a conversa começar adiantada.
              */}
              <ShimmerButton
                href={whatsappLink(
                  `Olá! Vi o case do ${caso.client} no site e quero falar sobre um projeto.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-8 text-sm"
              >
                Falar sobre meu projeto
              </ShimmerButton>
              <Link
                href="/#portfolio"
                className="inline-flex min-h-12 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Ver outros cases
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
