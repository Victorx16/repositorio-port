import type { NextConfig } from "next";

// Cabeçalhos de segurança em modo de desenvolvimento.
//
// No build de produção este bloco é ignorado: com `output: "export"` não existe
// servidor Next para aplicar cabeçalho nenhum. Em produção quem manda é o
// `netlify.toml`, e é lá que eles precisam ser editados.
//
// A duplicação existe por um motivo: sem ela, `next dev` rodaria sem CSP e um
// recurso bloqueado em produção passaria despercebido no desenvolvimento.
// 'unsafe-eval' entra só aqui, porque o Fast Refresh depende de eval().
const cspDesenvolvimento = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  /**
   * Export estático: o build cospe HTML puro em `out/`.
   *
   * O site não tem nada que precise de servidor — sem server action, sem rota
   * de API, sem middleware, sem revalidação. Todas as páginas já saíam como
   * estáticas mesmo antes disso, então o export não abre mão de nada e devolve
   * portabilidade total: roda em Netlify, Cloudflare, GitHub Pages ou qualquer
   * CDN, sem runtime de fornecedor no meio.
   */
  output: "export",

  /**
   * O otimizador de imagem do Next é um serviço de servidor, e não existe num
   * site exportado. Como a única imagem da página é um WebP de 37 KB já no
   * tamanho certo, servir o arquivo direto não custa nada.
   *
   * Se um dia entrarem fotos pesadas aqui, o caminho é otimizá-las no build
   * (ou na captura, como foi feito com a do Áurea) em vez de reativar o
   * otimizador — que exigiria voltar a ter servidor.
   */
  images: { unoptimized: true },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Content-Security-Policy", value: cspDesenvolvimento },
        ],
      },
    ];
  },
};

export default nextConfig;
