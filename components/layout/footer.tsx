import Link from "next/link";
import { CASE_STUDIES, NAV_LINKS, SITE, whatsappLink } from "@/lib/constants";
import { Action } from "@/components/ui/action";

/**
 * Rodapé — o carimbo da prancha.
 *
 * Toda folha de desenho técnico termina num quadro de campos: quem assinou, de
 * quando é, qual a revisão. É o lugar onde o documento se identifica, e é
 * exatamente o que um rodapé institucional precisa fazer. Em vez de imitar o
 * formato, o rodapé simplesmente é um: cada dado ocupa uma célula com fio de
 * 1px, rotulada em mono, como no original.
 *
 * O campo "Projetos no ar" mostra 1, e mostra de propósito. Um estúdio novo que
 * declara o número é mais confiável do que um que enche o portfólio de caixas
 * escritas "em breve" — e quem lê até o rodapé é justamente quem está checando.
 */

function CampoCarimbo({
  rotulo,
  children,
  className,
}: {
  rotulo: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-rule border-t border-l px-4 py-3.5 ${className ?? ""}`}
    >
      <dt className="text-faint font-mono text-[0.5625rem] tracking-[0.2em] uppercase">
        {rotulo}
      </dt>
      <dd className="text-paper mt-1.5 text-sm">{children}</dd>
    </div>
  );
}

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="border-rule bg-ink-2 border-t">
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Identificação e canal */}
          <div className="lg:col-span-4">
            <span className="font-display text-paper text-2xl font-semibold tracking-tight">
              Code<span className="text-signal">VX</span>
            </span>
            <p className="text-mute mt-4 max-w-xs leading-relaxed">
              {SITE.tagline}. Um site por vez, feito para o negócio que vai
              usá-lo.
            </p>

            <Action
              href={whatsappLink(
                `Olá! Vim pelo rodapé do site da ${SITE.name}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7"
              arrow
            >
              Falar no WhatsApp
            </Action>

            <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="link-group text-mute hover:text-paper inline-flex min-h-11 items-center font-mono text-[0.6875rem] tracking-[0.12em] uppercase transition-colors"
                >
                  <span className="link-rule">{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* O carimbo. As bordas são só topo e esquerda em cada célula; a
              moldura externa fecha o quadro, então nenhum fio sai duplicado. */}
          <dl className="border-rule grid grid-cols-2 border-r border-b sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            <CampoCarimbo rotulo="Responsável" className="col-span-3">
              {SITE.legalName}
            </CampoCarimbo>

            <CampoCarimbo rotulo="Região atendida" className="col-span-2">
              {SITE.region}
            </CampoCarimbo>
            <CampoCarimbo rotulo="Em atividade desde">
              <span className="tnum font-mono text-[0.8125rem]">
                {SITE.since}
              </span>
            </CampoCarimbo>

            <CampoCarimbo rotulo="Projetos no ar">
              <span className="tnum font-mono text-[0.8125rem]">
                {String(CASE_STUDIES.length).padStart(2, "0")}
              </span>
            </CampoCarimbo>
            <CampoCarimbo rotulo="Canal de contato">WhatsApp</CampoCarimbo>
            <CampoCarimbo rotulo="Código-fonte">Do cliente</CampoCarimbo>
          </dl>
        </div>

        <div className="border-rule text-faint mt-14 flex flex-col gap-3 border-t pt-7 font-mono text-[0.625rem] tracking-[0.14em] uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {SITE.name} · {SITE.legalName}
          </p>
          <p>Feito em São Paulo, medido antes de entregar</p>
        </div>
      </div>
    </footer>
  );
}
