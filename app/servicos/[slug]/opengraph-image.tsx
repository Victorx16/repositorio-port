import { ImageResponse } from "next/og";
import { SERVICE_PAGES, SITE } from "@/lib/constants";
import { CarimboOg, fontesOg, MalhaOg, OG, OG_SIZE, RodapeOg } from "@/lib/og";

export const alt = `Serviço do estúdio ${SITE.name}`;
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

/**
 * A rota de imagem precisa da própria lista de slugs: ela não herda a do
 * page.tsx ao lado.
 */
export function generateStaticParams() {
  return SERVICE_PAGES.map((servico) => ({ slug: servico.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const servico = SERVICE_PAGES.find((s) => s.slug === slug);

  // generateStaticParams só emite slugs existentes, mas o tipo não sabe disso.
  if (!servico) return new ImageResponse(<div />, size);

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
      <CarimboOg>{`${servico.name} · ${SITE.region}`}</CarimboOg>

      {/* A frase da capa da página, não o título de busca: o cartão é lido
            por gente, e o título de busca é escrito para o robô. */}
      <span
        style={{
          display: "flex",
          color: OG.paper,
          fontFamily: "Archivo",
          fontWeight: 600,
          fontSize: 76,
          letterSpacing: -2.8,
          lineHeight: 1.08,
          maxWidth: 1000,
        }}
      >
        {servico.headline}
      </span>

      <RodapeOg direita={`Prazo: ${servico.timeline}`} />
    </div>,
    { ...size, fonts: await fontesOg() },
  );
}
