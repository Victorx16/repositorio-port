import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";
import { WORDMARK_RATIO, wordmarkSvg } from "@/lib/wordmark";

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
 *
 * As fontes também precisam ser entregues à mão. O Satori roda no build, fora
 * do navegador, e não enxerga o que o `next/font` carrega: sem isto ele cai
 * numa sans genérica do sistema, e a imagem que abre no WhatsApp deixa de
 * parecer com o site. Os arquivos ficam em `assets/`, não em `public/`, porque
 * são insumo de build — nenhum visitante os baixa.
 *
 * TTF e não WOFF2: o Satori não lê fonte comprimida em Brotli.
 */

/** Lê um arquivo de fonte do repositório, em tempo de build. */
async function fonte(arquivo: string) {
  return readFile(join(process.cwd(), "assets", "fonts", arquivo));
}
export default async function Image() {
  const INK = "#0b1020";
  const PAPER = "#edf1f7";
  const SIGNAL = "#ff5a1f";
  const RULE = "#1e2b45";
  const MUTE = "#8fa0b8";
  /** Altura da marca no rodapé da imagem. */
  const ALTURA_MARCA = 40;

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
            fontFamily: "IBM Plex Mono",
            fontSize: 19,
            letterSpacing: 4,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          {SITE.region}
        </span>
      </div>

      {/*
        Mesma virada de peso da capa: a primeira frase valida em 500, a segunda
        cobra em 600. E o ponto final em laranja, como no site.
      */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: PAPER,
          fontFamily: "Archivo",
          fontSize: 92,
          letterSpacing: -3.5,
          lineHeight: 1.04,
        }}
      >
        <span style={{ fontWeight: 500 }}>Você é bom no que faz.</span>
        <span style={{ display: "flex", fontWeight: 600 }}>
          Seu site precisa provar
          <span style={{ color: SIGNAL }}>.</span>
        </span>
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
        {/*
          A marca de verdade, não mais "CodeVX" desenhado como texto.

          O Satori não renderiza componentes SVG, mas aceita `<img>` com data
          URI. `encodeURIComponent` em vez de base64 porque o SVG é texto: sai
          menor e continua legível se alguém abrir o arquivo para depurar.

          A altura manda e a largura sai da proporção medida do contorno. Fixar
          as duas à mão deformaria a marca no dia em que ela mudasse.
        */}
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(
            wordmarkSvg(PAPER, SIGNAL),
          )}`}
          height={ALTURA_MARCA}
          width={Math.round(ALTURA_MARCA * WORDMARK_RATIO)}
          alt={SITE.name}
        />
        <span
          style={{
            display: "flex",
            color: MUTE,
            fontFamily: "IBM Plex Mono",
            fontSize: 19,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {SITE.tagline}
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Archivo",
          data: await fonte("Archivo-Medium.ttf"),
          weight: 500,
          style: "normal",
        },
        {
          name: "Archivo",
          data: await fonte("Archivo-SemiBold.ttf"),
          weight: 600,
          style: "normal",
        },
        {
          name: "IBM Plex Mono",
          data: await fonte("IBMPlexMono-Regular.ttf"),
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
