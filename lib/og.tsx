import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/constants";
import { WORDMARK_RATIO, wordmarkSvg } from "@/lib/wordmark";

/**
 * Peças comuns das imagens de compartilhamento.
 *
 * Existem duas rotas que geram PNG pelo Satori: a da home e a de cada case.
 * Antes de haver este arquivo, a paleta e a malha estavam escritas na mão em
 * um lugar só; duplicá-las na segunda rota deixaria as duas livres para
 * divergir no dia em que a cor mudasse. Aqui elas têm um dono.
 *
 * O Satori não roda o Tailwind, então os valores abaixo são cópias dos tokens
 * de app/globals.css e precisam ser trocados junto com eles.
 */

export const OG_SIZE = { width: 1200, height: 630 };

export const OG = {
  ink: "#0b1020",
  paper: "#edf1f7",
  signal: "#ff5a1f",
  rule: "#1e2b45",
  mute: "#8fa0b8",
} as const;

/**
 * As fontes precisam ser entregues como bytes.
 *
 * O Satori roda no build, fora do navegador, e não enxerga o que o next/font
 * carrega: sem isto ele cai numa sans genérica do sistema e a imagem que abre
 * no WhatsApp deixa de parecer com o site. Os arquivos ficam em `assets/`, não
 * em `public/`, porque são insumo de build e nenhum visitante os baixa.
 *
 * TTF e não WOFF2: o Satori não lê fonte comprimida em Brotli.
 */
async function ler(arquivo: string) {
  return readFile(join(process.cwd(), "assets", "fonts", arquivo));
}

export async function fontesOg() {
  const [medium, semibold, mono] = await Promise.all([
    ler("Archivo-Medium.ttf"),
    ler("Archivo-SemiBold.ttf"),
    ler("IBMPlexMono-Regular.ttf"),
  ]);

  return [
    {
      name: "Archivo",
      data: medium,
      weight: 500 as const,
      style: "normal" as const,
    },
    {
      name: "Archivo",
      data: semibold,
      weight: 600 as const,
      style: "normal" as const,
    },
    {
      name: "IBM Plex Mono",
      data: mono,
      weight: 400 as const,
      style: "normal" as const,
    },
  ];
}

/**
 * A malha de coordenadas da prancha, desenhada como linhas de verdade porque
 * o Satori não suporta background-image em gradiente repetido.
 */
export function MalhaOg() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={`v${i}`}
          style={{
            position: "absolute",
            top: 0,
            // Altura explícita: o Satori deduz largura de left+right, mas não
            // deduz altura de top+bottom, e as verticais saíam invisíveis.
            height: OG_SIZE.height,
            left: (OG_SIZE.width / 6) * i,
            width: 1,
            background: OG.rule,
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
            top: (OG_SIZE.height / 4) * i,
            height: 1,
            background: OG.rule,
          }}
        />
      ))}
    </>
  );
}

/** Carimbo em monoespaçada, com o traço laranja à esquerda. */
export function CarimboOg({ children }: { children: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 40, height: 2, background: OG.signal }} />
      <span
        style={{
          color: OG.signal,
          fontFamily: "IBM Plex Mono",
          fontSize: 19,
          letterSpacing: 4,
          textTransform: "uppercase",
          display: "flex",
        }}
      >
        {children}
      </span>
    </div>
  );
}

/**
 * Rodapé: a marca de verdade à esquerda, um rótulo à direita.
 *
 * O Satori não renderiza componentes SVG, mas aceita `<img>` com data URI.
 * `encodeURIComponent` em vez de base64 porque o SVG é texto: sai menor e
 * continua legível se alguém abrir o arquivo para depurar.
 *
 * A altura manda e a largura sai da proporção medida do contorno. Fixar as
 * duas à mão deformaria a marca no dia em que ela mudasse.
 */
export function RodapeOg({ direita }: { direita: string }) {
  const altura = 40;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        borderTop: `1px solid ${OG.rule}`,
        paddingTop: 28,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- isto não roda
          num navegador: o Satori transforma esta árvore em PNG durante o
          build, e não conhece next/image. */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(
          wordmarkSvg(OG.paper, OG.signal),
        )}`}
        height={altura}
        width={Math.round(altura * WORDMARK_RATIO)}
        alt={SITE.name}
      />
      <span
        style={{
          display: "flex",
          color: OG.mute,
          fontFamily: "IBM Plex Mono",
          fontSize: 19,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        {direita}
      </span>
    </div>
  );
}
