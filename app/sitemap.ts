import type { MetadataRoute } from "next";
import { CASE_STUDIES, SERVICE_PAGES, SITE } from "@/lib/constants";

/**
 * Gerado uma vez, no build. Sem isto o export estático falha: o Next trata
 * rota de metadata como dinâmica por padrão e recusa gerar o site sem
 * servidor. O conteúdo aqui não depende de requisição nenhuma.
 */
export const dynamic = "force-static";

/**
 * O sitemap é gerado a partir das mesmas constantes que geram as páginas.
 *
 * Escrever um XML à mão significaria mantê-lo sincronizado à mão, e a primeira
 * coisa que sai de sincronia num site é justamente isso: alguém publica um case
 * novo e esquece de listá-lo. Aqui, publicar um case em `CASE_STUDIES` já o
 * coloca no sitemap.
 *
 * Com `output: "export"` isto vira um /sitemap.xml estático no build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Sem histórico de edição por página, a data do build é a informação
  // honesta disponível. Inventar datas antigas para parecer estabelecido é
  // exatamente o tipo de sinal que o Google aprendeu a descontar.
  const atualizado = new Date();

  return [
    {
      url: SITE.url,
      lastModified: atualizado,
      changeFrequency: "monthly",
      priority: 1,
    },
    // As páginas de serviço vêm antes dos cases: são elas que disputam as
    // buscas por onde chega quem ainda não conhece o estúdio.
    ...SERVICE_PAGES.map((servico) => ({
      url: `${SITE.url}/servicos/${servico.slug}`,
      lastModified: atualizado,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...CASE_STUDIES.map((caso) => ({
      url: `${SITE.url}/cases/${caso.slug}`,
      lastModified: atualizado,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
