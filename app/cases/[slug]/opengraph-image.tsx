import { ImageResponse } from "next/og";
import { CASE_STUDIES } from "@/lib/constants";
import { CarimboOg, fontesOg, MalhaOg, OG, OG_SIZE, RodapeOg } from "@/lib/og";

export const alt = "Case do estúdio Code VX";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

/**
 * Uma imagem por case, gerada no build.
 *
 * A rota de imagem precisa da própria lista de slugs: ela não herda a do
 * page.tsx ao lado. Sem isto o export estático não sabe quais PNGs gerar.
 */
export function generateStaticParams() {
  return CASE_STUDIES.map((caso) => ({ slug: caso.slug }));
}

/**
 * Antes desta rota, a página do case não declarava imagem nenhuma: o link do
 * Áurea no WhatsApp aparecia como um retângulo de texto sem figura. Justamente
 * o link mais compartilhado do site, porque é a prova.
 *
 * A imagem herda a linguagem da prancha, não a do cliente. Ela é um documento
 * do estúdio sobre o projeto; a identidade do Áurea vive dentro do site dele.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caso = CASE_STUDIES.find((c) => c.slug === slug);

  // generateStaticParams só emite slugs existentes, mas o tipo não sabe disso.
  if (!caso) return new ImageResponse(<div />, size);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: OG.ink,
        padding: 72,
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <MalhaOg />
      <CarimboOg>{`${caso.niche} · ${caso.year}`}</CarimboOg>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <span
          style={{
            display: "flex",
            color: OG.paper,
            fontFamily: "Archivo",
            fontWeight: 600,
            fontSize: 104,
            letterSpacing: -4,
            lineHeight: 1.02,
          }}
        >
          {caso.client}
        </span>
        {/* A linha do case, cortada no comprimento que cabe em duas linhas
              sem espremer o corpo do texto. */}
        <span
          style={{
            display: "flex",
            color: OG.mute,
            fontFamily: "Archivo",
            fontWeight: 500,
            fontSize: 32,
            lineHeight: 1.35,
            maxWidth: 900,
          }}
        >
          {caso.tagline}
        </span>
      </div>

      <RodapeOg direita="Case" />
    </div>,
    { ...size, fonts: await fontesOg() },
  );
}
