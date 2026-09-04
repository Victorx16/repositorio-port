import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { StructuredData } from "@/components/seo/structured-data";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { UrlLimpa } from "@/components/ui/url-limpa";
import { WhatsAppWidgetProvider } from "@/components/whatsapp-widget/context";
import { WhatsAppWidgetLazy } from "@/components/whatsapp-widget/lazy";
import { SITE } from "@/lib/constants";
import "./globals.css";

/**
 * As três fontes são servidas pelo próprio domínio via next/font.
 *
 * A versão anterior puxava Clash Display e Satoshi de um <link rel=stylesheet>
 * para a Fontshare — uma requisição a um terceiro que bloqueia a renderização
 * e só então revela quantos arquivos de fonte ainda faltam baixar. Num site
 * que vende carregamento abaixo de um segundo, isso era o defeito mais caro
 * da página. Self-hosted, o CSS entra embutido no HTML e o navegador já sai
 * buscando as fontes no primeiro instante, no mesmo domínio e na mesma conexão.
 */

/*
 * Duas decisões aqui saíram da medição em produção, não do gosto.
 *
 * `latin-ext` cobre U+0100–024F: alfabetos do leste europeu. O português vive
 * inteiro no subconjunto `latin` — á, ã, ç, é, ô e õ estão todos abaixo de
 * U+00FF. Carregar latin-ext era pagar por glifos que nenhuma página serve.
 *
 * O eixo `wdth` do Archivo foi declarado numa versão anterior e nunca usado.
 * Um eixo variável a mais engorda o arquivo inteiro mesmo sem ninguém acionar.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = "Code VX: estúdio de engenharia web em São Paulo e ABC Paulista";
const description =
  "Sites feitos sob medida para negócios de São Paulo e ABC Paulista: abrem antes de o cliente desistir, aparecem na busca e trazem a conversa pronta para o WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  // Canônica explícita: com domínio próprio, o mesmo conteúdo passa a existir
  // também no endereço .netlify.app. Sem esta linha o Google escolhe sozinho
  // qual indexar, e às vezes escolhe o errado.
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    siteName: SITE.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${archivo.variable} ${instrumentSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <WhatsAppWidgetProvider>
          {/* Atalho de teclado: primeira parada do Tab, invisível até receber foco. */}
          <a
            href="#conteudo"
            className="bg-signal text-ink sr-only rounded-xs px-4 py-2 text-sm font-semibold focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-100"
          >
            Pular para o conteúdo
          </a>
          {children}
          <StructuredData />
          <RevealObserver />
          <UrlLimpa />
          <WhatsAppWidgetLazy />
        </WhatsAppWidgetProvider>
      </body>
    </html>
  );
}
