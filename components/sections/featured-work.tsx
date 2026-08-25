import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CasePreview } from "@/components/ui/case-preview";
import { Reveal } from "@/components/ui/reveal";
import { SpecLabel } from "@/components/ui/spec-label";
import { FEATURED_CASE } from "@/lib/constants";

/**
 * O trabalho.
 *
 * Um case só, ocupando o espaço que a versão anterior dava a uma grade. A
 * decisão veio junto com o cliente: um projeto de verdade, aberto para abrir e
 * medir, prova mais do que seis caixas escritas "em breve" — que só ensinam o
 * visitante a desconfiar também da que é real.
 *
 * A prévia mantém a paleta do Áurea: preto tinta, osso e oxblood, que não têm
 * nada a ver com o azul e o laranja desta página. Cada cliente recebe a própria
 * direção de arte, e a diferença fala sozinha; explicá-la por escrito embaixo
 * da imagem era o site cutucando o visitante para elogiar o próprio método.
 */
export function FeaturedWork() {
  const caso = FEATURED_CASE;

  return (
    <section id="trabalho" className="border-rule border-b">
      <div className="shell band">
        <Reveal>
          <SpecLabel index="02">O trabalho</SpecLabel>
          <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2
              data-reveal-line=""
              className="text-headline max-w-[18ch] overflow-hidden pb-[0.08em]"
            >
              <span className="block text-balance">
                Um projeto no ar, aberto para você conferir.
              </span>
            </h2>
            <p className="text-mute max-w-md leading-relaxed text-pretty">
              O estúdio é novo e tem um case publicado. Ele está linkado aqui:
              abra no seu celular, meça, navegue. É a única prova que vale.
            </p>
          </div>
        </Reveal>

        {/*
          A prévia é o maior alvo clicável da página e leva direto à prova.
          Antes era imagem inerte, com os links só no bloco de texto abaixo:
          quem quisesse abrir o site tinha que caçar a linha certa.

          Ao passar o mouse, duas hairlines cruzam a imagem e um rótulo aparece
          no canto. É a mira de uma prancha técnica marcando um ponto, e resolve
          um problema real: sinalizar que a imagem é clicável sem cobri-la com
          um botão.
        */}
        <Reveal className="mt-14">
          <a
            href={caso.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir o site do ${caso.client} em uma nova aba`}
            // A moldura acompanha a captura de cada largura: retrato de
            // celular no celular, paisagem no desktop. Recortar uma na
            // proporção da outra decepava o título do cliente.
            className="group/mira border-rule relative block aspect-[43/61] overflow-hidden border sm:aspect-[16/9]"
          >
            {/* Sem `priority`: a prévia está bem abaixo da dobra. Pré-carregá-la
                disputava banda com a fonte que o LCP estava esperando. */}
            <CasePreview
              src={caso.image}
              srcMobile={caso.imageMobile}
              alt={caso.imageAlt}
            />

            <span
              aria-hidden="true"
              className="bg-ink/0 group-hover/mira:bg-ink/45 absolute inset-0 transition-colors duration-500"
            />

            {/* Os dois eixos da mira. */}
            <span
              aria-hidden="true"
              className="bg-signal/70 absolute top-1/2 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover/mira:scale-x-100"
            />
            <span
              aria-hidden="true"
              className="bg-signal/70 absolute top-0 left-1/2 h-full w-px origin-top scale-y-0 transition-transform duration-500 ease-out group-hover/mira:scale-y-100"
            />

            <span
              aria-hidden="true"
              className="bg-signal text-ink absolute bottom-4 left-4 translate-y-1 px-3 py-2 font-mono text-[0.625rem] tracking-[0.16em] uppercase opacity-0 transition duration-300 ease-out group-hover/mira:translate-y-0 group-hover/mira:opacity-100 sm:bottom-6 sm:left-6"
            >
              Abrir o site no ar
            </span>
          </a>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="text-faint font-mono text-[0.625rem] tracking-[0.2em] uppercase">
              {caso.niche} · {caso.year}
            </p>
            <h3 className="font-display mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              {caso.client}
            </h3>
            <p className="text-mute mt-6 max-w-lg text-lg leading-relaxed text-pretty">
              {caso.tagline}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href={`/cases/${caso.slug}`}
                className="link-group group/link text-signal inline-flex min-h-11 items-center gap-2 font-mono text-[0.7rem] tracking-[0.14em] uppercase"
              >
                <span className="link-rule">Ler o case completo</span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
                />
              </Link>

              {caso.liveUrl && (
                <a
                  href={caso.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-group group/link text-mute hover:text-paper inline-flex min-h-11 items-center gap-2 font-mono text-[0.7rem] tracking-[0.14em] uppercase transition-colors"
                >
                  <span className="link-rule">Abrir o site no ar</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              )}
            </div>
          </Reveal>

          {/* Ficha técnica do projeto. Mesma linguagem do carimbo do rodapé. */}
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <dl className="border-rule border-t">
              <div className="border-rule flex items-baseline justify-between gap-6 border-b py-4">
                <dt className="text-faint font-mono text-[0.625rem] tracking-[0.18em] uppercase">
                  Construído com
                </dt>
                <dd className="text-mute text-right text-sm">
                  {caso.stack.join(" · ")}
                </dd>
              </div>
              <div className="border-rule flex items-baseline justify-between gap-6 border-b py-4">
                <dt className="text-faint font-mono text-[0.625rem] tracking-[0.18em] uppercase">
                  Páginas entregues
                </dt>
                <dd className="text-mute tnum text-right font-mono text-sm">
                  03
                </dd>
              </div>
              <div className="border-rule flex items-baseline justify-between gap-6 border-b py-4">
                <dt className="text-faint font-mono text-[0.625rem] tracking-[0.18em] uppercase">
                  Contraste
                </dt>
                <dd className="text-mute text-right text-sm">
                  WCAG AA auditado
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-faint font-mono text-[0.625rem] tracking-[0.18em] uppercase">
                  Fotos
                </dt>
                <dd className="text-mute text-right text-sm">
                  3 MB → ~120 KB em WebP
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
