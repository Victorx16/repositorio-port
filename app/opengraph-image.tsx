import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const alt = `${SITE.name}: estúdio de engenharia web em ${SITE.region}`;
export const size = { width: 1200, height: 630 };
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
 *
 * O ImageResponse usa Satori, que não roda o Tailwind — daí os estilos
 * escritos à mão. Os valores são os mesmos tokens de app/globals.css, e
 * precisam ser trocados junto quando a paleta mudar.
 */
export default async function Image() {
  const INK = "#0b1020";
  const PAPER = "#edf1f7";
  const SIGNAL = "#ff5a1f";
  const RULE = "#1e2b45";
  const MUTE = "#8fa0b8";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: INK,
        padding: 72,
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Malha de coordenadas, desenhada como linhas reais porque Satori
            não suporta background-image em gradiente repetido. */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={`v${i}`}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: (1200 / 6) * i,
            width: 1,
            background: RULE,
          }}
        />
      ))}
      {[1, 2, 3].map((i) => (
        <div
          key={`h${i}`}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: (630 / 4) * i,
            height: 1,
            background: RULE,
          }}
        />
      ))}

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 40, height: 2, background: SIGNAL }} />
        <span
          style={{
            color: SIGNAL,
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          {SITE.region}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: PAPER,
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: -4,
          lineHeight: 1.02,
        }}
      >
        <span>Você é bom no que faz.</span>
        <span>Seu site precisa provar.</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          borderTop: `1px solid ${RULE}`,
          paddingTop: 28,
        }}
      >
        <span
          style={{
            display: "flex",
            color: PAPER,
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: -1,
          }}
        >
          Code
          <span style={{ color: SIGNAL }}>VX</span>
        </span>
        <span
          style={{
            display: "flex",
            color: MUTE,
            fontSize: 20,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {SITE.tagline}
        </span>
      </div>
    </div>,
    { ...size },
  );
}
