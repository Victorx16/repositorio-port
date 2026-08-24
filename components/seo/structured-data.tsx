import { SITE } from "@/lib/constants";

/**
 * Dados estruturados Schema.org.
 *
 * O estúdio vende "SEO técnico completo, sitemap e dados estruturados" na
 * tabela de serviços, e até agora o próprio site não tinha nenhum dos três.
 * É a mesma incoerência do LCP escrito à mão na capa: afirmar uma competência
 * numa página que não a demonstra.
 *
 * Três regras governam o que entra aqui, e as três são sobre não mentir:
 *
 * · Só dado verificável. Telefone, região e horário existem e batem com o
 *   perfil no Google Meu Negócio. Endereço e faixa de preço ficam de fora
 *   porque não temos — e marcação inventada é pior que marcação ausente, já
 *   que o Google penaliza divergência entre dado e página.
 *
 * · Nada de `taxID` nem `legalName`. O atendimento hoje é como pessoa física,
 *   e o CNPJ que existia aqui está registrado para outra atividade. CNPJ é
 *   consulta pública: exibir um que não corresponde ao serviço é a forma mais
 *   rápida de derrubar uma página construída sobre verificabilidade.
 *
 * · Nada de `aggregateRating` nem `review`. É o abuso mais comum de dados
 *   estruturados: nota de cinco estrelas sem uma avaliação real por trás.
 *   Rende rich snippet por um tempo e penalidade manual depois.
 *
 * As cidades em `areaServed` são as mesmas marcadas no Google Meu Negócio, e
 * precisam continuar sendo. O Google cruza os dois, e divergência entre perfil
 * e site é um dos sinais que mais atrapalham ranqueamento local.
 *
 * `ProfessionalService` é subtipo de `LocalBusiness`. Sem endereço público, o
 * Google dificilmente mostrará ficha local a partir daqui — quem destrava isso
 * é o Google Meu Negócio, não a marcação. O que ela faz é dizer ao buscador,
 * sem ambiguidade, quem está por trás do site.
 */

/** Espelha as áreas de cobertura do perfil: capital e ABC Paulista. */
const CIDADES = [
  "São Paulo",
  "Santo André",
  "São Bernardo do Campo",
  "São Caetano do Sul",
  "Diadema",
  "Mauá",
  "Ribeirão Pires",
];

export function StructuredData() {
  const dados = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#estudio`,
    name: SITE.name,
    description: `${SITE.tagline} em ${SITE.region}. Sites sob medida, sem template e sem mensalidade de plataforma.`,
    url: SITE.url,
    foundingDate: SITE.since,
    telephone: `+${SITE.whatsappNumber}`,
    knowsLanguage: "pt-BR",
    areaServed: CIDADES.map((name) => ({ "@type": "City", name })),
    // Todos os dias, 09:00 às 20:00, igual ao perfil no Google.
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "20:00",
    },
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
