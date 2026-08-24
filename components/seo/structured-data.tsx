import { SITE } from "@/lib/constants";

/**
 * Dados estruturados Schema.org.
 *
 * O estúdio vende "SEO técnico completo, sitemap e dados estruturados" na
 * tabela de serviços, e até agora o próprio site não tinha nenhum dos três.
 * É a mesma incoerência do LCP escrito à mão na capa: afirmar uma competência
 * numa página que não a demonstra.
 *
 * Duas regras governam o que entra aqui, e as duas são sobre não mentir:
 *
 * · Só dado verificável. Razão social, CNPJ, telefone e região existem no
 *   contrato e no rodapé. Endereço, horário de atendimento e faixa de preço
 *   ficam de fora porque não temos — e marcação inventada é pior que marcação
 *   ausente, já que o Google penaliza divergência entre dado e página.
 *
 * · Nada de `aggregateRating` nem `review`. É o abuso mais comum de dados
 *   estruturados: nota de cinco estrelas sem uma avaliação real por trás.
 *   Rende rich snippet por um tempo e penalidade manual depois.
 *
 * `ProfessionalService` é subtipo de `LocalBusiness`. Sem endereço público, o
 * Google dificilmente mostrará ficha local a partir daqui — quem destrava isso
 * é o Google Meu Negócio, não a marcação. O que ela faz é dizer ao buscador,
 * sem ambiguidade, quem é a empresa por trás do site.
 */
export function StructuredData() {
  const dados = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#estudio`,
    name: SITE.name,
    legalName: SITE.legalName,
    description: `${SITE.tagline} em ${SITE.region}. Sites sob medida, sem template e sem mensalidade de plataforma.`,
    url: SITE.url,
    // O CNPJ é o identificador que amarra o site à pessoa jurídica do contrato.
    taxID: SITE.cnpj,
    foundingDate: SITE.since,
    telephone: `+${SITE.whatsappNumber}`,
    knowsLanguage: "pt-BR",
    areaServed: [
      { "@type": "City", name: "São Paulo" },
      { "@type": "AdministrativeArea", name: "ABC Paulista" },
    ],
    founder: {
      "@type": "Person",
      name: SITE.legalName,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços",
      itemListElement: [
        "Página única",
        "Site institucional",
        "Loja online",
      ].map((nome) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: nome },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // O JSON é montado por nós, a partir de constantes do próprio código.
      // Não há entrada de usuário no caminho, então não há o que escapar.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}
