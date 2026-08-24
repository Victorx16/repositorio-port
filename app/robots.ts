import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/**
 * Gerado uma vez, no build. Sem isto o export estático falha: o Next trata
 * rota de metadata como dinâmica por padrão e recusa gerar o site sem
 * servidor. O conteúdo aqui não depende de requisição nenhuma.
 */
export const dynamic = "force-static";


/**
 * Tudo liberado, e o sitemap apontado.
 *
 * Um site institucional de quatro páginas não tem o que esconder de buscador.
 * O valor deste arquivo está na última linha: é por ela que o Google descobre
 * o sitemap sem depender de alguém cadastrá-lo no Search Console.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
