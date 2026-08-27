import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";
import { CarimboOg, fontesOg, MalhaOg, OG, OG_SIZE, RodapeOg } from "@/lib/og";

export const alt = `${SITE.name}: estúdio de engenharia web em ${SITE.region}`;
export const size = OG_SIZE;
export const contentType = "image/png";

/**
 * A imagem é gerada uma vez, no build, e vira um PNG no disco.
 *
 * Sem esta linha o export estático falha: o Next trata rota de imagem como
 * dinâmica por padrão e recusa gerar o site sem servidor. Como o conteúdo aqui
 * não depende de requisição nenhuma, declarar `force-static` é a verdade.
 */
export const dynamic = "force-static";

/**
 * A imagem de compartilhamento é a capa em miniatura: mesma malha de
 * coordenadas, mesmo carimbo, mesma frase. Quem clica no link do WhatsApp já
 * chega tendo visto a página.
 */
export default async function Image() {
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
      <CarimboOg>{SITE.region}</CarimboOg>

      {/*
          Mesma virada de peso da capa: a primeira frase valida em 500, a
          segunda cobra em 600. E o ponto final em laranja, como no site.
        */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: OG.paper,
          fontFamily: "Archivo",
          fontSize: 92,
          letterSpacing: -3.5,
          lineHeight: 1.04,
        }}
      >
        <span style={{ fontWeight: 500 }}>Você é bom no que faz.</span>
        <span style={{ display: "flex", fontWeight: 600 }}>
          Seu site precisa provar
          <span style={{ color: OG.signal }}>.</span>
        </span>
      </div>

      <RodapeOg direita={SITE.tagline} />
    </div>,
    { ...size, fonts: await fontesOg() },
  );
}
